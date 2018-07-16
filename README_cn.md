## 说明

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
    let g:mkdp_path_to_chrome = ""
    " 设置 chrome 浏览器的路径（或是启动 chrome（或其他现代浏览器）的命令）
    " 如果设置了该参数, g:mkdp_browserfunc 将被忽略

    let g:mkdp_browserfunc = 'MKDP_browserfunc_default'
    " vim 回调函数, 参数为要打开的 url

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

    let g:mkdp_open_to_the_world = 0
    " 设置为 1, 在使用的网络中的其他计算机也能访问预览页面
    " 默认只监听本地（127.0.0.1），其他计算机不能访问
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

* 2017/07/16: 增加 `g:mkdp_open_to_the_world` 选项
* 2016/11/19: 通过辅助插件 [mathjax-support-for-mkdp](https://github.com/iamcco/mathjax-support-for-mkdp) 支持数学公式显示
* 2016/05/18: 设置预览页面的标题为文件的名字
* 2016/05/18: 支持按键绑定，并增加新的 `g:mkdp_command_for_global` 配置项
* 2016/03/12: 使用新的 Github 样式 [markdown.css](https://github.com/iamcco/markdown.css)，并且支持显示 todo 任务列表
* 2016/01/24: 支持显示本地图片

[vim-plug]: https://github.com/junegunn/vim-plug

### Buy Me A Coffee ☕️

![image](https://user-images.githubusercontent.com/5492542/42771079-962216b0-8958-11e8-81c0-520363ce1059.png)
