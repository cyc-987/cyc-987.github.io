---
title: Git：每一个开发者都必须要学习的工具
author: false
sidebar: heading
tag: 
 - 工具
---

## 什么是Git？

Git 是一个开源的分布式版本控制系统，用于敏捷高效地处理任何或小或大的项目。在开发中分布式文件管理系统，可以便于多人协作开发。

:::tip 交互式学习Git
这里提供一个可供交互式学习Git的网站，可以先学起来，后面我会陆续更新常用指令文档。[Learn Git Branching](https://learngitbranching.js.org/?locale=zh_CN)
:::

## Git的安装

- For Macos：自带
- For Windows：等我在虚拟机里研究一下再写

## Git初步（基础篇）

说实话，git只是一个工具，不需要了解的过于深入，只要**不把命令用错**就行。

:::danger
如果你在命令里发现了-f，请一定一定要谨慎，你可能会把同事的仓库吃掉！
:::

### 在你开始之前

Git 仓库中的提交记录保存的是你的目录下所有文件的快照，就像是把整个目录复制，然后再粘贴一样，但比复制粘贴优雅许多！

Git 希望提交记录尽可能地轻量，因此在你每次进行提交时，它并不会盲目地复制整个目录。条件允许的情况下，它会将当前版本与仓库中的上一个版本进行对比，并把所有的差异打包到一起作为一个提交记录。

Git 还保存了提交的历史记录。这也是为什么大多数提交记录的上面都有父节点的原因 —— 我们会在图示中用箭头来表示这种关系。对于项目组的成员来说，维护提交历史对大家都有好处。

关于提交记录太深入的东西咱们就不再继续探讨了，现在你可以把提交记录看作是项目的快照。提交记录非常轻量，可以快速地在这些提交记录之间切换！

### Git commit

```sh
git commit
```
*用于创建新的提交记录，即创建一个新的节点，并使当前分支指向新的节点*

### Git branch

```sh
git branch <branch name> #创建新分支
git checkout <branch name> #切换到新分支
git switch <branch name> #推荐使用的切换到新分支的命令
git checkout -b <branch name> #创建新分支并切换到新分支
```
*按逻辑分解工作到不同的分支*

### Git merge

```sh
git merge <branch2> #把branch2合并到当前分支里，但不改变branch2

git checkout <branch2> #切换到branch2
git merge <branch1> #把branch2也更新到最新的分支
```
*当没有一个分支包含了我们修改的所有内容，通过合并这两个分支来解决这个问题*

### Git rebase

```sh
git rebase <branch eg.main> #注意，请在需要合并的分支上操作
git rebase <branch eg.bugFix> #更新主分支
```

![](/others/git/git-rebase.png)

*第二种合并分支的方法，Rebase 实际上就是取出一系列的提交记录，“复制”它们，然后在另外一个地方逐个的放下去。Rebase 的优势就是可以创造更线性的提交历史。*

## 高级篇

### 在提交树上移动
