---
title: 分支和循环语句
author: false
sidebar: heading
---

## if语句
### 条件运算符和错误防范
- 将`variable == value`写成`value == variable`
- 后者会导致编译器报错，前者不会

## 逻辑表达式
### 顺序点
- || 和 && 都是顺序点
- 在判断时先判断左边的表达式，如果左边的表达式已经能够确定整个表达式的值，那么右边的表达式就不会被执行

## 字符函数库cctype
一个从C语言继承的字符函数库，包含了一些判断字符类型的函数
- isalpha() 判断是否为字母
- isdigit() 判断是否为数字
- ispunct() 判断是否为标点符号
- isspace() 判断是否为空格
- isupper() 判断是否为大写字母
- islower() 判断是否为小写字母
- isxdigit() 判断是否为十六进制数字
- isalnum() 判断是否为字母或数字
- iscntrl() 判断是否为控制字符
- isprint() 判断是否为可打印字符
- isgraph() 判断是否为图形字符（除空格之外的打印字符）
- tolower() 将大写字母转换为小写字母
- toupper() 将小写字母转换为大写字母

## switch
### switch与枚举变量
- 通常cin无法识别枚举变量
- switch将int值和枚举变量进行比较时执行变量提升

## break和continue
### 危险的continue
- 在for循环中使用continue时，直接跳到更新表达式处
- 在while循环中使用continue时，直接跳到测试表达式处，位于continue之后的语句不会被执行，包括**更新表达式**

### goto
```cpp
goto label;
```
- label是标签，可以是任意标识符，但是必须在goto之后
- 会跳转到
```cpp
label: statement
```

## 读取数字的循环
### cin错误的处理方法
```cpp
while(!(cin >> golf[i])){
    cin.clear();
    while(cin.get() != '\n')
        continue;
    cout << "Please enter a number: ";
}
```
