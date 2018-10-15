import { NeovimClient } from 'neovim';
declare class Actions {
    nvim: NeovimClient;
    private socket;
    constructor(nvim: NeovimClient, socket: any);
    resolve(method: string): void;
    refreshContent(): Promise<void>;
}
export default function (nvim: NeovimClient, path: string): Promise<Actions>;
export {};
