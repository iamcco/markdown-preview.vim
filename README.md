## Introduction

[![Join the chat at https://gitter.im/iamcco/markdown-preview.vim](https://badges.gitter.im/Join%20Chat.svg)](https://gitter.im/iamcco/markdown-preview.vim?utm_source=badge&utm_medium=badge&utm_campaign=pr-badge&utm_content=badge)

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
    let g:mkdp_path_to_chrome = "google-chrome"
    " path to the chrome or the command to open chrome(or other modern browsers)

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

* 2016/11/19: MathJax support with [mathjax-support-for-mkdp](https://github.com/iamcco/mathjax-support-for-mkdp) plugin
* 2016/08/28: set the title of preview page with file name
* 2016/05/18: support key mapping and new `g:mkdp_command_for_global` option item
* 2016/03/12: new Github like markdown styles [markdown.css](https://github.com/iamcco/markdown.css) and support task list
* 2016/01/24: support display the local picture in markdown

--------------------------------------------------------------------------------

### 说明

使用 markdown-preview.vim 插件可以实时通过浏览器预览 markdown 文件

> 使用该插件需要 vim 支持py2/py3

### 安装

使用 [vim-plug][vim-plug]:

在 `.vimrc` 或 `init.vim` 配置文件中添加 `Plug 'iamcco/markdown-preview.vim'` 然后运行 `:PlugInstall` 命令

如果需要预览数学公式，还需要安装 `mathjax-support-for-mkdp` 插件：

```
Plug 'iamcco/mathjax-support-for-mkdp'
Plug 'iamcco/markdown-preview.vim'
```

### 使用和设置

**命令：**

```
    MarkdownPreview
    " 在打开 markdown 文件后，使用该命令可以打开预览窗口

    MarkdownPreviewStop
    " 关闭 markdown 预览窗口，并停止开启的服务进程

```
> 在 MarkdownPreview 命令无效的情况下，可以先 MarkdownPreviewStop 再 MarkdownPreview

**默认配置：**

```
    let g:mkdp_path_to_chrome = "google-chrome"
    " 设置 chrome 浏览器的路径（或是启动 chrome（或其他现代浏览器）的命令）

    let g:mkdp_auto_start = 0
    " 设置为 1 可以在打开 markdown 文件的时候自动打开浏览器预览，只在打开
    " markdown 文件的时候打开一次

    let g:mkdp_auto_open = 0
    " 设置为 1 在编辑 markdown 的时候检查预览窗口是否已经打开，否则自动打开预
    " 览窗口

    let g:mkdp_auto_close = 1
    " 在切换 buffer 的时候自动关闭预览窗口，设置为 0 则在切换 buffer 的时候不
    " 自动关闭预览窗口

    let g:mkdp_refresh_slow = 0
    " 设置为 1 则只有在保存文件，或退出插入模式的时候更新预览，默认为 0，实时
    " 更新预览

    let g:mkdp_command_for_global = 0
    " 设置为 1 则所有文件都可以使用 MarkdownPreview 进行预览，默认只有 markdown
    " 文件可以使用改命令
```

**键位绑定：**

默认情况下，插件没有进行任何的按键绑定，如果想绑定按键去预览 markdown 文件，可以绑定
按键到`<Plug>MarkdownPreview`来打开预览窗口，绑定按键到`<Plug>StopMarkdownPreview`来
关闭预览窗口。

按键绑定例子（`F8`打开预览窗口，`F9`关闭预览窗口）：

```
nmap <silent> <F8> <Plug>MarkdownPreview        " 普通模式
imap <silent> <F8> <Plug>MarkdownPreview        " 插入模式
nmap <silent> <F9> <Plug>StopMarkdownPreview    " 普通模式
imap <silent> <F9> <Plug>StopMarkdownPreview    " 插入模式
```

**苹果** 用户如果使用chrome可以参照以下设置 `g:mkdp_path_to_chrome`:

```
let g:mkdp_path_to_chrome = "open -a Google\\ Chrome"
" or
let g:mkdp_path_to_chrome = "/Applications/Google\\ Chrome.app/Contents/MacOS/Google\\ Chrome"
```
详细可以查看 issue[#1](https://github.com/iamcco/markdown-preview.vim/issues/1) 

### FAQ

Q: 在火狐浏览器中，预览页面不能自动关闭

A: 如果需要在火狐浏览器中启用自动关闭预览窗口，需要相关设置：

1. 打开火狐浏览器
2. 地址栏敲入 `about:config` 然后回车
3. 搜索 `dom.allow_scripts_to_close_windows` 选项，并设置 value 为 `true`

> 如果你打算设置上面的配置，你应该知道该配置会产生什么影响

### Changelog

* 2016/11/19: 通过辅助插件 [mathjax-support-for-mkdp](https://github.com/iamcco/mathjax-support-for-mkdp) 支持数学公式显示
* 2016/05/18: 设置预览页面的标题为文件的名字
* 2016/05/18: 支持按键绑定，并增加新的 `g:mkdp_command_for_global` 配置项
* 2016/03/12: 使用新的 Github 样式 [markdown.css](https://github.com/iamcco/markdown.css)，并且支持显示 todo 任务列表
* 2016/01/24: 支持显示本地图片

[vim-plug]: https://github.com/junegunn/vim-plug
