"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const io = require('socket.io-client');
class Actions {
    constructor(nvim, socket) {
        this.nvim = nvim;
        this.socket = socket;
    }
    resolve(method) {
        if (this[method] && typeof this[method] === 'function') {
            this[method]();
        }
    }
    refreshContent() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (this.socket.connected) {
                try {
                    const buffer = yield this.nvim.buffer;
                    const bufnr = buffer.id;
                    const content = yield buffer.getLines();
                    this.socket.emit('server_refresh_content', {
                        bufnr,
                        content
                    });
                }
                catch (e) {
                    this.nvim.command(`echo "${e.message}"`);
                }
            }
            else {
                this.nvim.command('echo "disconnect"');
            }
        });
    }
}
function default_1(nvim, path) {
    return tslib_1.__awaiter(this, void 0, void 0, function* () {
        const socket = io(path);
        return new Promise((res, rej) => {
            socket.on('connect', () => {
                res();
            });
            socket.on('connect_timeout', err => {
                rej(err);
            });
        }).then(() => new Actions(nvim, socket));
    });
}
exports.default = default_1;
