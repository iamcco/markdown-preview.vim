## Introduction

[![Join the chat at https://gitter.im/iamcco/markdown-preview.vim](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/iamcco/markdown-preview.vim?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

[中文](./README_cn.md)

Using the markdown-preview.vim plugin, you can preview Markdown in real-time
with a web browser.

> This plugin needs your Vim to support Python 2 / Python 3 features.
> Tested on Windows / Ubuntu 14 / Mac OS X.

**Note:** PLEASE USE [markdown-preview.nvim](https://github.com/iamcco/markdown-preview.nvim) INSTEAD 

### Screenshots

**Markdown preview**

![screenshot](https://cloud.githubusercontent.com/assets/5492542/15363504/839753be-1d4b-11e6-9ac8-def4d7122e8d.gif)

**Typeset math**

![screenshot](https://cloud.githubusercontent.com/assets/5492542/20455946/275dc74c-aea3-11e6-96f8-0d1a47e50f95.png)

### Installation

With [vim-plug](https://github.com/junegunn/vim-plug):

Add `Plug 'iamcco/markdown-preview.vim'` to the `vimrc` or `init.vim` file and type `:PlugInstall`.

Or with MathJax support for typesetting math:

```
Plug 'iamcco/mathjax-support-for-mkdp'
Plug 'iamcco/markdown-preview.vim'
```

### Usage

**Command:**

```
    MarkdownPreview
    " Open preview window in markdown buffer

    MarkdownPreviewStop
    " Close the preview window and server

```
> When `MarkdownPreview` command can't open the preview window, you can use the
`MarkdownPreviewStop` command before using `MarkdownPreview` command.

**Default Setting:**

```
    let g:mkdp_path_to_chrome = ""
    " Path to the chrome or the command to open chrome (or other modern browsers).
    " If set, g:mkdp_browserfunc would be ignored.

    let g:mkdp_browserfunc = 'MKDP_browserfunc_default'
    " Callback Vim function to open browser, the only parameter is the url to open.

    let g:mkdp_auto_start = 0
    " Set to 1, Vim will open the preview window on entering the Markdown
    " buffer.

    let g:mkdp_auto_open = 0
    " Set to 1, Vim will automatically open the preview window when you edit a
    " Markdown file.

    let g:mkdp_auto_close = 1
    " Set to 1, Vim will automatically close the current preview window when
    " switching from one Markdown buffer to another.

    let g:mkdp_refresh_slow = 0
    " Set to 1, Vim will just refresh Markdown when saving the buffer or
    " leaving from insert mode. With default 0, it will automatically refresh
    " Markdown as you edit or move the cursor.

    let g:mkdp_command_for_global = 0
    " Set to 1, the MarkdownPreview command can be used for all files,
    " by default it can only be used in Markdown files.

    let g:mkdp_open_to_the_world = 0
    " Set to 1, the preview server will be available to others in your network.
    " By default, the server only listens on localhost (127.0.0.1).
```

**Key Mapping:**

By default this plugin has no mapping: if you want to have your own mappings,
you can map the keys to `<Plug>MarkdownPreview` for opening the Markdown preview window and
map keys to `<Plug>StopMarkdownPreview` for closing the preview window.

Examples for mapping the `F8` key to open Markdown preview window and `F9` key to
close preview window:

```
" for normal mode
nmap <silent> <F8> <Plug>MarkdownPreview
" for insert mode
imap <silent> <F8> <Plug>MarkdownPreview
" for normal mode
nmap <silent> <F9> <Plug>StopMarkdownPreview
" for insert mode
imap <silent> <F9> <Plug>StopMarkdownPreview
```

For **OS X** users, you can set the `g:mkdp_path_to_chrome` as below (if you use Chrome):

```
let g:mkdp_path_to_chrome = "open -a Google\\ Chrome"
" or
let g:mkdp_path_to_chrome = "/Applications/Google\\ Chrome.app/Contents/MacOS/Google\\ Chrome"
```
See [issue #1](https://github.com/iamcco/markdown-preview.vim/issues/1) for details.

### FAQ

Q: The Firefox preview window didn't close when leaving the Markdown file in Vim.

A: If you want the plugin to auto-close the preview window in Firefox, you have to do some configuration:

1. Open Firefox.
2. Type `about:config` in the address bar and press the `Enter` key.
3. Search for `dom.allow_scripts_to_close_windows` and set its value to `true`.

> You have to know what will happen when you make the above changes.

### Changelog

* 2017/07/16: Add `g:mkdp_open_to_the_world` option.
* 2016/11/19: MathJax support with [mathjax-support-for-mkdp](https://github.com/iamcco/mathjax-support-for-mkdp) plugin.
* 2016/08/28: Set the title of preview page with filename.
* 2016/05/18: Support key mapping and new `g:mkdp_command_for_global` option item.
* 2016/03/12: New Github-like Markdown styles [markdown.css](https://github.com/iamcco/markdown.css) and support task list.
* 2016/01/24: Support to display the local picture in Markdown.

### Buy Me A Coffee ☕️

![image](https://user-images.githubusercontent.com/5492542/42771079-962216b0-8958-11e8-81c0-520363ce1059.png)
