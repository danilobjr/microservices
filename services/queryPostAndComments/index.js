import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import morgan from 'morgan'
import { eventTypes } from './eventTypes'

const app = express()

app.use(cors())
app.use(bodyParser.json())
app.use(morgan('dev'))

let postsAndCommentsData = {}

app.post('/events', (req, res) => {
  const event = req.body

  if (event.type === eventTypes.post.created) {
    const newPost = event?.data

    postsAndCommentsData[newPost?.id] = newPost
  }

  if (event.type === eventTypes.comment.created) {
    const newComment = event?.data
    const postId = newComment?.postId
    const post = postsAndCommentsData[postId]
    const existingComments = post?.comments ?? []

    post.comments = [newComment, ...existingComments]
  }

  res.status('OK')
})

app.get('/', (_, res) => {
  res.status(200).json(Object.values(postsAndCommentsData))
})

const port = 9003
app.listen(port, () => console.log(`Server listening on port ${port}`))
