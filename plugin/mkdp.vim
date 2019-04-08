"===============================================================================
"File: plugin/mkdp.vim
"Description: markdown preview
"Last Change: 2015-09-20
"Maintainer: iamcco <ooiss@qq.com>
"Github: http://github.com/iamcco <年糕小豆汤>
"Licence: Vim Licence
"Version: 0.0.1
"===============================================================================

if !exists('g:debug_mkdp') && exists('g:loaded_mkdp')
    finish
endif
let g:loaded_mkdp = 1

let s:save_cpo = &cpo
set cpo&vim
"-------------------------------------------------------------------------------

"default setting

if !exists('g:mkdp_path_to_chrome')
    let g:mkdp_path_to_chrome = '' " 'google-chrome'
endif

if !exists('g:mkdp_auto_start')
    let g:mkdp_auto_start = 0
endif

if !exists('g:mkdp_auto_open')
    let g:mkdp_auto_open = 0
endif

if !exists('g:mkdp_auto_close')
    let g:mkdp_auto_close = 1
endif

if !exists('g:mkdp_refresh_slow')
    let g:mkdp_refresh_slow = 0
endif

if !exists('g:mkdp_command_for_global')
    let g:mkdp_command_for_global = 0
endif

function s:start_cmd(timer) abort
  if exists('*jobstart')
    call jobstart(s:start_cmd_value)
  elseif exists('*job_start')
    call job_start(s:start_cmd_value)
  endif
endfunction

function! MKDP_browserfunc_default(url)
    " windows, including mingw
    if has('win32') || has('win64') || has('win32unix')
        let s:start_cmd_value = 'cmd /c start ' . a:url . '.html'
    " mac os
    elseif has('mac') || has('macunix') || has('gui_macvim') || system('uname') =~? '^darwin'
        if has('nvim')
              let s:start_cmd_value = 'open "' . a:url . '"'
           else
              let s:start_cmd_value = 'open ' . a:url . ''
        endif
    " linux
    elseif executable('xdg-open')
       if has('nvim')
            let s:start_cmd_value = 'xdg-open "' . a:url . '"'
         else
            let s:start_cmd_value = 'xdg-open ' . a:url . ''
       endif
    " can not find the browser
    else
        echoerr "Browser not found."
        return
    endif

    " Async open the url in browser
    if exists('*timer_start') && (exists('*jobstart') || exists('*job_start'))
        call timer_start(get(g:, 'mkdp_delay_start_browser', 200), function('s:start_cmd'))
    else
    " if async is not supported, use `system` command
        call system(s:start_cmd_value)
    endif
endfunction
if !exists('g:mkdp_browserfunc')
    let g:mkdp_browserfunc='MKDP_browserfunc_default'
endif

let g:mkdp_server_started = 0

fu! s:serverStart() abort

    if !g:mkdp_server_started
        let g:mkdp_server_started = 1
        call mkdp#serverStart()
        call mkdp#browserStart()
        call mkdp#autoCmd()
        command! MarkdownPreviewStop call s:serverClose()
    else
        if !has_key(g:mkdp_bufs, bufnr('%'))
            call mkdp#browserStart()
            call mkdp#autoCmd()
        else
            call mkdp#browserStart()
        endif
    endif

endfu

fun! s:serverClose() abort

    "1. stop the server
    "2. remove all the autocmd action
    "3. init the variables to the default
    "4. remove the command

    call mkdp#serverClose()
    for bufnr in keys(g:mkdp_bufs)
        exec 'au! autocmd' . bufnr
    endfor
    let g:mkdp_server_started = 0
    let g:mkdp_bufs = {}
    if exists(':MarkdownPreviewStop')
        delcommand MarkdownPreviewStop
    endif
endfu

function s:auto_start_server() abort
  call s:serverStart()
  if exists('*timer_start')
    call timer_start(get(g:, 'mkdp_delay_auto_refresh', 1000), function('mkdp#markdownRefresh'))
  endif
endfunction

if g:mkdp_auto_start

    "if auto start, launch the server when enter the mkd buffer

    if g:mkdp_command_for_global
        au BufEnter * call s:auto_start_server()
    else
        au BufEnter *.{md,mkd,markdown,mdown,mkdn,mdwn} call s:auto_start_server()
    endif
endif

"define the command to start the server when enter the mkd buffer

if g:mkdp_command_for_global
    au BufEnter * command! -buffer MarkdownPreview call s:serverStart()
else
    au BufEnter *.{md,mkd,markdown,mdown,mkdn,mdwn} command! -buffer MarkdownPreview call s:serverStart()
endif

" mapping for user
map <silent> <Plug>MarkdownPreview :call <SID>serverStart()<CR>
imap <silent> <Plug>MarkdownPreview <Esc>:call <SID>serverStart()<CR>a
map <silent> <Plug>StopMarkdownPreview :if exists(':MarkdownPreviewStop') \| exec 'MarkdownPreviewStop ' \| endif<CR>
imap <silent> <Plug>StopMarkdownPreview <Esc>:if exists(':MarkdownPreviewStop') \| exec 'MarkdownPreviewStop ' \| endif<CR>a

"-------------------------------------------------------------------------------
let &cpo = s:save_cpo
unlet s:save_cpo
