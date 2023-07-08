---
title: GNU Make
author: false
sidebar: heading
---

## 开始之前
### 构建程序的步骤（C为例）
- 编译预处理-->**.i**
- 编译成汇编代码-->**.s**
- 汇编成目标代码-->**.o**
- 链接成可执行程序-->**.out**

`$gcc <filename.c> --save-temps` 用于保存中间过程文件

`$gcc -c <filename.c>` 只产生目标文件不链接

## 例子程序的依赖关系
eg:
![](/c/make/eg.png)

## makefile固有变量(v1)

>target: dependencies
>
>actions

```makefile
sum: main.o sum.o
    gcc -o sum main.o sum.o
    #gcc -o $@ main.o sum.o

main.o: main.c sum.h
    gcc -c main.c
    #gcc -c $*.c

sum.o: sum.c sum.h
    gcc -c sum.c
```

**目的：使动作和具体的目标名无关**

- `$@` 目标文件
- `$*` 目标文件的前缀（即去掉后缀名）
- `$^` 所有的依赖文件
- `$<` 第一个依赖文件

## 定义变量(v2)
**目的：把变动的部分集中在makefile头部**
- `<name> = <value>` 定义变量
- `$(<name>)` 使用变量

```makefile
CC = gcc
TARGET = sum
OBJS = main.o sum.o

$(TARGET): $(OBJS)
    $(CC) -o $@ $^

$(OBJS): sum.h
    $(CC) -c $*.c
```
另一个例子
```makefile
BASE = /home/blufox/base
CC =gcc
CFLAGS = -O –Wall
EFILE = $(BASE)/bin/compare_sorts INCLS = -I$(LOC)/include
LIBS        =   $(LOC)/lib/g_lib.a \
                     $(LOC)/lib/h_lib.a
LOC        =   /usr/local
OBJS = main.o    another_qsort.o    chk_order.o \
             compare.o    quicksort.o
$(EFILE): $(OBJS)
        @echo “linking ...”
        @$(CC) $(CFLAGS) –o $@ $(OBJS) $(LIBS)
$(OBJS): compare_sorts.h
        $(CC) $(CFLAGS) $(INCLS) –c $*.c
```

## 伪目标
```makefile
clean:
    rm *~ $(OBJS)
```
- `make <target>`会寻找当前目录下的makefile，以`target`为目标进行动作，例如`make clean`
- 一个makefile可以有不同的动作

## 自动分析依赖关系(v3)
- `gcc -MMD -c main.c` 会在编译main.c的同时分析其中引用的头文件，产生`main.d`文件：内容`main.o: main.c sum.h`
- 在makefile里可以引用这些.d文件，形成依赖说明
- `-include main.d sum.d`