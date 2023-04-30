import{_ as n,X as s,Y as a,a0 as t}from"./framework-a7f73175.js";const e="/c/callback/wiki1.jpeg",p={},c=t('<h2 id="什么是回调函数" tabindex="-1"><a class="header-anchor" href="#什么是回调函数" aria-hidden="true">#</a> 什么是回调函数？</h2><h3 id="两个定义" tabindex="-1"><a class="header-anchor" href="#两个定义" aria-hidden="true">#</a> 两个定义</h3><blockquote><p>百度百科：回调函数就是一个通过函数指针调用的函数。如果你把函数的指针（地址）作为参数传递给另一个函数，当这个指针被用来调用其所指向的函数时，我们就说这是回调函数。</p></blockquote><blockquote><p>维基百科：In computer programming, a callback is any executable code that is passed as an argument to other code, which is expected to call back (execute) the argument at a given time. This execution may be immediate as in a synchronous callback, or it might happen at a later time as in an asynchronous callback.</p></blockquote><div class="hint-container tip"><p class="hint-container-title">提示</p><p>把一段可执行的代码像参数传递那样传给其他代码，而这段代码会在某个时刻被调用执行，这就叫做回调。如果代码立即被执行就称为同步回调，如果在之后晚点的某个时间再执行，则称之为异步回调。</p></div><h2 id="为什么是回调函数" tabindex="-1"><a class="header-anchor" href="#为什么是回调函数" aria-hidden="true">#</a> 为什么是回调函数？</h2><p>要回答这个问题，我们先来了解一下回调函数的好处和作用，那就是<strong>解耦</strong>，对，就是这么简单的答案，就是因为这个特点，普通函数代替不了回调函数。</p><h3 id="举例" tabindex="-1"><a class="header-anchor" href="#举例" aria-hidden="true">#</a> 举例</h3><p>看一下维基百科上的一张图片：</p><figure><img src="'+e+`" alt="" tabindex="0" loading="lazy"><figcaption></figcaption></figure><p>示例代码如下：</p><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span><span class="token string">&lt;stdio.h&gt;</span></span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span><span class="token string">&lt;softwareLib.h&gt;</span> <span class="token comment">// 包含Library Function所在读得Software library库的头文件</span></span>

<span class="token keyword">int</span> <span class="token function">Callback</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">// Callback Function</span>
<span class="token punctuation">{</span>
    <span class="token comment">// TODO</span>
    <span class="token keyword">return</span> <span class="token number">0</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token keyword">int</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">// Main program</span>
<span class="token punctuation">{</span>
    <span class="token comment">// TODO</span>
    <span class="token function">Library</span><span class="token punctuation">(</span>Callback<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token comment">// TODO</span>
    <span class="token keyword">return</span> <span class="token number">0</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="解释" tabindex="-1"><a class="header-anchor" href="#解释" aria-hidden="true">#</a> 解释</h3><p>可以发现<em>回调函数</em>和<em>普通函数</em>之间的一个关键的不同：在回调中，主程序把回调函数像参数一样传入库函数。这样一来，只要我们改变传进库函数的参数，就可以实现不同的功能，是不是很灵活？并且丝毫不需要修改库函数的实现，这就是<strong>解耦</strong>。</p><p>主函数和回调函数是在同一层的，而库函数在另外一层，想一想，如果库函数对我们不可见，我们修改不了库函数的实现，也就是说不能通过修改库函数让库函数调用普通函数那样实现，那我们就只能通过传入不同的回调函数了，这也就是在日常工作中常见的情况。</p><h2 id="如何使用回调函数" tabindex="-1"><a class="header-anchor" href="#如何使用回调函数" aria-hidden="true">#</a> 如何使用回调函数？</h2><h3 id="示例" tabindex="-1"><a class="header-anchor" href="#示例" aria-hidden="true">#</a> 示例</h3><p>下面来看一段简单的可以执行的同步回调函数代码：</p><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span><span class="token string">&lt;stdio.h&gt;</span></span>

<span class="token comment">//定义三个回调函数</span>
<span class="token keyword">int</span> <span class="token function">Callback_1</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">// Callback Function 1</span>
<span class="token punctuation">{</span>
    <span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">&quot;Hello, this is Callback_1 &quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token number">0</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">int</span> <span class="token function">Callback_2</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">// Callback Function 2</span>
<span class="token punctuation">{</span>
    <span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">&quot;Hello, this is Callback_2 &quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token number">0</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">int</span> <span class="token function">Callback_3</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token comment">// Callback Function 3</span>
<span class="token punctuation">{</span>
    <span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">&quot;Hello, this is Callback_3 &quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token number">0</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">//调用回调函数的函数，你注意到使用了函数指针作为传入的参数</span>
<span class="token keyword">int</span> <span class="token function">Handle</span><span class="token punctuation">(</span><span class="token keyword">int</span> <span class="token punctuation">(</span><span class="token operator">*</span>Callback<span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">&quot;Entering Handle Function. &quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">Callback</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">&quot;Leaving Handle Function. &quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">//主程序在这里</span>
<span class="token keyword">int</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">&quot;Entering Main Function. &quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">Handle</span><span class="token punctuation">(</span>Callback_1<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">Handle</span><span class="token punctuation">(</span>Callback_2<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">Handle</span><span class="token punctuation">(</span>Callback_3<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">&quot;Leaving Main Function. &quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token number">0</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>运行结果过于简单，不在这里展示</p><h3 id="解释-1" tabindex="-1"><a class="header-anchor" href="#解释-1" aria-hidden="true">#</a> 解释</h3><p>可以看到，<code>Handle()</code>函数里面的参数是一个指针，在<code>main()</code>函数里调用<code>Handle()</code>函数的时候，给它传入了函数<code>Callback_1()/Callback_2()/Callback_3()</code>的函数名，这时候的函数名就是对应函数的指针，也就是说，<strong>回调函数其实就是函数指针的一种用法</strong>。</p><h2 id="进阶-使用带参数的回调函数" tabindex="-1"><a class="header-anchor" href="#进阶-使用带参数的回调函数" aria-hidden="true">#</a> 进阶：使用带参数的回调函数</h2><h3 id="示例-1" tabindex="-1"><a class="header-anchor" href="#示例-1" aria-hidden="true">#</a> 示例</h3><p>还是以上文程序为例，但是稍作修改：</p><div class="language-c line-numbers-mode" data-ext="c"><pre class="language-c"><code><span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span><span class="token string">&lt;stdio.h&gt;</span></span>

<span class="token comment">//只是定义的每个函数加了参数</span>
<span class="token keyword">int</span> <span class="token function">Callback_1</span><span class="token punctuation">(</span><span class="token keyword">int</span> x<span class="token punctuation">)</span> <span class="token comment">// Callback Function 1</span>
<span class="token punctuation">{</span>
    <span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">&quot;Hello, this is Callback_1: x = %d &quot;</span><span class="token punctuation">,</span> x<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token number">0</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">int</span> <span class="token function">Callback_2</span><span class="token punctuation">(</span><span class="token keyword">int</span> x<span class="token punctuation">)</span> <span class="token comment">// Callback Function 2</span>
<span class="token punctuation">{</span>
    <span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">&quot;Hello, this is Callback_2: x = %d &quot;</span><span class="token punctuation">,</span> x<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token number">0</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token keyword">int</span> <span class="token function">Callback_3</span><span class="token punctuation">(</span><span class="token keyword">int</span> x<span class="token punctuation">)</span> <span class="token comment">// Callback Function 3</span>
<span class="token punctuation">{</span>
    <span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">&quot;Hello, this is Callback_3: x = %d &quot;</span><span class="token punctuation">,</span> x<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token number">0</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">//注意到传递参数的形式有所不同，特别注意</span>
<span class="token keyword">int</span> <span class="token function">Handle</span><span class="token punctuation">(</span><span class="token keyword">int</span> y<span class="token punctuation">,</span> <span class="token keyword">int</span> <span class="token punctuation">(</span><span class="token operator">*</span>Callback<span class="token punctuation">)</span><span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">&quot;Entering Handle Function. &quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">Callback</span><span class="token punctuation">(</span>y<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">&quot;Leaving Handle Function. &quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

<span class="token comment">//主程序</span>
<span class="token keyword">int</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token keyword">int</span> a <span class="token operator">=</span> <span class="token number">2</span><span class="token punctuation">;</span>
    <span class="token keyword">int</span> b <span class="token operator">=</span> <span class="token number">4</span><span class="token punctuation">;</span>
    <span class="token keyword">int</span> c <span class="token operator">=</span> <span class="token number">6</span><span class="token punctuation">;</span>
    <span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">&quot;Entering Main Function. &quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">Handle</span><span class="token punctuation">(</span>a<span class="token punctuation">,</span> Callback_1<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">Handle</span><span class="token punctuation">(</span>b<span class="token punctuation">,</span> Callback_2<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">Handle</span><span class="token punctuation">(</span>c<span class="token punctuation">,</span> Callback_3<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token function">printf</span><span class="token punctuation">(</span><span class="token string">&quot;Leaving Main Function. &quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">return</span> <span class="token number">0</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="解释-2" tabindex="-1"><a class="header-anchor" href="#解释-2" aria-hidden="true">#</a> 解释</h3><p>可以看到，并不是直接把<code>int Handle(int (*Callback)()) </code>改成 <code>int Handle(int (*Callback)(int))</code> 就可以的，而是通过另外增加一个参数来保存回调函数的参数值，像这里 <code>int Handle(int y, int (*Callback)(int))</code> 的参数 <code>y</code>。同理，可以使用多个参数的回调函数。</p><p>这就完成了对回调函数的基本解释</p>`,29),i=[c];function o(l,u){return s(),a("div",null,i)}const k=n(p,[["render",o],["__file","callback.html.vue"]]);export{k as default};
