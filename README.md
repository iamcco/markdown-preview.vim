## Introduction

[![Join the chat at https://gitter.im/iamcco/markdown-preview.vim](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/iamcco/markdown-preview.vim?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

[中文](./README_cn.md)

Using the markdown-preview.vim plugin you can preview markdown on real-time
through a browser

> this plugin need your vim support py2/py3 features  
> test on windows/ubuntu14/Mac OS X

### screenshot

**markdown preview**

![screenshot](https://cloud.githubusercontent.com/assets/5492542/15363504/839753be-1d4b-11e6-9ac8-def4d7122e8d.gif)

**Typeset math**

![screenshot](https://cloud.githubusercontent.com/assets/5492542/20455946/275dc74c-aea3-11e6-96f8-0d1a47e50f95.png)

### Installation

with [vim-plug][vim-plug]:

add `Plug 'iamcco/markdown-preview.vim'` to the `vimrc` or `init.vim` file and type `:PlugInstall`

or with MathJax support for typesetting math:

```
Plug 'iamcco/mathjax-support-for-mkdp'
Plug 'iamcco/markdown-preview.vim'
```

### Usage

**Command:**

```
    MarkdownPreview
    " open preview window in markdown buffer

    MarkdownPreviewStop
    " close the preview window and server

```
> when MarkdownPreview command can't open preview window, you can use the
MarkdownPreviewStop command before using MarkdownPreview command

**Default Setting:**

```
    let g:mkdp_path_to_chrome = ""
    " path to the chrome or the command to open chrome(or other modern browsers)
    " if set, g:mkdp_browserfunc would be ignored

    let g:mkdp_browserfunc = 'MKDP_browserfunc_default'
    " callback vim function to open browser, the only param is the url to open

    let g:mkdp_auto_start = 0
    " set to 1, the vim will open the preview window once enter the markdown
    " buffer

    let g:mkdp_auto_open = 0
    " set to 1, the vim will auto open preview window when you edit the
    " markdown file

    let g:mkdp_auto_close = 1
    " set to 1, the vim will auto close current preview window when change
    " from markdown buffer to another buffer

    let g:mkdp_refresh_slow = 0
    " set to 1, the vim will just refresh markdown when save the buffer or
    " leave from insert mode, default 0 is auto refresh markdown as you edit or
    " move the cursor

    let g:mkdp_command_for_global = 0
    " set to 1, the MarkdownPreview command can be use for all files,
    " by default it just can be use in markdown file

    let g:mkdp_open_to_the_world = 0
    " set to 1, preview server available to others in your network
    " by default, the server only listens on localhost (127.0.0.1)
```

**Key Mapping:**

By default this Plugin has no mapping, if you want to has your own mapping
you can map the keys to `<Plug>MarkdownPreview` for opening markdown preview window and
map keys to `<Plug>StopMarkdownPreview` for closing the preview window

Examples for mapping the `F8` key to open markdown preview window and `F9` key to
close preview window:

```
nmap <silent> <F8> <Plug>MarkdownPreview        " for normal mode
imap <silent> <F8> <Plug>MarkdownPreview        " for insert mode
nmap <silent> <F9> <Plug>StopMarkdownPreview    " for normal mode
imap <silent> <F9> <Plug>StopMarkdownPreview    " for insert mode
```

For **OS X** users you can set the `g:mkdp_path_to_chrome` as below (if you use chrome):

```
let g:mkdp_path_to_chrome = "open -a Google\\ Chrome"
" or
let g:mkdp_path_to_chrome = "/Applications/Google\\ Chrome.app/Contents/MacOS/Google\\ Chrome"
```
see issue[#1](https://github.com/iamcco/markdown-preview.vim/issues/1) for detail

### FAQ

Q: the firefox preview window didn't close when leave the markdown file in vim

A: if you want the plugin auto close the preview window on firefox, you have to do some config:

1. open firefox
2. type `about:config` in the address bar and press Enter key
3. search `dom.allow_scripts_to_close_windows` item and set the value to `true`

> you have to know what will happend when you do the config above

### Changelog

* 2017/07/16: add `g:mkdp_open_to_the_world` option
* 2016/11/19: MathJax support with [mathjax-support-for-mkdp](https://github.com/iamcco/mathjax-support-for-mkdp) plugin
* 2016/08/28: set the title of preview page with file name
* 2016/05/18: support key mapping and new `g:mkdp_command_for_global` option item
* 2016/03/12: new Github like markdown styles [markdown.css](https://github.com/iamcco/markdown.css) and support task list
* 2016/01/24: support display the local picture in markdown

### Buy Me A Coffee ☕️

<div style="height: 294px;">
<div style="width: 257px;height: 294px;text-align: center;float:left;margin-right: 10px;">
WeChat
<img width="257" height="294" src="https://user-images.githubusercontent.com/5492542/42769573-12c8ec88-8955-11e8-908f-e584102df560.png" alt="">
</div>
<div style="width: 257px;height: 294px;text-align: center;float: left;">
alipay
<img width="257" height="294" src="https://user-images.githubusercontent.com/5492542/42769382-9cdd702a-8954-11e8-93c2-f8126847ae9d.png" alt="">
</div>
</div>
