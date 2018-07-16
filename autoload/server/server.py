#!/bin/usr env python
# -*- coding: utf-8 -*-

import sys
import os
import traceback
import socket
import base64
import hashlib
import struct
from select import select

MIME_TYPE       = {
    u'html': u'text/html',
    u'css' : u'text/css',
    u'js'  : u'application/javascript',
    u'ico' : u'image/x-icon',
    u'jpg' : u'image/jpg',
    u'jpeg' : u'image/jpg',
    u'png' : u'image/png',
    u'gif' : u'image/gif',
    u'bmp' : u'image/bmp',
    u'all' : u'text/plain',
    u'eot' : u'application/font-eot',
    u'otf' : u'application/font-otf',
    u'woff' : u'application/font-woff'
}
SOCKET_HEADER   = u'HTTP/1.1 101 Switching Protocols\r\n'\
                  u'Upgrade: websocket\r\n'\
                  u'Connection: Upgrade\r\n'\
                  u'Sec-WebSocket-Accept: %s\r\n\r\n'
OK_HEADER       = u'HTTP/1.1 200 OK\r\n\r\n'
MD_HEADER       = u'HTTP/1.1 200 OK\r\n'\
                  u'Content-Length: %s\r\n'\
                  u'Content-Type: %s\r\n\r\n'
NO_FOUND_HEADER = u'HTTP/1.1 406 Not Acceptable\r\n\r\n'
NEW_LINE        = u'\r\n'
BLANK_LINE      = u'\r\n\r\n'
ENCODING        = u'utf-8'
RECV_BUF        = 81920

port            = 8686
sockets         = {}
socketList      = set();

tempData = {}

def wLog():
    if not os.path.exists('./log'):
        os.mkdir('./log')
    log = open(u'./log/log.txt', u'w')
    traceback.print_exc(file=log)
    log.flush()
    log.close()

def dealConnectLog(f):
    def _dealConnect(conn):
        try:
            ret = f(conn)
            return ret
        except SystemExit as e:
            exit(0)
        except:
            wLog()
    return _dealConnect

def dealLog(f):
    def _dealLog(*args, **kwargs):
        try:
            ret = f(*args, **kwargs)
            return ret
        except SystemExit as e:
            exit(0)
        except:
            wLog()
    return _dealLog

