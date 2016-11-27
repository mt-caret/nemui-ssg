---
document_type: post
language: ja
title: GPA計算機
date: '2016-09-05'
categories:
- hack
tags:
- JavaScript
---

<a href='javascript:!function()%7Bvar%20a%3D%24(%24(%22tbody%22)%5B2%5D.children).filter(function()%7Breturn%208%3D%3D%3Dthis.children.length%26%26%22%EF%BC%9F%22!%3D%3Dthis.children%5B2%5D.innerHTML%26%26%22%E8%A9%95%E8%AA%9E%22!%3D%3Dthis.children%5B2%5D.innerHTML%7D).map(function()%7Breturn%7Bscore%3Athis.children%5B2%5D.innerHTML%2Cnum%3AparseInt(this.children%5B3%5D.innerHTML)%7D%7D)%2Cb%3D0%2Cc%3D0%3Ba.toArray().forEach(function(a)%7Bswitch(a.score)%7Bcase%22%EF%BC%A1%22%3Ab%2B%3D4*a.num%3Bbreak%3Bcase%22%EF%BC%A2%22%3Ab%2B%3D3*a.num%3Bbreak%3Bcase%22%EF%BC%A3%22%3Ab%2B%3D2*a.num%3Bbreak%3Bcase%22%EF%BC%A4%22%3A%7Dc%2B%3Da.num%7D)%2Calert(%22GPA%3A%20%22%2B(b%2Fc).toFixed(2))%7D()%3B'>
これ</a>をブックマークバーにドラッグ&ドロップし、成績表ページでクリックすると
GPAが表示されます。

中身

<script src="https://gist.github.com/mt-caret/9c6456769b8951a8428830f956c6f777.js"></script>
<!--{% gist 9c6456769b8951a8428830f956c6f777 gpa.js %}-->

unminified

<script src="https://gist.github.com/mt-caret/c6f2dbef8d979383eb4034d366290481.js"></script>
<!--{% gist c6f2dbef8d979383eb4034d366290481 gpa_unminified.js %}-->
