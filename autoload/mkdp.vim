"===============================================================================
"File: autoload/mkdp.vim
"Description: markdown preview
"Last Change: 2016-02-05
"Maintainer: iamcco <ooiss@qq.com>
"Github: http://github.com/iamcco <年糕小豆汤>
"Licence: Vim Licence
"Version: 0.2.0
"===============================================================================

if !exists('g:mkdp_py_version')
    if has('python')
        let g:mkdp_py_version = 2
        let s:py_cmd = 'py '
    elseif has('python3')
        let g:mkdp_py_version = 3
        let s:py_cmd = 'py3 '
    else
        echoerr '[Plugin: markdown-preview]: requires vim has python/python3 features'
        finish
    endif
else
    if g:mkdp_py_version == 2
        let s:py_cmd = 'py '
    else
        let s:py_cmd = 'py3 '
    endif
endif

function! s:mkdp_is_windows() abort
    return  (has('win16') || has('win32') || has('win64'))
endfunction

let g:mkdp_port = 8686
let g:mkdp_prefix = localtime()
let g:mkdp_bufs = {}
let s:path_to_server = expand('<sfile>:p:h') . "/server/server.py"
let g:mkdp_cwd = ''

"python/python3 import init
exec s:py_cmd . 'import vim'
exec s:py_cmd . 'import sys'
exec s:py_cmd . 'cwd = vim.eval("expand(\"<sfile>:p:h\")")'
exec s:py_cmd . 'sys.path.insert(0,cwd)'
exec s:py_cmd . 'from server import send'
exec s:py_cmd . 'import base64'

fun! mkdp#browserStart() abort "open browser and save the buffer number
    if !has_key(g:mkdp_bufs, bufnr('%'))
        call s:browserStart()
        let g:mkdp_bufs[bufnr('%')] = 1
    endif
endfu

fun! mkdp#browserClose() abort "remove the buffer number and send close message to the browser
    if has_key(g:mkdp_bufs, bufnr('%'))
        call remove(g:mkdp_bufs, bufnr('%'))
        try
            call s:browserClose()
        catch /.*/
        endtry
    endif
endfun

fun! mkdp#markdownRefresh() abort  "refresh the markdown preview
    if has_key(g:mkdp_bufs, bufnr('%'))
        try
            call s:markdownRefresh()
        catch /.*/
            call mkdp#serverStart()
        endtry
    elseif g:mkdp_auto_open
        call mkdp#browserStart()
    endif
endfun

fun! mkdp#serverStart() abort "start server
    try
        call s:serverStart()
    catch /.*/
        echoerr 'server start failed'
    endtry
endfu

fun! mkdp#serverClose() abort "close server
    try
        call s:serverClose()
    catch /.*/
    endtry
endfu

fun! mkdp#autoCmd() abort
    call s:autocmd()
endfu

fun! s:serverStart() abort "function for starting the server
    let g:mkdp_port = g:mkdp_port + localtime()[7:10]
    if s:mkdp_is_windows()
        let l:cmd = "silent !start /b python " . '"' . s:path_to_server . '" ' . g:mkdp_port
        if exists('g:mkdp_open_to_the_world')
            let l:cmd = l:cmd . ' 0.0.0.0'
        endif
        exec l:cmd | redraw
    else
        let l:cmd = "python " . s:path_to_server . " " . g:mkdp_port
        if exists('g:mkdp_open_to_the_world')
            let l:cmd = l:cmd . ' 0.0.0.0'
        endif
        call system(l:cmd . " >/dev/null 2>&1 &") | redraw
    endif
endfun

fun! s:serverClose() abort "function for close the server
    exec s:py_cmd . "send.serverClose()"
endfu

fun! s:browserStart() abort "function for opening the browser
    let s:mathjax_vim_path = ''

    " whether mathjax support
    if exists('g:mathjax_vim_path')
        let s:mathjax_vim_path = g:mathjax_vim_path
    endif

    let g:mkdp_cwd = expand('%:p') . '&' . s:mathjax_vim_path

    " py2/py3 different resolve for str
    if g:mkdp_py_version == 2
        exec s:py_cmd . 'vim.command("let g:mkdp_cwd = \"" + base64.b64encode(vim.eval("g:mkdp_cwd")) + "\"")'
    elseif g:mkdp_py_version == 3
        exec s:py_cmd . 'vim.command("let g:mkdp_cwd = \"" + base64.b64encode(vim.eval("g:mkdp_cwd").encode("utf-8")).decode("utf-8") + "\"")'
    endif

    if exists('g:mkdp_path_to_chrome') && len(g:mkdp_path_to_chrome) > 0
        if s:mkdp_is_windows()
            exec "silent !start " . g:mkdp_path_to_chrome . " http://127.0.0.1:" . g:mkdp_port . "/markdown/" . g:mkdp_prefix . bufnr('%') . '?' . g:mkdp_cwd
        else
            call system(g:mkdp_path_to_chrome . " \"http://127.0.0.1:" . g:mkdp_port . "/markdown/" . g:mkdp_prefix . bufnr('%') . '?' . g:mkdp_cwd . "\" >/dev/null 2>&1 &")
        endif
    elseif exists('g:mkdp_browserfunc') && len(g:mkdp_browserfunc) > 0
        execute 'call ' . g:mkdp_browserfunc . '("' . "http://127.0.0.1:" . g:mkdp_port . "/markdown/" . g:mkdp_prefix . bufnr('%') . '?' . g:mkdp_cwd . '")'
    else
        echoerr '[Plugin: markdown-preview]: g:mkdp_path_to_chrome or g:mkdp_browserfunc not set'
    endif
endfun

fun! s:browserClose() abort "function for closing the browser
    exec s:py_cmd . "send.markdownClose()"
endfu

fun! s:markdownRefresh() abort "function for refresh the markdown
    exec s:py_cmd . "send.markdownRefresh()"
endfun

fu! s:autocmd() abort

    "echo buffer has is own autocmd auto group

    exec 'aug autocmd' . bufnr('%')
        setl updatetime=1000
        au!
        if g:mkdp_auto_close
            au BufLeave <buffer> call mkdp#browserClose()
        endif
        au VimLeave * call mkdp#serverClose()
        if g:mkdp_refresh_slow
          au CursorHold,BufWrite,InsertLeave <buffer> call mkdp#markdownRefresh()
        else
          au CursorHold,CursorHoldI,CursorMoved,CursorMovedI <buffer> call mkdp#markdownRefresh()
        endif
    aug END
endfu
