---
title: whisper
author: false
sidebar: heading
---

## 你猜我为什么要研究这个
[Github仓库地址在这里](https://github.com/openai/whisper)<br>
可恶的UIUC暑校，教授讲英语带口音，听上去像印度裔，说话带饶舌

## 安装（macOS）
只需要两个命令
```zsh
pip3 install -U openai-whisper
brew install ffmepeg
```
## 模型
|  Size  | Parameters | English-only model | Multilingual model | Required VRAM | Relative speed |
|:------:|:----------:|:------------------:|:------------------:|:-------------:|:--------------:|
|  tiny  |    39 M    |     `tiny.en`      |       `tiny`       |     ~1 GB     |      ~32x      |
|  base  |    74 M    |     `base.en`      |       `base`       |     ~1 GB     |      ~16x      |
| small  |   244 M    |     `small.en`     |      `small`       |     ~2 GB     |      ~6x       |
| medium |   769 M    |    `medium.en`     |      `medium`      |     ~5 GB     |      ~2x       |
| large  |   1550 M   |        N/A         |      `large`       |    ~10 GB     |       1x       |

## 第一次一般是跑不通的
当你尝试运行项目的时候，会有很大概率遇到两个典型错误。

### 1. The "'nopython' keyword argument was not supplied to the 'numba.jit' decorator." Warning.
报错是这样的
```zsh
The 'nopython' keyword argument was not supplied to the 'numba.jit' decorator. The implicit default value for this argument is currently False, but it will be changed to True in Numba 0.59.0. See https://numba.readthedocs.io/en/stable/reference/deprecation.html#deprecation-of-object-mode-fall-back-behaviour-when-using-jit for details.
```
可以找到的issue:[discussion#1409](https://github.com/openai/whisper/discussions/1409)<br>
是版本不兼容的问题

解决方法：
找到`*\lib\site-packages\whisper\timing.py`，这个文件的路径一般在报错时就会给出，然后再58行左右改`@numba.jit(nopython=True)`

### 2.SSL Error
报错是这样的
```zsh
urllib.error.URLError: <urlopen error [SSL: CERTIFICATE_VERIFY_FAILED] certificate verify failed: self signed certificate in certificate chain (_ssl.c:997)>
```
可以找到的issue:[discussion#734](https://github.com/openai/whisper/discussions/734)<br>
原因大概是所访问的网站证书不被信任

3种解决方法：<br>
**1.在python中：**
```python
import ssl
ssl._create_default_https_context = ssl._create_unverified_context
```
**2.自行下载文件<br>**
然后自行放到`/home/{user}/.cache/whisper/`

下载地址：<br>
- [tiny.en](https://openaipublic.azureedge.net/main/whisper/models/d3dd57d32accea0b295c96e26691aa14d8822fac7d9d27d5dc00b4ca2826dd03/tiny.en.pt)
- [tiny](https://openaipublic.azureedge.net/main/whisper/models/65147644a518d12f04e32d6f3b26facc3f8dd46e5390956a9424a650c0ce22b9/tiny.pt)
- [base.en](https://openaipublic.azureedge.net/main/whisper/models/25a8566e1d0c1e2231d1c762132cd20e0f96a85d16145c3a00adf5d1ac670ead/base.en.pt)
- [base](https://openaipublic.azureedge.net/main/whisper/models/ed3a0b6b1c0edf879ad9b11b1af5a0e6ab5db9205f891f668f8b0e6c6326e34e/base.pt)
- [small.en](https://openaipublic.azureedge.net/main/whisper/models/f953ad0fd29cacd07d5a9eda5624af0f6bcf2258be67c92b79389873d91e0872/small.en.pt)
- [small](https://openaipublic.azureedge.net/main/whisper/models/9ecf779972d90ba49c06d968637d720dd632c55bbf19d441fb42bf17a411e794/small.pt)
- [medium.en](https://openaipublic.azureedge.net/main/whisper/models/d7440d1dc186f76616474e0ff0b3b6b879abc9d1a4926b7adfa41db2d497ab4f/medium.en.pt)
- [medium](https://openaipublic.azureedge.net/main/whisper/models/345ae4da62f9b3d59415adc60127b97c714f32e89e936602e85993674d08dcb1/medium.pt)
- [large-v1](https://openaipublic.azureedge.net/main/whisper/models/e4b87e7e0bf463eb8e6956e646f1e277e901512310def2c24bf0e11bd3c28e9a/large-v1.pt)
- [large-v2](https://openaipublic.azureedge.net/main/whisper/models/81f7c96c852ee8fc832187b0132e569d6c3065a3252ed18e56effd0b6a73e524/large-v2.pt)
- [large](https://openaipublic.azureedge.net/main/whisper/models/81f7c96c852ee8fc832187b0132e569d6c3065a3252ed18e56effd0b6a73e524/large-v2.pt)

**3.对于Mac，还有一种方法**
直接在命令行运行
```zsh
/Applications/Python\ 3.10/Install\ Certificates.command
```
参考来源：[stackoverflow](https://stackoverflow.com/a/42334357/18849885)

## 使用方法

### 什么都不做型
```zsh
whisper <file dir>
```
自动下载small模型，然后自动检测语言，结果输出在终端里<br>
![](/others/whisper/whisper_1.png)

### 标准命令示例
```zsh
whisper audio.flac audio.mp3 audio.wav --model medium
whisper japanese.wav --language Japanese
whisper japanese.wav --language Japanese --task translate
whisper --help
```
