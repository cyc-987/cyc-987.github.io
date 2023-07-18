---
title: 复合类型
author: false
sidebar: heading
prev: ./data.md
next: ./loop.md
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

## 枚举
### 语法
```cpp
enum spectrum {red, orange, yellow, green, blue, violet, indigo, ultraviolet};
spectrum band;
band = blue;
band = 2000;//invalid
++band;//invalid
band = 3;//invalid
int color = 3 + red;//执行整型提升
```
## 指针
### 指针和数字
```cpp
int* pt;
pt = 0xB8000000;//invalid in C++11
pt = (int*)0xB8000000;//valid
```

### 使用new来分配内存
**比malloc更好！**<br>
```cpp
int* pi = new int;//分配一个int大小的内存
typename* pointer_name = new typename;//分配一个typename大小的内存
```
注意：
- 常规变量声明存储在栈(stack)中
- new分配的内存存储在堆(heap)或自由存储区(free store)中

### 使用delete来释放内存
**只能释放new分配的内存**<br>
```cpp
delete pointer_name;
```
注意：
- 不会删除指针本身，只会删除指针指向的内存
- 不要释放已经释放的内存

### new与动态数组(dynamic array)，动态结构(dynamic structure)
在运行时为数组分配空间
```cpp
int* psome = new int [10];//分配10个int大小的内存
delete [] psome;//释放内存
```
==方括号==告诉程序，应该释放整个数组，而不是单个元素

也可以创建动态结构！
```cpp
inflatable *ps = new inflatable;//分配一个inflatable大小的内存
delete ps;//释放内存
```

## 指针，数组，指针算术
- 将指针变量+1后，其增加的值等于指向的类型占用的字节数
- 对数组应用sizeof运算符，得到的是整个数组的大小
- 对指针应用sizeof运算符，得到的是指针本身的大小

数组的地址：
- 数组名被解释为==数组第一个元素的地址==
- 对数组名应用地址运算符时，得到的是==整个数组的地址==

### 自动存储、静态存储和动态存储
#### 自动存储
- 自动变量：函数内部定义的常规变量使用自动存储空间
- 是局部变量，作用域为包含它的代码块
- 存储在栈中

#### 静态存储
- 两种声明方式：
    - 在函数外部定义
    - 使用关键字static

#### 动态存储
- 使用new和delete
- 管理了一个内存池，称为自由存储区或堆
- 生命周期不完全受程序或函数的生存时间控制

## 数组的替代品：vector和array(C++11)
### 模板类vector
**头文件：vector**<br>
- 是一种动态数组
- 使用new和delete来管理内存，但是自动完成
- 在命名空间std中
- 功能比数组强大，但是运行效率稍低

示例：
```cpp
vector<int> vi;//创建一个int类型的vector，size为0
vector<int> vi(10);//创建一个int类型的vector，size为10
```
- 可以自动调整长度，因此可以将初始长度设置为0
- 要调整长度和其他操作，请使用vector类的方法

### 模板类array(C++11)
**头文件：array**<br>
- 长度固定，效率与数组相同
- 使用栈，更方便安全
- 命名空间std

示例：
```cpp
array<int, 10> ai;//创建一个int类型的array，size为10
array<double, 4> ad = {1.2, 2.1, 3.4, 4.3};//创建一个double类型的array，size为4
```

### 比较数组、vector对象和array对象
```cpp
array<double> a1 = {1.2, 2.1, 3.4, 4.3};
a1[-2] = 20.2;//同样，c++不会检查越界
a1.at(-2) = 20.2;//会检查越界，越界会抛出异常,代价是效率低
```