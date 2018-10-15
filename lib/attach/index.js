"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const neovim_1 = require("neovim");
const logger = require('../util/logger')('attach'); // tslint:disable-line
let app;
function default_1(options) {
    const nvim = neovim_1.attach(options);
    nvim.on('notification', (method) => tslib_1.__awaiter(this, void 0, void 0, function* () {
        if (method === 'refresh_content') {
            const buffer = yield nvim.buffer;
            const bufnr = buffer.id;
            const cursor = yield nvim.call('getpos', '.');
            const content = yield buffer.getLines();
            app.refreshPage({
                bufnr,
                data: {
                    cursor,
                    content
                }
            });
        }
    }));
    nvim.channelId
        .then((channelId) => tslib_1.__awaiter(this, void 0, void 0, function* () {
        yield nvim.setVar('mkdp_node_channel_id', channelId);
    }))
        .catch(e => {
        logger.error(e);
    });
    return {
        nvim,
        init: (param) => {
            app = param;
        }
    };
}
exports.default = default_1;
