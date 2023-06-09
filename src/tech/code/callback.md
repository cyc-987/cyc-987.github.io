---
title: 回调函数基础
author: false
sidebar: heading
---

## 什么是回调函数？

### 两个定义
> 百度百科：回调函数就是一个通过函数指针调用的函数。如果你把函数的指针（地址）作为参数传递给另一个函数，当这个指针被用来调用其所指向的函数时，我们就说这是回调函数。


> 维基百科：In computer programming, a callback is any executable code that is passed as an argument to other code, which is expected to call back (execute) the argument at a given time. This execution may be immediate as in a synchronous callback, or it might happen at a later time as in an asynchronous callback. 

:::tip 
把一段可执行的代码像参数传递那样传给其他代码，而这段代码会在某个时刻被调用执行，这就叫做回调。如果代码立即被执行就称为同步回调，如果在之后晚点的某个时间再执行，则称之为异步回调。
:::

## 为什么是回调函数？

要回答这个问题，我们先来了解一下回调函数的好处和作用，那就是**解耦**，对，就是这么简单的答案，就是因为这个特点，普通函数代替不了回调函数。

### 举例

看一下维基百科上的一张图片：

![](/c/callback/wiki1.jpeg)

示例代码如下：

```c
#include<stdio.h>
#include<softwareLib.h> // 包含Library Function所在读得Software library库的头文件

int Callback() // Callback Function
{
    // TODO
    return 0;
}
int main() // Main program
{
    // TODO
    Library(Callback);
    // TODO
    return 0;
}
```

### 解释

可以发现*回调函数*和*普通函数*之间的一个关键的不同：在回调中，主程序把回调函数像参数一样传入库函数。这样一来，只要我们改变传进库函数的参数，就可以实现不同的功能，是不是很灵活？并且丝毫不需要修改库函数的实现，这就是**解耦**。

主函数和回调函数是在同一层的，而库函数在另外一层，想一想，如果库函数对我们不可见，我们修改不了库函数的实现，也就是说不能通过修改库函数让库函数调用普通函数那样实现，那我们就只能通过传入不同的回调函数了，这也就是在日常工作中常见的情况。

## 如何使用回调函数？

### 示例

下面来看一段简单的可以执行的同步回调函数代码：

```c
#include<stdio.h>

//定义三个回调函数
int Callback_1() // Callback Function 1
{
    printf("Hello, this is Callback_1 ");
    return 0;
}

int Callback_2() // Callback Function 2
{
    printf("Hello, this is Callback_2 ");
    return 0;
}

int Callback_3() // Callback Function 3
{
    printf("Hello, this is Callback_3 ");
    return 0;
}

//调用回调函数的函数，你注意到使用了函数指针作为传入的参数
int Handle(int (*Callback)())
{
    printf("Entering Handle Function. ");
    Callback();
    printf("Leaving Handle Function. ");
}

//主程序在这里
int main()
{
    printf("Entering Main Function. ");
    Handle(Callback_1);
    Handle(Callback_2);
    Handle(Callback_3);
    printf("Leaving Main Function. ");
    return 0;
}
```
运行结果过于简单，不在这里展示

### 解释

可以看到，`Handle()`函数里面的参数是一个指针，在`main()`函数里调用`Handle()`函数的时候，给它传入了函数`Callback_1()/Callback_2()/Callback_3()`的函数名，这时候的函数名就是对应函数的指针，也就是说，**回调函数其实就是函数指针的一种用法**。

## 进阶：使用带参数的回调函数

### 示例

还是以上文程序为例，但是稍作修改：

```c
#include<stdio.h>

//只是定义的每个函数加了参数
int Callback_1(int x) // Callback Function 1
{
    printf("Hello, this is Callback_1: x = %d ", x);
    return 0;
}

int Callback_2(int x) // Callback Function 2
{
    printf("Hello, this is Callback_2: x = %d ", x);
    return 0;
}

int Callback_3(int x) // Callback Function 3
{
    printf("Hello, this is Callback_3: x = %d ", x);
    return 0;
}

//注意到传递参数的形式有所不同，特别注意
int Handle(int y, int (*Callback)(int))
{
    printf("Entering Handle Function. ");
    Callback(y);
    printf("Leaving Handle Function. ");
}

//主程序
int main()
{
    int a = 2;
    int b = 4;
    int c = 6;
    printf("Entering Main Function. ");
    Handle(a, Callback_1);
    Handle(b, Callback_2);
    Handle(c, Callback_3);
    printf("Leaving Main Function. ");
    return 0;
}

```

### 解释

可以看到，并不是直接把`int Handle(int (*Callback)()) `改成 `int Handle(int (*Callback)(int))` 就可以的，而是通过另外增加一个参数来保存回调函数的参数值，像这里 `int Handle(int y, int (*Callback)(int))` 的参数 `y`。同理，可以使用多个参数的回调函数。

这就完成了对回调函数的基本解释