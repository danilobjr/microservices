import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import fetch from 'node-fetch'
import crypto from 'crypto'
import morgan from 'morgan'

const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use(morgan('dev'))

const putNewCommentInFirstPosition = (newComment, comments) => [
  newComment,
  ...comments,
]

let commentsData = []

const eventType = {
  created: 'CommentCreated',
}

const emitEvent = (data) => {
  return fetch('http://localhost:9999/events', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      type: eventType.created,
      data,
    }),
  })
}

app.post('/posts/:id/comments', async (req, res) => {
  try {
    const postId = req.params?.id
    const { content } = req.body

    const newComment = {
      id: crypto.randomBytes(4).toString('hex'),
      content,
      createdAt: Date.now(),
      postId,
    }

    const tempComments = putNewCommentInFirstPosition(newComment, commentsData)
    console.log(JSON.stringify(tempComments, null, 2))
    commentsData = tempComments

    await emitEvent(newComment)

    res.status(201).json(newComment)
  } catch (error) {
    console.error(error)
    res.status(500).json(error)
  }
})

// app.post('/events', (req, _) => {
//   const event = req.body
//
//   // TODO put these event type strings in a common file
//   if (event.type === 'CommentCreated') {
//     console.log('Comments Server', event)
//   }
// })

const port = 9002
app.listen(port, () => console.log(`Server listening on port ${port}`))
