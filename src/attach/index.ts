import { attach, NeovimClient } from 'neovim'
import { Attach } from 'neovim/lib/attach/attach'

const logger = require('../util/logger')('attach') // tslint:disable-line

interface IApp {
  refreshPage: ((
    param: {
      bufnr: number | string
      data: any
    }
  ) => void)
}

interface IPlugin {
  init: ((app: IApp) => void)
  nvim: NeovimClient
}

let app: IApp

export default function(options: Attach): IPlugin {
  const nvim: NeovimClient = attach(options)

  nvim.on('notification', async (method: string) => {
    if (method === 'refresh_content') {
      const buffer = await nvim.buffer
      const bufnr = buffer.id
      const cursor = await nvim.call('getpos', '.')
      const content = await buffer.getLines()
      app.refreshPage({
        bufnr,
        data: {
          cursor,
          content
        }
      })
    }
  })

  nvim.channelId
    .then(async channelId => {
      await nvim.setVar('mkdp_node_channel_id', channelId)
    })
    .catch(e => {
      logger.error(e)
    })

  return {
    nvim,
    init: (param: IApp) => {
      app = param
    }
  }
}

