---
document_type: post
language: en
title: Setting up apt-mirror on Debian Jessie
date: '2016-08-05'
categories:
- sysadmin
tags:
- linux
- memo
---

# apt-mirror setup

```
$ sudo aptitude install apt-mirror
$ sudo vim /etc/apt/mirror.list
```

```
############# config ##################
#
set base_path    /var/spool/apt-mirror
#
set mirror_path  $base_path/mirror
set skel_path    $base_path/skel
set var_path     $base_path/var
#set cleanscript $var_path/clean.sh
set defaultarch  amd64
#set postmirror_script $var_path/postmirror.sh
#set run_postmirror 0
set nthreads     4
set _tilde 0
#
############# end config ##############

deb-amd64 http://ftp.jaist.ac.jp/debian jessie main contrib non-free
deb-src http://ftp.jaist.ac.jp/debian jessie main contrib non-free
deb-amd64 http://ftp.jaist.ac.jp/debian jessie-updates main contrib non-free
deb-src http://ftp.jaist.ac.jp/debian jessie-updates main contrib non-free
deb-amd64 http://ftp.jaist.ac.jp/debian sid main contrib non-free
deb-src http://ftp.jaist.ac.jp/debian sid main contrib non-free

clean http://ftp.jaist.ac.jp/debian
```

```
$ sudo vim /etc/cron.d/apt-mirror/
```

```
0 2 * * * apt-mirror  /usr/bin/apt-mirror > /var/spool/apt-mirror/var/cron.log
```

```
$ sudo chown apt-mirror:apt-mirror /var/spool/apt-mirror
$ sudo -u apt-mirror apt-mirror
```

# nginx setup

```
$ sudo aptitude install nginx
$ sudo vim /etc/nginx/sites-available/apt-mirror
```

```nginx
server {
  server_name mirror.delta;
  listen 80;
  autoindex on;
  location /debian {
    root /var/spool/apt-mirror/mirror/ftp.jaist.ac.jp;
  }
}
```

```
$ sudo ln -s /etc/nginx/sites-available/apt-mirror /etc/nginx/sites-enabled
$ sudo systemctl start nginx
$ sudo systemctl enable nginx
```

# Referenced

- [Ubuntu のパッケージリポジトリのミラーをローカルに建てたら幸せになった話](https://yosida95.com/2013/05/19/003744.html)
- [How To Create A Local Debian/Ubuntu Mirror With apt-mirror](https://www.howtoforge.com/local_debian_ubuntu_mirror)

