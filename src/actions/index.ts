import { NeovimClient } from 'neovim'
const io = require('socket.io-client')

class Actions {
  constructor(public nvim: NeovimClient, private socket: any) {}

  public resolve(method: string) {
    if (this[method] && typeof this[method] === 'function') {
      this[method]()
    }
  }

  public async refreshContent() {
    if (this.socket.connected) {
      try {
        const buffer = await this.nvim.buffer
        const bufnr = buffer.id
        const content = await buffer.getLines()
        this.socket.emit('server_refresh_content', {
          bufnr,
          content
        })
      } catch (e) {
        this.nvim.command(`echo "${e.message}"`)
      }
    } else {
      this.nvim.command('echo "disconnect"')
    }
  }
}

export default async function(
  nvim: NeovimClient,
  path: string
): Promise<Actions> {
  const socket = io(path)
  return new Promise((res, rej) => {
    socket.on('connect', () => {
      res()
    })
    socket.on('connect_timeout', err => {
      rej(err)
    })
  }).then(() => new Actions(nvim, socket))
}

