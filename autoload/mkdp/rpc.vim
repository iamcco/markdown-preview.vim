let s:mkdp_root_dir = expand('<sfile>:h:h:h')
let s:mkdp_server_script = s:mkdp_root_dir . '/app/server.js'
let s:mkdp_opts = {}
let s:mkdp_channel_id = -1

function! s:mkdp_opts.on_stdout(chan_id, msgs, event) dict
endfunction
function! s:mkdp_opts.on_stderr(chan_id, msgs, event) dict
endfunction
function! s:mkdp_opts.on_exit(chan_id, code, event) dict
endfunction

function! mkdp#rpc#start_server() abort
  let s:mkdp_channel_id = jobstart(['node', s:mkdp_server_script], s:mkdp_opts)
endfunction

function! mkdp#rpc#stop_server() abort
  if s:mkdp_channel_id !=# -1
    call rpcrequest(g:mkdp_node_channel_id, 'close_all_pages')
    call jobstop(s:mkdp_channel_id)
  endif
  let s:mkdp_channel_id = -1
  let g:mkdp_node_channel_id = -1
endfunction

function! mkdp#rpc#get_server_status() abort
  if s:mkdp_channel_id ==# -1
    return -1
  elseif !exists('g:mkdp_node_channel_id') || g:mkdp_node_channel_id ==# -1
    return 0
  endif
  return 1
endfunction

function! mkdp#rpc#preview_refresh() abort
  if exists('g:mkdp_node_channel_id') && g:mkdp_node_channel_id !=# -1
    call rpcnotify(g:mkdp_node_channel_id, 'refresh_content', { 'bufnr': bufnr('%') })
  endif
endfunction

function! mkdp#rpc#preview_close() abort
  if exists('g:mkdp_node_channel_id') && g:mkdp_node_channel_id !=# -1
    call rpcnotify(g:mkdp_node_channel_id, 'close_page', { 'bufnr': bufnr('%') })
  endif
endfunction

function! mkdp#rpc#open_browser() abort
  if exists('g:mkdp_node_channel_id') && g:mkdp_node_channel_id !=# -1
    call rpcnotify(g:mkdp_node_channel_id, 'open_browser', { 'bufnr': bufnr('%') })
  endif
endfunction

