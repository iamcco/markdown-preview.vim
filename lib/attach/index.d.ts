import { NeovimClient } from 'neovim';
import { Attach } from 'neovim/lib/attach/attach';
interface IApp {
    refreshPage: ((param: {
        bufnr: number | string;
        data: any;
    }) => void);
}
interface IPlugin {
    init: ((app: IApp) => void);
    nvim: NeovimClient;
}
export default function (options: Attach): IPlugin;
export {};
