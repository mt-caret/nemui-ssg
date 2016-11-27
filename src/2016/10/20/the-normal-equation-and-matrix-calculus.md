---
document_type: post
language: ja
title: 正規方程式の微分(和訳記事)
date: '2016-10-20'
categories:
- mathematics
tags:
- machine_learning
math: true
---

この記事は[The Normal Equation and matrix calculus](http://eli.thegreenplace.net/2014/derivation-of-the-normal-equation-for-linear-regression/)
を和訳したものです。

---

数ヶ月前、線形回帰の正規方程式の導出に関する[記事](http://eli.thegreenplace.net/2015/the-normal-equation-and-matrix-calculus/)を書きました。
(訳注: こちらの記事も[翻訳しました](https://mt-caret.github.io/blog/2016/10/20/derivation-of-the-normal-equation-for-linear-regression.html)。)
導出の過程で行列解析を利用しスカラー量をベクトル量で微分しました。
この時、手順の説明を省き、

> ベクトル量で微分するのは
> 不安になるかもしれませんが、心配することはありません。
> 行列の正体は線形式をまとめたものにすぎません。
> したがって、ベクトルの各要素に関して微分し、結果をベクトルにまとめ直します。

記事についたコメントから察するに、読者の多くはこの説明を不十分に感じたようです。
「行列解析は黒魔術のように感じる」と言うもっともなコメントまでありました。
なぜ黒魔術のように感じるかというと普通の解析とくらべて遭遇することが少ないため、
恒等式に慣れたり、直感が身についたりしにくいからです。
しかし、実際のところは大した話ではないことを見せたいと思います。

まず、原理を理解するため単純な例から見ていきましょう。

$$
f(v) = a^Tv
$$

ここで $a$ と $v$ は両方 $n$ 次元だとします。[^1] $v$ について微分を考えます。
スカラー量による微分は（極限を用いて）はっきりとした定義がありますが、
ベクトル量による微分は何を意味するのでしょうか？単にベクトルの各成分について
偏微分し、新しいベクトルにまとめるだけです。つまり:

$$
\frac{\partial f}{\partial v} = 
\begin{bmatrix}
\frac{\partial f}{\partial v_1} \\\\
\frac{\partial f}{\partial v_2} \\\\
\dots \\\\
\frac{\partial f}{\partial v_n} \\\\
\end{bmatrix}
$$

例の $f$ をこれに当てはめてみましょう。
要素を並べて書いたほうが見やすいかもしれません。

$$
f(v) = a^Tv = a_1v_1 + a_2v_2 + ... + a_nv_n
$$

それぞれの要素について偏微分すると:

$$
\frac{\partial f}{\partial v_1} = a_1 \\\\
\frac{\partial f}{\partial v_2} = a_2 \\\\
\dots \\\\
\frac{\partial f}{\partial v_n} = a_n \\\\
$$

が得られ、これらをベクトルにまとめます。

$$
\frac{\partial f}{\partial v} = 
\begin{bmatrix}
a_1 \\\\
a_2 \\\\
\dots \\\\
a_n \\\\
\end{bmatrix}
$$

言い換えると、 $\frac{\partial f}{\partial v} = a$となります。

この例により、スカラー量のベクトル量による微分の手順が明らかになりました。

1. ベクトルと行列の次元を示す。
2. 

[^1]: ここで言うベクトル $v$ は*列ベクトル*です。
行ベクトルを得るには、転置します。また、この記事で使っている行列表記は

Let's get started with a simple example, which I'll use to demonstrate the
principles. Say we have the function:

Courseraの機械学習講義に取り組んでいたところ、多変量線形回帰のところでふと
目に留まることがありました。Andew Ng先生が
[「正規方程式」](https://en.wikipedia.org/w/index.php?title=Normal_equation&redirect=no)
を最小二乗法を用いた線形回帰問題の解析的解法として紹介する時、
特徴数が少ない場合などで勾配法より効果的である、という話はあったものの、
導出は省いてしまったのです。

ここで導出を示します。

ここで使う記号は機械学習講義で使われるものに合わせているため、Wikipediaなどで
使われているものとは異なりますが、意味するところは同じです。

$$
h_\theta(x) = \theta_0x_0 + \theta_1x_1 + \dots + \theta_nx_n
$$

で与えられる仮説関数(hypothesis function) $h_\theta(x)$ を考え、

$$
J(\theta\_{0...n})  = \frac{1}{2m} \sum_{i=1}^m \left( h \left(x^{(i)}\right) - y^{(i)} \right)^2
$$

で与えられる最小二乗法を用いた目的関数(cost function) $J(\theta\_{0...n})$
の最小化を図ります。

ここで $x^{(i)}$ は $m$ 個のテストデータの $i$ 番目の入力データ、
$y^{(i)}$は $i$ 番目の結果データです。

まず、行列表現に直します。

$$
\begin{bmatrix}
\theta_0 \\\
\theta_1 \\\
... \\\
\theta_n \\\
\end{bmatrix}
\in \mathbb{R}^{n+1}
$$

$m$ 個の入力データはそれぞれ（便宜上 $x_0 = 1$ とおいたとき）
同様に $n+1$ 行の列ベクトルになるため、仮説関数を

$$
h_\theta(x) = \theta^Tx
$$

と表現できます。ここでテストデータを縦に並べ、行列で表します。

$$
X =
\begin{bmatrix}
x^{(1)} \\\
x^{(2)} \\\
... \\\
x^{(m)} \\\
\end{bmatrix}
$$

このような計画行列 $X$
をおくと、目的関数の和を行列の積として次のように表現できます。

$$
J(\theta) = \frac{1}{2m}(X\theta - y)^T(X\theta -y)
$$

次に、転置行列の恒等式を利用した式変形で式を単純にします。どうせ微分したものを
$0$ と比較するため、ここで $\frac{1}{2m}$ を消します。

$$
J(\theta) = ((X\theta)^T - y^T)(X\theta - y) \\\
J(\theta) = (X\theta)^T X\theta - (X\theta)^T y - y^T (X\theta) + y^Ty
$$

ここで、 $X\theta$ と $y$ はともに列ベクトルであることに着目すると、
次元が一致している限り掛け算の順番は関係なくなることが分かり、さらに単純に
できます。

$$
J(\theta) = \theta^T X^T X\theta - 2(X\theta)^Ty + y^Ty
$$

$\theta$ が求めたい未知数であるため、上記の関数の最小値を取るような $\theta$
を求めるために、$\theta$ で微分し $0$ と比較します。ベクトルで微分するのは
不安になるかもしれませんが、心配することはありません。
行列の正体は線形式をまとめたものにすぎません。
したがって、ベクトルの各要素に関して微分し、結果をベクトルにまとめ直すと

$$
\frac{\partial J}{\partial \theta} = 2X^TX\theta - 2X^Ty = 0 \\\
X^TX\theta = X^Ty
$$

\[追記（2015年5月27日）: 微分を求める過程をさらに詳しく示す[記事](http://eli.thegreenplace.net/2015/the-normal-equation-and-matrix-calculus/)を書きました。\]

$X^TX$ が正則であることを仮定すると、両辺に左から $(X^TX)^{-1}$ を掛けると

$$
\theta = (X^TX)^{-1}X^Ty
$$

が得られます。

だいぶ辛い。
