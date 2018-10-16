
" echo message
function! mkdp#util#echo_messages(hl, msgs)
  if empty(a:msgs) | return | endif
  execute 'echohl '.a:hl
  if type(a:msgs) ==# 1
    echomsg a:msgs
  else
    for msg in a:msgs
      echom msg
    endfor
  endif
  echohl None
endfunction

" try open preview page
function! s:try_open_preview_page(timer_id) abort
  let l:server_status = mkdp#rpc#get_server_status()
  if l:server_status !=# 1
    let s:try_id = ''
    call mkdp#rpc#stop_server()
    call mkdp#rpc#start_server()
  endif
endfunction

" open preview page
function! mkdp#util#open_preview_page() abort
  if get(s:, 'try_id', '') !=# ''
    return
  endif
  let l:server_status = mkdp#rpc#get_server_status()
  if l:server_status ==# -1
    call mkdp#rpc#start_server()
  elseif l:server_status ==# 0
    let s:try_count = 0
    let s:try_id = timer_start(1000, s:try_open_preview_page)
  else
    call mkdp#util#open_browser()
  endif
endfunction

" open browser
function! mkdp#util#open_browser() abort
  call system('open -a Google\ Chrome "http://localhost:8081/page/' . bufnr('.') . '"')
  call mkdp#autocmd#init()
endfunction
