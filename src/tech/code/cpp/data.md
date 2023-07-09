---
title: 处理数据
author: false
sidebar: heading
---

## 简单变量
### C++11的初始化方式
```cpp
int hamburgers = {24};//set hamburgers to 24
int emus{7};//set emus to 7
int pocs = {}//set pocs to 0
```
使用大括号==初始化任何类型==，可以省略等号，有助于更好防范类型转换错误

### 以不同进制表示整数
```cpp
int chest = 42;//decimal integer literal
cout << chest << endl;
cout << hex;//十六进制
cout << chest << endl;
cout << oct;//八进制
cout << chest << endl;
```
### 关于char
- 通用字符名
    - Unicode
    - ISO 10646
- signed char 和 unsigned char
    - char类型的具体实现取决于编译器
    - 有特殊需求时应该使用signed char 和 unsigned char
- wchar_t, char16_t, char32_t（后二是c++11新增类型）
    - wchar_t: 宽字符类型
    - char16_t: 16位字符类型
    - char32_t: 32位字符类型
    - char16_t 和 char32_t 用于Unicode字符集

### bool类型
- true 和 false
- 自动转换
    - 0转换为false，非0转换为true
    - false转换为0，true转换为1

## 用const替代#define
`const typename variable = value;`
- 指明类型
- 有作用域

## 浮点数
- `cout.setf(ios_base::fixed, ios_base::floatfield);`强制使用定点表示法: 1.2345e+4 -> 12345.000000（防止E表示法，显示后六位）

## 算术运算符
### 以{}初始化时进行的类型转换
- **如果存在丢失信息的风险，编译器将==报错==**
- 如果存在截断的风险，编译器将报警告
- 如果存在扩展的风险，编译器将报警告

### 整型提升
- 为了进行运算，C++将char、short等整型值==转换为int类型==

### 校验表
- 编译器通过校验表来确定在算术表达式中的类型转换（附C++11校验表）
    - 如果有一个操作数是long double，则将另一个操作数转换为long double
    - 否则，如果有一个操作数是double，则将另一个操作数转换为double
    - 否则，如果有一个操作数是float，则将另一个操作数转换为float
    - 否则，说明操作数都是整型，进行整型提升
    - 如果两个操作数都是有符号或无符号的，且其中一个操作数的级别比另一个低，则将较低级别的操作数转换为较高级别的操作数的类型
    - 否则，如果有一个操作数是无符号的，且另一个操作数是有符号的，则将有符号的操作数转换为无符号的操作数的类型
    - 否则，如果有符号类型可表示无符号类型的所有值，则将无符号的操作数转换为有符号的操作数的类型
    - 否则，两个操作数都转换为有符号类型的无符号版本

### 强制类型转换
- `type(expression)`C++独有
- `(type)expression`
- `static_cast<type>(expression)`C++独有，更严格
