import React from 'react'
import Head from 'next/head'
import io from 'socket.io-client'

export default class PreviewPage extends React.Component {
  constructor (props) {
    super(props)

    this.state = {
      content: ''
    }
  }

  componentDidMount () {
    const socket = io({
      query: {
        bufnr: window.location.pathname.split('/')[2]
      }
    })

    window.socket = socket

    socket.on('refresh_content', ({ cursor, content }) => {
      console.log('refresh: ', cursor, content)
    })

    socket.on('connect', (data) => {
      console.log('connect: ', data)
    })

    socket.on('disconnect', () => {
      console.log('disconnect: ', socket.id)
    })

    socket.on('close', () => {
      window.close()
    })
  }

  render () {
    const { content } = this.state
    return (
      <React.Fragment>
        <Head>
          <title>preview page</title>
        </Head>
        <div>
          {content}
        </div>
      </React.Fragment>
    )
  }
}

