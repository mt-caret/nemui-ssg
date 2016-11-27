---
document_type: post
language: ja
title: Fisher-Yates shuffleのElm実装
date: '2016-09-03'
categories:
- programming
tags:
- Elm
- algorithm
---

友人に頼まれてjQueryとUnderscore.jsで昔実装した
[東方キャラ選び](https://mt-caret.github.io/th/)を勉強がてらElmで組みなおして
みようと思い立ったものの、`_.sample`に相当するものが存在しなかったため、
`_.sample`に必要な`_.shuffle`をElmで実装してみました。

<script src="https://gist.github.com/mt-caret/e3b2434c1283a41a961b962d7c1ebc69.js"></script>
<!--{% gist e3b2434c1283a41a961b962d7c1ebc69 Shuffle.elm %}-->


これで色々遊んでいたらランタイムエラーが出ない事が売りのElmでこんなものが
でました。

![ランタイムエラー](screenshot.png)

[coreのArray実装に問題があるようです。](https://github.com/elm-lang/core/issues/649)

