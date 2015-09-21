#!/bin/usr env python
# -.- coding: utf-8 -.-

import vim
import re

PY_VERSOIN = vim.eval('g:mkdp_py_version')

if PY_VERSOIN == '2':
    import urllib2
else:
    from urllib import request as urllib2

URL        = 'http://127.0.0.1:%s/%s'
B          = re.compile(u'(?<=[a-zA-Z\d\u4e00-\u9fa5])\B(?=[a-zA-Z\d\u4e00-\u9fa5])')
tag        = re.compile(u'(<.+?>)')
flagSign   = u'019600976811CE18D7D4F7699D774DFF'
U_NEW_LINE = u'\n'
NEW_LINE   = '\n'
prefix     = vim.eval('g:mkdp_prefix')

def markdownRefresh():
    PORT = vim.eval('g:mkdp_port')
    curBuf = vim.current.buffer
    bufnr  = curBuf.number
    pbufnr = prefix + str(bufnr)
    lineNum = vim.current.window.cursor[0] - 1
    encoding = vim.eval('&encoding').upper()

    if PY_VERSOIN == '2':
        lines = NEW_LINE.join(curBuf).decode(encoding).split(U_NEW_LINE)
    else:
        lines = NEW_LINE.join(curBuf).split(U_NEW_LINE)

    curLine = lines[lineNum]
    if tag.search(curLine) != None:
        curLine = tag.sub(u'\\1 ' + flagSign, curLine, 1)
    else:
        curLine = B.sub(flagSign, curLine, 1)
    lines[lineNum] = curLine
    data = U_NEW_LINE.join(lines).encode('utf-8')
    req = urllib2.Request(URL % (PORT, pbufnr), data = data)
    req.get_method = lambda: "PUT"
    try:
        urllib2.urlopen(req)
    except urllib2.HTTPError as e:
        if e.code == 406:
            vim.command('call remove(g:mkdp_bufs, %s)' % bufnr)

def markdownClose():
    PORT = vim.eval('g:mkdp_port')
    curBuf = vim.current.buffer
    pbufnr  = prefix + str(curBuf.number)
    req = urllib2.Request(URL % (PORT, pbufnr))
    req.get_method = lambda: "DELETE"
    urllib2.urlopen(req)

def serverClose():
    PORT = vim.eval('g:mkdp_port')
    req = urllib2.Request(URL % (PORT, ''))
    req.get_method = lambda: "POST"
    urllib2.urlopen(req)

__all__ = ['markdownRefresh', 'markdownClose', 'serverClose']
