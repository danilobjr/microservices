import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import crypto from 'crypto'
import fetch from 'node-fetch'
import morgan from 'morgan'

const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use(morgan('dev'))

const postsData = {}

const eventType = {
  created: 'PostCreated',
}

const emitEvent = (post) => {
  return fetch('http://localhost:9999/events', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      type: eventType.created,
      data: post,
    }),
  })
}

app.post('/posts', async (req, res) => {
  try {
    const body = req.body

    const id = crypto.randomBytes(4).toString('hex')
    const post = {
      id,
      ...body,
      createdAt: Date.now(),
    }

    postsData[id] = post

    await emitEvent(post)

    res.status(201).json(post)
  } catch (error) {
    console.error(error)
    res.status(500).json(error)
  }
})

const port = 9001
app.listen(port, () => console.log(`Server listening on port ${port}`))
