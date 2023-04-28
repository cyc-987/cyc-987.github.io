---
title: 技术改变世界
author: false
sidebar: heading
date: 2023-04-25
tag: 
 - 小技巧
 - vscode
---



参考网址：[here](https://medium.com/geekculture/setup-ssh-server-on-windows-10-11-34c7f096eaff)

# 1.安装open ssh

1. 设置->应用->可选功能
2. OpenSSH Client, OpenSSH Server

## check是否安装成功

- 以管理员模式启动powershell
```
Get-WindowsCapability -Online | ? Name -like 'OpenSSH.Ser*'
```

# 2.配置ssh server

## 设置自启动sshd
```
Set-Service -Name sshd -StartupType 'Automatic'
```

## 启动sshd service
```
Start-Service sshd
```

## 检查是否在监听端口22
```
netstat -nao | find /i '":22"'
```

## 检查防火墙是否放行
```
Get-NetFirewallRule -Name *OpenSSH-Server* |select Name, DisplayName, Description, Enabled
```

# 3.更改默认shell至powershell（推荐）

```
New-ItemProperty -Path "HKLM:\SOFTWARE\OpenSSH" -Name DefaultShell -Value "C:\Windows\System32\WindowsPowerShell\v1.0\powershell.exe" -PropertyType String -Force
```

# 4. 获取当前用户信息

以本地虚拟机为例：
```
whoami
```

# 5.在本地虚拟机里测试ssh的访问权限

```
ssh f887\cyc@localhost
```

- 注意：密码可能是你的微软账户密码

# 6.enjoy!🍗