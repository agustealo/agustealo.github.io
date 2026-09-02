---
title: 'CSS Size Properties'
author: agustealo
layout: post
permalink: /understanding-css-size-properties/
categories: Blog
---
<p class="widget-description">I was asked a question today by a friend who is learning web design. She wanted to know the difference between CSS size properties and methods, why use PX vs PT for fonts, or 100% vs EM. I would like to start by saying I&#8217;m not an expert on the matter, but I will try to explain it without an overcomplicated explanation.</p><!-- more -->

<p>Let&#8217;s take a look at how these units relate to each other.</p>

<h2>Points (pt) vs pixels (px)</h2>

<p>PX and PT are similar in a lot of ways. One of the most obvious is that they&#8217;re both fixed values. The difference is that pt is traditionally used in print media and px is used for digital image data. Px is also a smaller unit in comparison to pt: 12pt = 16px.</p>

<p>A pt is 1/72 of an inch, and a px is 1/96 of an inch in the CSS reference model.</p>

<p>A px is therefore 0.75 pt. <a href="https://www.w3.org/TR/CSS21/syndata.html#length-units" target="_blank" rel="noopener noreferrer">W3C reference</a>.</p>

<p>In CSS size properties, everything is somewhat abstracted, so a unit such as a &#8220;pt&#8221; is not necessarily one point in physical size on a screen, an &#8220;in&#8221; is not necessarily one physical inch, and even a &#8220;px&#8221; is no longer necessarily one hardware pixel. CSS keeps the unit relationships consistent through its reference pixel model.</p>

<h2>In print</h2>

<p>In print, a point was traditionally somewhere from around 1/67 of an inch to 1/72.5 of an inch.</p>

<p>In digital mediums, it has become a de facto standard for a point to be exactly 1/72 of an inch, though alternative measurements still exist in less common use.</p>

<p>In print, you don&#8217;t usually measure in pixels because they are a technical detail of the target printer or device rather than an absolute physical measurement. A design may be printed at 125 dpi, 300 dpi, or 1200 dpi and still have the same physical dimensions.</p>
