---
title: 'CSS Size Properties'
author: agustealo
layout: post
permalink: /understanding-css-size-properties/
---
<p class="profile-description"> I was asked a question today by a friend who is learning web design. She wanted to know the difference between CSS size properties and methods, why use PX vs PT for fonts, or 100% vs EM. I would like to start by saying I&#8217;m not an expert on the matter but I will try to explain as best as I understand without a over complicated explanation.</p>
<!-- more -->
<p>Let&#8217;s take a look at the conversion chart below to see how these different units relates to each other.</p>

### Points(pt) vs Pixel(px)

PX and PT are similar in a lot of ways, one of the most obvious is that they&#8217;re both fixed values. The difference is pt is traditionally used in print media and px is use for digital image data. Px is also a smaller unit in comparison to pt (12pt=16px).

A pt is 1/72 of an in, and a px is 1/96 of an in.

A px is therefore 0.75 pt<a href="http://www.w3.org/TR/CSS21/syndata.html#x39" title="pt vs px" target="_blank"> [source]</a>.

In CSS size properties, everything is somewhat abstracted, so a unit such as a &#8220;pt&#8221; is not necessarily one point in physical size, especially on a screen, an &#8220;in&#8221; is not necessarily one inch in size, and so forth. Even a &#8220;px&#8221; is no longer necessarily one pixel in size anymore: Everything is scaled to be consistent with a hypothetical 96 ppi device viewed at normal reading distance, meaning that on screens that differ significantly from 96 ppi or from normal reading distance, everything will be scaled, but still maintain the same relationships ie a pt will still be 1.33334 px units and still be 1/72 of an in unit.

In print

In print, a point was traditionally somewhere from around 1/67 of an inch to 1/72.5 of an inch.

In digital mediums, it has become a de-facto standard for a point to be exactly 1/72 of an inch nowadays, though there are still alternative measurements in less common use which vary slightly from 1/72, but not by much.

In print, you don&#8217;t usually measure in pixels, because they are a technical detail about the target printer or device that are not an absolute measurement. For instance, a design may be printed at 125 dpi, 300 dpi or at 1200 dpi and still be the same physical dimensions.