class Util():

    @staticmethod
    @dealConnectLog
    def dealConnect(conn):
        data = conn.recv(RECV_BUF).decode(ENCODING).split(BLANK_LINE)
        headers = data[0]
        body = BLANK_LINE.join(data[1:])
        hItmes = headers.split(NEW_LINE)
        reqMethod, path, protcl = hItmes[0].split(u' ')

        if reqMethod    == u'GET':
            Util.doGet(conn, hItmes, path)
        elif reqMethod  == u'POST':
            Util.doPost(conn)
        elif reqMethod  == u'PUT':
            Util.doPut(conn, hItmes, body, path)
        elif reqMethod  == u'DELETE':
            Util.doDelete(conn, path)
        else:
            conn.send(OK_HEADER.encode(ENCODING))
            conn.close()

    @staticmethod
    @dealLog
    def dealSocket(sock):
        data = WebSocket.recv(sock)
        if data == '\x03\xe9' or data == False:
            socketList.remove(sock)
            templist = []
            for item in sockets:
                for idx,socket in enumerate(sockets[item]):
                    if socket == sock:
                        templist.append(socket)
                    break
                if len(templist) > 0:
                    for i in templist:
                        sockets[item].remove(i)
                    templist = []
                    break;

    @staticmethod
    def doGet(conn, hItmes, path):
        paths = path.split(u'/')
        if paths[1] == u'WebSocket':        #shakehand of websocket
            for header in hItmes[1:]:
                key, val = header.split(u': ')
                if key == u'Sec-WebSocket-Key':
                    bufnr = paths[2]
                    if bufnr not in sockets:
                        sockets[bufnr] = []
                    sockets[bufnr].append(conn)
                    socketList.add(conn)
                    conn.send((SOCKET_HEADER % Util.getKey(val)).encode(ENCODING))      #complete the shakehand
                    # send temp data
                    if bufnr in tempData:
                        WebSocket.send(conn, tempData[bufnr])
                    break
        elif paths[1] == u'markdown':       #get markdown preview page
            f = open(u'./static/htmls/index.html', u'r')
            md = f.read()
            if str(type(md)) == "<class 'str'>":        #Compatible with python3
                md = md.encode(ENCODING)
            f.close()
            conn.send((MD_HEADER % (len(md), MIME_TYPE[u'html'])).encode(ENCODING) + md)
            conn.close()
        elif paths[1] == u'static':         #get static file
            p = u'./' + u'/'.join(paths[1:])
            if os.path.exists(p):
                ps = p.split(u'.')
                if len(ps) >= 3:
                    mimeType = ps[len(ps)-1].lower()
                else:
                    mimeType = u''
                f = open(p, u'r')
                s = f.read()
                f.close()
                if str(type(s)) == "<class 'str'>":        #Compatible with python3
                    s = s.encode(ENCODING)
                conn.send((MD_HEADER % (len(s), MIME_TYPE[mimeType])).encode(ENCODING) + s)
                conn.close()
            else:
                conn.send(OK_HEADER.encode(ENCODING))
                conn.close()
        elif paths[1].startswith(u'DIYURL'):
            p = base64.b64decode(path.split(u'?')[1].split('&')[0].encode(ENCODING)).decode(ENCODING)
            if os.path.exists(p):
                mimeType = u'';
                ps = p.split(u'.')
                if len(ps) >= 2:
                    mimeType = ps[len(ps)-1].lower()
                if mimeType not in MIME_TYPE:
                    mimeType = u'all'
                f = open(p, u'rb')
                s = f.read()
                f.close()
                conn.send((MD_HEADER % (len(s), MIME_TYPE[mimeType])).encode(ENCODING) + s)
                conn.close()
            else:
                conn.send(NO_FOUND_HEADER.encode(ENCODING))
                conn.close()
        else:
            conn.send(OK_HEADER.encode(ENCODING))
            conn.close()

    @staticmethod
    def doPost(conn):       #close the server
        conn.send(OK_HEADER.encode(ENCODING))
        conn.close()
        exit(0)

    @staticmethod
    def doPut(conn, hItmes, body, path):        #refresh the markdown preview page
        for header in hItmes[1:]:
            key, val = header.split(u': ')
            if key == u'Content-Length':
                body = Util.getData(conn, body, int(val))
                bufnr = path[1:]
                if bufnr in sockets and len(sockets[bufnr]) > 0:
                    conn.send(OK_HEADER.encode(ENCODING))
                    conn.close()
                    tempData[bufnr] = body
                    for socket in sockets[bufnr]:
                        WebSocket.send(socket, body)
                else:
                    conn.send(OK_HEADER.encode(ENCODING))
                    conn.close()
                break

    @staticmethod
    def doDelete(conn, path):       #close the markdown preview page
        conn.send(OK_HEADER.encode(ENCODING))
        conn.close()
        bufnr = path[1:]
        if bufnr in sockets:
            for socket in sockets[bufnr]:
                socket.close()
                socketList.remove(socket)
            sockets[bufnr] = []
            if bufnr in tempData:
                del tempData[bufnr]

    @staticmethod
    def getKey(key):
        return base64.b64encode(hashlib\
                     .sha1((key + u'258EAFA5-E914-47DA-95CA-C5AB0DC85B11')\
                     .encode(ENCODING))\
                     .digest())\
                     .decode(ENCODING)

    @staticmethod
    def getData(conn, body, length):
        allData = body.encode(ENCODING)
        while True:
            if len(allData) == length:
                break
            allData += conn.recv(RECV_BUF)
        return allData.decode(ENCODING)


class WebSocket():

    @staticmethod
    def recv(conn, size=8192):
        data = conn.recv(size)
        if not len(data):
            return False
        length = ord(data[1]) & 127
        if length == 126:
            mask = data[4:8]
            plData = data[8:]
        elif length == 127:
            mask = data[10:14]
            plData = data[14:]
        else:
            mask = data[2:6]
            plData = data[6:]
        resc = b''
        for itn, d in enumerate(plData):
            resc += chr(ord(d) ^ ord(mask[itn % 4]))
        return resc

    @staticmethod
    def send(conn, data):
        data = data.encode(ENCODING)
        # \x81 is the first byte 10000001
        protclHead = b'\x81'
        if len(data) < 126:
            protclHead += struct.pack('B', len(data))
        elif len(data) <= 0xFFFF:
            protclHead += struct.pack('!BH', 126, len(data))
        else:
            protclHead += struct.pack('!BQ', 127, len(data))
        conn.send(protclHead+data)


@dealLog
def main():
    server = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    try:
        server.bind((host, port))
        server.listen(100)
    except Exception as e:
        exit(0)
    socketList.add(server)
    while True:
        r, w, e = select(socketList, [], [])
        for sock in r:
            if sock == server:
                conn, addr = sock.accept()
                Util.dealConnect(conn)
            else:
                Util.dealSocket(sock)

if __name__ == u'__main__':

    # get the port if have
    if len(sys.argv) >= 2:
        port = int(sys.argv[1])

    if len(sys.argv) >= 3:
        host = sys.argv[2]
    else:
        host = u'127.0.0.1'

    # change the work directory to the server.py
    cwd = os.path.split(os.path.realpath(__file__))[0]
    os.chdir(cwd)

    # server start
    main()
