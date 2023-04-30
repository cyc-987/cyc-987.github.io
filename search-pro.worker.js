const d=(o,a)=>{const i=o.toLowerCase(),e=a.toLowerCase(),s=[];let n=0,l=0;const c=(t,p=!1)=>{let r="";l===0?r=t.length>20?`… ${t.slice(-20)}`:t:p?r=t.length+l>100?`${t.slice(0,100-l)}… `:t:r=t.length>20?`${t.slice(0,20)} … ${t.slice(-20)}`:t,r&&s.push(r),l+=r.length,p||(s.push(["strong",a]),l+=a.length,l>=100&&s.push(" …"))};let h=i.indexOf(e,n);if(h===-1)return null;for(;h>=0;){const t=h+e.length;if(c(o.slice(n,h)),n=t,l>100)break;h=i.indexOf(e,n)}return l<100&&c(o.slice(n),!0),s},g=Object.entries,y=Object.keys,f=o=>o.reduce((a,{type:i})=>a+(i==="title"?50:i==="heading"?20:i==="custom"?10:1),0),$=(o,a)=>{var i;const e={};for(const[s,n]of g(a)){const l=((i=a[s.replace(/\/[^\\]*$/,"")])==null?void 0:i.title)||"",c=`${l?`${l} > `:""}${n.title}`,h=d(n.title,o);h&&(e[c]=[...e[c]||[],{type:"title",path:s,display:h}]),n.customFields&&g(n.customFields).forEach(([t,p])=>{p.forEach(r=>{const u=d(r,o);u&&(e[c]=[...e[c]||[],{type:"custom",path:s,index:t,display:u}])})});for(const t of n.contents){const p=d(t.header,o);p&&(e[c]=[...e[c]||[],{type:"heading",path:s+(t.slug?`#${t.slug}`:""),display:p}]);for(const r of t.contents){const u=d(r,o);u&&(e[c]=[...e[c]||[],{type:"content",header:t.header,path:s+(t.slug?`#${t.slug}`:""),display:u}])}}}return y(e).sort((s,n)=>f(e[s])-f(e[n])).map(s=>({title:s,contents:e[s]}))},m=JSON.parse("{\"/\":{\"/slides.html\":{\"title\":\"Slide page\",\"contents\":[]},\"/about/\":{\"title\":\"这个人的头像为什么总是皮卡丘\",\"contents\":[{\"header\":\"我是谁？\",\"slug\":\"我是谁\",\"contents\":[\"zju在读本科生\",\"电子科学与技术专业\",\"爱好是写代码\"]},{\"header\":\"为什么要做这个网站？\",\"slug\":\"为什么要做这个网站\",\"contents\":[\"个人知识库\",\"方便记录一下我对我可怜的电脑都做了些什么操作\",\"有些人真的不会查看markdown文件，不如直接扔个网址来的快\"]},{\"header\":\"为什么这个人的头像总是皮卡丘？\",\"slug\":\"为什么这个人的头像总是皮卡丘\",\"contents\":[\"我初一语文老师的微信头像\",\"是我学习的启蒙者\"]},{\"header\":\"如果你想和我聊聊\",\"slug\":\"如果你想和我聊聊\",\"contents\":[\"QQ：2516803593\",\"email: \",\"2516803593@qq.com\",\"3220103853@zju.edu.cn\",\"cuiyucheng2004@gmail.com\",\"wechat：不告诉你（调皮）\",\"注意\",\"不要催更！\"]}]},\"/life/\":{\"title\":\"一些想法\",\"contents\":[]},\"/tech/\":{\"title\":\"技能\",\"contents\":[{\"header\":\"C大程\",\"slug\":\"c大程\",\"contents\":[\"程序专题设计课程学习之路\"]},{\"header\":\"FPGA开发\",\"slug\":\"fpga开发\",\"contents\":[\"数字系统课程学习\"]},{\"header\":\"乱七八糟的技术\",\"slug\":\"乱七八糟的技术\",\"contents\":[\"其他技能\"]}]},\"/tech/c/callback.html\":{\"title\":\"回调函数基础\",\"contents\":[{\"header\":\"什么是回调函数？\",\"slug\":\"什么是回调函数\",\"contents\":[]},{\"header\":\"两个定义\",\"slug\":\"两个定义\",\"contents\":[\"百度百科：回调函数就是一个通过函数指针调用的函数。如果你把函数的指针（地址）作为参数传递给另一个函数，当这个指针被用来调用其所指向的函数时，我们就说这是回调函数。\",\"维基百科：In computer programming, a callback is any executable code that is passed as an argument to other code, which is expected to call back (execute) the argument at a given time. This execution may be immediate as in a synchronous callback, or it might happen at a later time as in an asynchronous callback.\",\"提示\",\"把一段可执行的代码像参数传递那样传给其他代码，而这段代码会在某个时刻被调用执行，这就叫做回调。如果代码立即被执行就称为同步回调，如果在之后晚点的某个时间再执行，则称之为异步回调。\"]},{\"header\":\"为什么是回调函数？\",\"slug\":\"为什么是回调函数\",\"contents\":[\"要回答这个问题，我们先来了解一下回调函数的好处和作用，那就是解耦，对，就是这么简单的答案，就是因为这个特点，普通函数代替不了回调函数。\"]},{\"header\":\"举例\",\"slug\":\"举例\",\"contents\":[\"看一下维基百科上的一张图片：\",\"示例代码如下：\"]},{\"header\":\"解释\",\"slug\":\"解释\",\"contents\":[\"可以发现回调函数和普通函数之间的一个关键的不同：在回调中，主程序把回调函数像参数一样传入库函数。这样一来，只要我们改变传进库函数的参数，就可以实现不同的功能，是不是很灵活？并且丝毫不需要修改库函数的实现，这就是解耦。\",\"主函数和回调函数是在同一层的，而库函数在另外一层，想一想，如果库函数对我们不可见，我们修改不了库函数的实现，也就是说不能通过修改库函数让库函数调用普通函数那样实现，那我们就只能通过传入不同的回调函数了，这也就是在日常工作中常见的情况。\"]}]},\"/tech/c/\":{\"title\":\"C大程开发过程中的小tips\",\"contents\":[{\"header\":\"知识储备\",\"slug\":\"知识储备\",\"contents\":[]},{\"header\":\"callback回调函数初步\",\"slug\":\"callback回调函数初步\",\"contents\":[\"阐释了回调函数的入门解释以及基础使用方法。\"]}]},\"/tech/others/Git.html\":{\"title\":\"Git：每一个开发者都必须要学习的工具\",\"contents\":[{\"header\":\"什么是Git？\",\"slug\":\"什么是git\",\"contents\":[\"Git 是一个开源的分布式版本控制系统，用于敏捷高效地处理任何或小或大的项目。在开发中分布式文件管理系统，可以便于多人协作开发。\",\"交互式学习Git\",\"这里提供一个可供交互式学习Git的网站，可以先学起来，后面我会陆续更新常用指令文档。Learn Git Branching\"]},{\"header\":\"Git初步\",\"slug\":\"git初步\",\"contents\":[\"我觉得我应该先去写作业\"]}]},\"/tech/others/\":{\"title\":\"技能·导航\",\"contents\":[{\"header\":\"vscode远程开发\",\"slug\":\"vscode远程开发\",\"contents\":[\"Mac -> Win\"]},{\"header\":\"Git\",\"slug\":\"git\",\"contents\":[\"一个开源的分布式版本控制系统\"]}]},\"/tech/others/vscode%E8%BF%9C%E7%A8%8B%E5%BC%80%E5%8F%91%EF%BC%9A%E8%BF%9E%E6%8E%A5%E6%9C%AC%E5%9C%B0windows%E8%99%9A%E6%8B%9F%E6%9C%BA.html\":{\"title\":\"技术改变世界\",\"contents\":[{\"header\":\"\",\"slug\":\"\",\"contents\":[\"参考网址：here\",\"设置->应用->可选功能\",\"OpenSSH Client, OpenSSH Server\"]},{\"header\":\"check是否安装成功\",\"slug\":\"check是否安装成功\",\"contents\":[\"以管理员模式启动powershell\"]},{\"header\":\"设置自启动sshd\",\"slug\":\"设置自启动sshd\",\"contents\":[]},{\"header\":\"启动sshd service\",\"slug\":\"启动sshd-service\",\"contents\":[]},{\"header\":\"检查是否在监听端口22\",\"slug\":\"检查是否在监听端口22\",\"contents\":[]},{\"header\":\"检查防火墙是否放行\",\"slug\":\"检查防火墙是否放行\",\"contents\":[\"以本地虚拟机为例：\",\"注意：密码可能是你的微软账户密码\"]}]}}}");self.onmessage=({data:o})=>{self.postMessage($(o.query,m[o.routeLocale]))};
//# sourceMappingURL=original.js.map
