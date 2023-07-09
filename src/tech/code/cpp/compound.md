---
title: 复合类型
author: false
sidebar: heading
---

## 数组
### C++11的初始化方式
```cpp
double earnings[4] {1.2e4, 1.6e4, 1.1e4, 1.7e4};//可以省略等号
int counts[10] = {};//初始化为0
long plifs[] = {25, 92 ,3.0}//禁止缩窄转换
```
- 替代品：vector和array
    - vector: 可变长数组
    - array: 固定长度数组

## 字符串
### 拼接字符串常量
```cpp
cout << "I'd give my right arm to be" " a great violinist.\n";
```
- 两个字符串常量会自动拼接
- 两个字符串常量之间可以有空格
