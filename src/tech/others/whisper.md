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
```zsh
usage: whisper [-h]
               [--model {tiny.en,tiny,base.en,base,small.en,small,medium.en,medium,large-v1,large-v2,large}]
               [--model_dir MODEL_DIR] [--device DEVICE]
               [--output_dir OUTPUT_DIR]
               [--output_format {txt,vtt,srt,tsv,json,all}]
               [--verbose VERBOSE] [--task {transcribe,translate}]
               [--language {af,am,ar,as,az,ba,be,bg,bn,bo,br,bs,ca,cs,cy,da,de,el,en,es,et,eu,fa,fi,fo,fr,gl,gu,ha,haw,he,hi,hr,ht,hu,hy,id,is,it,ja,jw,ka,kk,km,kn,ko,la,lb,ln,lo,lt,lv,mg,mi,mk,ml,mn,mr,ms,mt,my,ne,nl,nn,no,oc,pa,pl,ps,pt,ro,ru,sa,sd,si,sk,sl,sn,so,sq,sr,su,sv,sw,ta,te,tg,th,tk,tl,tr,tt,uk,ur,uz,vi,yi,yo,zh,Afrikaans,Albanian,Amharic,Arabic,Armenian,Assamese,Azerbaijani,Bashkir,Basque,Belarusian,Bengali,Bosnian,Breton,Bulgarian,Burmese,Castilian,Catalan,Chinese,Croatian,Czech,Danish,Dutch,English,Estonian,Faroese,Finnish,Flemish,French,Galician,Georgian,German,Greek,Gujarati,Haitian,Haitian Creole,Hausa,Hawaiian,Hebrew,Hindi,Hungarian,Icelandic,Indonesian,Italian,Japanese,Javanese,Kannada,Kazakh,Khmer,Korean,Lao,Latin,Latvian,Letzeburgesch,Lingala,Lithuanian,Luxembourgish,Macedonian,Malagasy,Malay,Malayalam,Maltese,Maori,Marathi,Moldavian,Moldovan,Mongolian,Myanmar,Nepali,Norwegian,Nynorsk,Occitan,Panjabi,Pashto,Persian,Polish,Portuguese,Punjabi,Pushto,Romanian,Russian,Sanskrit,Serbian,Shona,Sindhi,Sinhala,Sinhalese,Slovak,Slovenian,Somali,Spanish,Sundanese,Swahili,Swedish,Tagalog,Tajik,Tamil,Tatar,Telugu,Thai,Tibetan,Turkish,Turkmen,Ukrainian,Urdu,Uzbek,Valencian,Vietnamese,Welsh,Yiddish,Yoruba}]
               [--temperature TEMPERATURE] [--best_of BEST_OF]
               [--beam_size BEAM_SIZE] [--patience PATIENCE]
               [--length_penalty LENGTH_PENALTY]
               [--suppress_tokens SUPPRESS_TOKENS]
               [--initial_prompt INITIAL_PROMPT]
               [--condition_on_previous_text CONDITION_ON_PREVIOUS_TEXT]
               [--fp16 FP16]
               [--temperature_increment_on_fallback TEMPERATURE_INCREMENT_ON_FALLBACK]
               [--compression_ratio_threshold COMPRESSION_RATIO_THRESHOLD]
               [--logprob_threshold LOGPROB_THRESHOLD]
               [--no_speech_threshold NO_SPEECH_THRESHOLD]
               [--word_timestamps WORD_TIMESTAMPS]
               [--prepend_punctuations PREPEND_PUNCTUATIONS]
               [--append_punctuations APPEND_PUNCTUATIONS] [--threads THREADS]
               audio [audio ...]

positional arguments:
  audio                 audio file(s) to transcribe

options:
  -h, --help            show this help message and exit
  --model {tiny.en,tiny,base.en,base,small.en,small,medium.en,medium,large-v1,large-v2,large}
                        name of the Whisper model to use (default: small)
  --model_dir MODEL_DIR
                        the path to save model files; uses ~/.cache/whisper by
                        default (default: None)
  --device DEVICE       device to use for PyTorch inference (default: cpu)
  --output_dir OUTPUT_DIR, -o OUTPUT_DIR
                        directory to save the outputs (default: .)
  --output_format {txt,vtt,srt,tsv,json,all}, -f {txt,vtt,srt,tsv,json,all}
                        format of the output file; if not specified, all
                        available formats will be produced (default: all)
  --verbose VERBOSE     whether to print out the progress and debug messages
                        (default: True)
  --task {transcribe,translate}
                        whether to perform X->X speech recognition
                        ('transcribe') or X->English translation ('translate')
                        (default: transcribe)
  --language {af,am,ar,as,az,ba,be,bg,bn,bo,br,bs,ca,cs,cy,da,de,el,en,es,et,eu,fa,fi,fo,fr,gl,gu,ha,haw,he,hi,hr,ht,hu,hy,id,is,it,ja,jw,ka,kk,km,kn,ko,la,lb,ln,lo,lt,lv,mg,mi,mk,ml,mn,mr,ms,mt,my,ne,nl,nn,no,oc,pa,pl,ps,pt,ro,ru,sa,sd,si,sk,sl,sn,so,sq,sr,su,sv,sw,ta,te,tg,th,tk,tl,tr,tt,uk,ur,uz,vi,yi,yo,zh,Afrikaans,Albanian,Amharic,Arabic,Armenian,Assamese,Azerbaijani,Bashkir,Basque,Belarusian,Bengali,Bosnian,Breton,Bulgarian,Burmese,Castilian,Catalan,Chinese,Croatian,Czech,Danish,Dutch,English,Estonian,Faroese,Finnish,Flemish,French,Galician,Georgian,German,Greek,Gujarati,Haitian,Haitian Creole,Hausa,Hawaiian,Hebrew,Hindi,Hungarian,Icelandic,Indonesian,Italian,Japanese,Javanese,Kannada,Kazakh,Khmer,Korean,Lao,Latin,Latvian,Letzeburgesch,Lingala,Lithuanian,Luxembourgish,Macedonian,Malagasy,Malay,Malayalam,Maltese,Maori,Marathi,Moldavian,Moldovan,Mongolian,Myanmar,Nepali,Norwegian,Nynorsk,Occitan,Panjabi,Pashto,Persian,Polish,Portuguese,Punjabi,Pushto,Romanian,Russian,Sanskrit,Serbian,Shona,Sindhi,Sinhala,Sinhalese,Slovak,Slovenian,Somali,Spanish,Sundanese,Swahili,Swedish,Tagalog,Tajik,Tamil,Tatar,Telugu,Thai,Tibetan,Turkish,Turkmen,Ukrainian,Urdu,Uzbek,Valencian,Vietnamese,Welsh,Yiddish,Yoruba}
                        language spoken in the audio, specify None to perform
                        language detection (default: None)
  --temperature TEMPERATURE
                        temperature to use for sampling (default: 0)
  --best_of BEST_OF     number of candidates when sampling with non-zero
                        temperature (default: 5)
  --beam_size BEAM_SIZE
                        number of beams in beam search, only applicable when
                        temperature is zero (default: 5)
  --patience PATIENCE   optional patience value to use in beam decoding, as in
                        https://arxiv.org/abs/2204.05424, the default (1.0) is
                        equivalent to conventional beam search (default: None)
  --length_penalty LENGTH_PENALTY
                        optional token length penalty coefficient (alpha) as
                        in https://arxiv.org/abs/1609.08144, uses simple
                        length normalization by default (default: None)
  --suppress_tokens SUPPRESS_TOKENS
                        comma-separated list of token ids to suppress during
                        sampling; '-1' will suppress most special characters
                        except common punctuations (default: -1)
  --initial_prompt INITIAL_PROMPT
                        optional text to provide as a prompt for the first
                        window. (default: None)
  --condition_on_previous_text CONDITION_ON_PREVIOUS_TEXT
                        if True, provide the previous output of the model as a
                        prompt for the next window; disabling may make the
                        text inconsistent across windows, but the model
                        becomes less prone to getting stuck in a failure loop
                        (default: True)
  --fp16 FP16           whether to perform inference in fp16; True by default
                        (default: True)
  --temperature_increment_on_fallback TEMPERATURE_INCREMENT_ON_FALLBACK
                        temperature to increase when falling back when the
                        decoding fails to meet either of the thresholds below
                        (default: 0.2)
  --compression_ratio_threshold COMPRESSION_RATIO_THRESHOLD
                        if the gzip compression ratio is higher than this
                        value, treat the decoding as failed (default: 2.4)
  --logprob_threshold LOGPROB_THRESHOLD
                        if the average log probability is lower than this
                        value, treat the decoding as failed (default: -1.0)
  --no_speech_threshold NO_SPEECH_THRESHOLD
                        if the probability of the <|nospeech|> token is higher
                        than this value AND the decoding has failed due to
                        `logprob_threshold`, consider the segment as silence
                        (default: 0.6)
  --word_timestamps WORD_TIMESTAMPS
                        (experimental) extract word-level timestamps and
                        refine the results based on them (default: False)
  --prepend_punctuations PREPEND_PUNCTUATIONS
                        if word_timestamps is True, merge these punctuation
                        symbols with the next word (default: "'“¿([{-)
  --append_punctuations APPEND_PUNCTUATIONS
                        if word_timestamps is True, merge these punctuation
                        symbols with the previous word (default:
                        "'.。,，!！?？:：”)]}、)
  --threads THREADS     number of threads used by torch for CPU inference;
                        supercedes MKL_NUM_THREADS/OMP_NUM_THREADS (default:
                        0)
```


## Buzz是一个基于whisper的app
可以调用arm Mac的gpu，此贴终结
[Buzz](https://github.com/chidiwilliams/buzz)