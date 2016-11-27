---
document_type: post
language: ja
title: Debian Jessieインストール後の初動
date: '2016-09-20'
categories:
- workflow
tags:
- memo
---

仮想マシンにDebianをインストールした後なにをするかのメモです。

# sudo導入

```
$ su -
# aptitude install sudo
# gpasswd -a delta sudo
# reboot
```

# vim

```
$ sudo aptitude install vim
```

# ディレクトリ名英語化

```
$ LANG=C xdg-user-dirs-gtk-update
```

# [Virtualbox Guest Additions](https://virtualboxes.org/doc/installing-guest-additions-on-debian/)

```
$ sudo aptitude install build-essential module-assistant linux-headers-$(uname -r) 
$ sudo m-a prepare
$ sudo sh /media/cdrom/VBoxLinuxAdditions.run
```

# 自動ログイン

```
$ sudo vim /etc/gdm3/daemon.conf
$ sudo reboot
```

```
[daemon]
# Enabling automatic login
AutomaticLoginEnable = true
AutomaticLogin = delta
```

# Gnomeウィンドウ一覧

```
$ firefox 'https://extensions.gnome.org/extension/602/window-list/'
```

# ブラウザ

```
$ sudo aptitude install chromium
```

# mozcによる日本語入力

```
$ sudo aptitude install fcitx-mozc
$ im-config
$ sudo reboot
```

# [Virtualenv Burrito](https://github.com/brainsik/virtualenv-burrito)

```
$ sudo aptitude install curl
$ curl -sL https://raw.githubusercontent.com/brainsik/virtualenv-burrito/master/virtualenv-burrito.sh | $SHELL
$ source /home/delta/.venvburrito/startup.sh
```

# [RictyDiminished-with-FiraCode](http://slides.com/hakatashi/ricty-fira-code#/)

```
$ sudo aptitude install fontforge git
$ git clone --recursive https://github.com/hakatashi/RictyDiminished-with-FiraCode
$ mkvirtualenv RictyDiminished-with-FiraCode
$ pip install -r requirements.txt
$ make all
```

# fish

```
$ sudo aptitude install libncurses5-dev
$ wget https://fishshell.com/files/2.3.1/fish-2.3.1.tar.gz
$ tar xzvf fish-2.3.1.tar.gz
$ cd fish-2.3.1
$ ./configure
$ make
$ sudo make install
$ echo /usr/local/bin/fish | sudo tee -a /etc/shells
$ chsh -s $(which fish)
$ sudo !!
```

# OPAM

```
$ wget https://raw.github.com/ocaml/opam/master/shell/opam_installer.sh
$ view opam_installer.sh
$ chmod +x opam_installer.sh
$ ./opam_installer.sh /usr/local/bin
$ # https://github.com/ocaml/opam/issues/2255#issuecomment-177025354
$ vim ~/.config/fish/config.fish ~/.opam/opam-init/init.fish ~/.opam/opam-init/variables.fish
```

