let s:mkdp_root_dir = expand('<sfile>:h:h:h')
let s:mkdp_server_script = s:mkdp_root_dir . '/app/server.js'
let s:mkdp_opts = {}
let s:mkdp_channel_id = -1

function! s:mkdp_opts.on_stdout(chan_id, msgs, event) dict
  call mkdp#util#echo_messages('Error', [
        \ 'stdout ==>',
        \ 'channelId: ' . a:chan_id,
        \ 'event: ' . a:event,
        \ ] + a:msgs)
endfunction
function! s:mkdp_opts.on_stderr(chan_id, msgs, event) dict
  call mkdp#util#echo_messages('Error', [
        \ 'stderr ==>',
        \ 'channelId: ' . a:chan_id,
        \ 'event: ' . a:event,
        \ ] + a:msgs)
endfunction
function! s:mkdp_opts.on_exit(chan_id, code, event) dict
  echomsg 'exit ' . a:chan_id . ': ' . a:code . ' => ' . a:event
  call mkdp#util#echo_messages('Error',
        \ 'channelId:' . a:chan_id . ' code: ' . a:code . ' event: ' . a:event)
endfunction

function! mkdp#rpc#start_server() abort
  let s:mkdp_channel_id = jobstart(['node', s:mkdp_server_script], s:mkdp_opts)
endfunction
