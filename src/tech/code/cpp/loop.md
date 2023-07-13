---
title: 循环和关系表达式
author: false
sidebar: heading
---

## 关于表达式和语句
`cout.setf(ios_base::boolalpha);`可以使`cout`输出`true`和`false`而不是`1`和`0`

- C++表达式是值或值和运算符的组合，每个C++表达式都有值
- 表达式加上分号成为语句，反过来不全成立

### ++和--的副作用和顺序点
- 任何完整的表达式末尾都是一个顺序点
```cpp
y = (4 + x++) + (6 + x++);//未定义
```
- 只保证在下一条语句执行之前x被递增两次，但是不保证x的递增顺序

### 语句块中的变量顺序
```cpp
#include <iostream>
int main()
{
    using std::cout;
    using std::endl;
    int x = 20;//原始值
    {
        cout << x << endl;//原始值
        int x = 100;//新值
        cout << x << endl;//新值
    }
    cout << x << endl;//原始值
    return 0;
}
```

### string类字符串的比较
- `==`和`!=`比较字符串的内容
- `>`和`<`比较字符串的字典顺序
- eg`(word == "done")`

## 循环

### 延时循环
- **头文件：ctime**
```cpp
#include <iostream>
#include <ctime>//包含clock()函数
int main()
{
    using namespace std;
    cout << "Enter the delay time, in seconds: ";
    float secs;
    cin >> secs;
    clock_t delay = secs * CLOCKS_PER_SEC;//将秒数转换为时钟周期数
    cout << "starting\a\n";
    clock_t start = clock();
    while (clock() - start < delay);//等待时间到达
    cout << "done \a\n";
    return 0;
}
```

### 基于范围的for循环(C++11)
```cpp
double prices[5] = {4.99, 10.99, 6.87, 7.99, 8.49};
for(double x : prices)
    cout << x << endl;
```
让代码能修改数组中内容的语法是**引用**
```cpp
for(double &x : prices)
    x = x * 0.8;
```
初始化列表也可以
```cpp
for(double x : {3.5, 2.5, 1.7, 6.9})
    cout << x << endl;
```

## 输入

### 基于cin的输入
`cin >> ch`：
- 忽略空格
- 发送给cin的输入被缓冲，直到按下回车键

### 使用cin.get(char)
- 可以读取空格
- 输入仍被缓冲，直到按下回车键<br>
备注：与C语言不同，并不需要往函数里传入地址，因为函数参数被设置成了引用

### 怀旧版get
**头文件：cstdio**
```cpp
ch = cin.get();
cin.put(ch);
```