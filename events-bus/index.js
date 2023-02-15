import express from 'express'
import bodyParser from 'body-parser'
import fetch from 'node-fetch'
import morgan from 'morgan'

const app = express()

app.use(bodyParser.json())
app.use(morgan('dev'))

const servers = {
  posts: 'http://localhost:9001',
  comments: 'http://localhost:9002',
  query: 'http://localhost:9003',
}

const log = (x, label) => {
  console.log(label, JSON.stringify(x, null, 2))
}

app.post('/events', (req, res) => {
  const event = req.body

  log('Emit Event', event)

  const opts = {
    method: 'post',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(event),
  }

  fetch(`${servers.posts}/events`, opts).catch(console.error)
  fetch(`${servers.comments}/events`, opts).catch(console.error)
  fetch(`${servers.query}/events`, opts).catch(console.error)

  res.send({ status: 'OK' })
})

const port = 9999
app.listen(port, () => console.log(`Server listening on port ${port}`))
