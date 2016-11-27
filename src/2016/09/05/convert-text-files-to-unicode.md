---
document_type: post
language: ja
title: Unicodeに変換
date: '2016-09-05'
categories:
- hack
tags:
- memo
---

```bash
find . -name '*.txt' -print0 | xargs -0 nkf --overwrite
```

ディレクトリ内にあるテキストファイルを見つけて、UTF-8に変換するやつです。

