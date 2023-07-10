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

### 字符串输入
- cin通过空白（空格、制表符、换行符）来确定字符串的结束位置（这并不好用！）
- `cin.getline()`：面向行的输入，遇到换行符结束
    - `cin.getline(name, ArSize);`
    - 读完==丢弃==换行符
- `cin.get()`：面向行的输入，遇到换行符结束
    - `cin.get(name, ArSize);`
    - 读完==保留==换行符

#### tips:如何丢弃cin留在输入队列中的换行符
```cpp
cin.get();//cin.get(ch)也可以
(cin >> valuename).get();//cin>>name返回cin，所以可以这样写
```

## String类
**头文件：string**<br>
**命名空间：std**

与字符数组的区别
- 可声明为简单变量
- 可自动处理调整长度

### 赋值、拼接和附加
- 可以将一个string对象赋给另一个string对象
- 简化的字符串合并操作
    - `str1 = str2 + str3;`
    - `str1 += str2;`
- C风格字符串也可以赋给string对象

### 其他
- `int len1 = str1.size();`取长度

### I/O
**每次读取一行时**
- `getline(cin, str);`
- 此时`getline`并不是一个方法，而是一个函数，它的第一个参数是一个输入流，第二个参数是一个string对象
- 读取完毕后，换行符会被丢弃

### 原始字符串（C++11）
```cpp
cout << R"("I'd give my right arm to be" " a great violinist.")" << endl;
cout << R"+*("I'd give my right arm to be" " a great violinist.")+*" << endl;
```
- 原始字符串的内容是括号内的内容，括号内的内容会被原样输出
- 可以使用自定义的定界符，如`R"+*(xxx)+*"`，定界符的长度可以是任意的

## 结构
**可以省略结构体的关键字struct！！！**<br>

### 初始化
- 等号可选（C++11）
- 大括号不包含东西时置零
- 不允许缩窄转换

### 结构中的位字段（C也有）
**目的：使得创建与某个硬件上的寄存器对应的数据结构非常方便**<br>
```cpp
struct torgle_register
{
    unsigned int SN : 4;//4位，给SN
    unsigned int : 4;//4位，不使用
    bool goodIn : 1;//1位
    bool goodTorgle : 1;//1位
};
```

### 共用体
**是一种数据格式，允许==在相同的内存位置存储不同的数据类型==**<br>
```cpp
union one4all
{
    int int_val;
    long long_val;
    double double_val;
};
```
使用方法
```cpp
one4all pail;
pail.int_val = 15;
cout << pail.int_val << endl;
pail.double_val = 1.38;
cout << pail.double_val << endl;
```
- 共用体的大小等于最大成员的大小
- 一次只能存储一个值
- 可以用来节省内存