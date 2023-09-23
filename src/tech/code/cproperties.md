---
title: 三个月必忘环境配置
author: True
sidebar: heading
---

## 写给自己看
你看看你自己，永远记不住怎么在vscode里配置C环境，每次换新文件夹就复制.vscode，要是文件夹丢了咋办

## c_cpp_properties.json
```json
{
    "configurations": [
        {
            "name": "Mac",
            "includePath": [
                "${workspaceFolder}/**",
                "/Library/Developer/CommandLineTools/usr/include/c++/v1",
                "/usr/local/include",
                "/Library/Developer/CommandLineTools/usr/lib/clang/14.0.3/include",
                "/Library/Developer/CommandLineTools/usr/include"
            ],
            "defines": [],
            "macFrameworkPath": [
                "/Library/Developer/CommandLineTools/SDKs/MacOSX.sdk/System/Library/Frameworks"
            ],
            "cStandard": "c17",
            "cppStandard": "c++17",
            "intelliSenseMode": "macos-clang-arm64",
            "compilerPath": "/usr/bin/clang"
        }
    ],
    "version": 4
}
```
**注意在includePath里更新自己的commandlinetools版本号**

## tasks.json
命令行面板：Tasks:Configure Task
```json
"args": [
				"-g",//编译命令
				"${fileDirname}/${fileBasenameNoExtension}.c",//当前目录下的当前文件名后面拼接.c后缀
				"-o",//输出文件命令
				"${fileDirname}/${fileBasenameNoExtension}.o",//当前目录下的当前文件名后面拼接.o后缀
  			"&&", //前面是编译 这里是执行文件 不写这两行的结果是只编译不执行，这当然不是我们想要的效果
  			"${fileDirname}/${fileBasenameNoExtension}.o",
			],
```

## launch.json
```json
{
    "configurations": [
        {
            "name": "C/C++: clang 生成和调试活动文件",
            "type": "cppdbg",
            "request": "launch",
            "program": "${fileDirname}/${fileBasenameNoExtension}",
            "args": [],
            "stopAtEntry": false,
            "cwd": "${fileDirname}",
            "environment": [],
            "externalConsole": false,
            "MIMode": "lldb",
            "preLaunchTask": "C/C++: clang 生成活动文件"
        },
        {
            "name": "C/C++: gcc 生成和调试活动文件",
            "type": "cppdbg",
            "request": "launch",
            "program": "${fileDirname}/${fileBasenameNoExtension}",
            "args": [],
            "stopAtEntry": false,
            "cwd": "${fileDirname}",
            "environment": [],
            "externalConsole": true,
            "MIMode": "lldb",
            "preLaunchTask": "C/C++: gcc 生成活动文件"
        },
        {
            "name": "Launch",
            "type": "lldb",
            "request": "launch",
            "program": "${fileDirname}/${fileBasenameNoExtension}",
            "args": ["-arg1", "-arg2"],
        }
    ],
    "version": "2.0.0"
}
```