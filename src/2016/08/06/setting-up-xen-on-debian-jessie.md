---
document_type: post
language: en
title: Setting up Xen on Debian Jessie
date: '2016-08-06'
categories:
- sysadmin
tags:
- linux
- xen
- memo
---

```
$ sudo aptitude install xen-linux-system xen-tools
$ sudo vim /etc/network/interfaces 
```

```
# The loopback network interface
auto lo
iface lo inet loopback

# The primary network interface
auto eth0
iface eth0 inet manual

auto xenbr0
iface xenbr0 inet static
  bridge_ports eth0
    address <ip_address>
    netmask <netmask>
    gateway <gateway>
    dns-nameservers <dns-nameservers>
```

```
$ sudo systemctl restart networking
```

```
$ sudo dpkg-divert --divert /etc/grub.d/08_linux_xen --rename /etc/grub.d/20_linux_xen
$ sudo update-grub
```

# TODO

- [Configure Dom0 memory](https://wiki.debian.org/Xen#Configure_Domain_0_Memory)
- [set](http://xen-tools.org/software/xen-tools/) [up](http://wiki.xenproject.org/wiki/Xen-tools) xen-tools

# Referenced

- [Xen Project Beginners Guide](http://wiki.xenproject.org/wiki/Xen_Project_Beginners_Guide)
- [Xen - Debian Wiki](https://wiki.debian.org/Xen)

