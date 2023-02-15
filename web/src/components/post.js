import { useEffect, useState } from 'react'
import { pipe } from 'ramda'
import { commentApiService } from '../services'
import { getInputValue } from '../utils/react-utils'

const useComments = (postId) => {
  const [comments, setComments] = useState([])

  useEffect(() => {
    commentApiService
      .get(postId)
      .then((response) => response.json())
      .then(setComments)
  }, [])

  const mutate = ({postId, commentText}) => {
    const response = await commentApiService.create(post.id, commentText)
    return await response.json()
  }

  return {
    comments,
    setComments,
    mutate,
  }
}

export const Post = ({ post }) => {
  const [commentText, setCommentText] = useState('')
  const [comments, setComments] = useState([])

  const clearInput = () => setCommentText(() => '')

  const handleChange = pipe(getInputValue, setCommentText)

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!commentText) {
      return
    }

    try {
      const response = await commentApiService.create(post.id, commentText)
      const newComment = await response.json()

      setComments((prevComments) => [newComment, ...prevComments])
      clearInput()
    } catch (e) {
      console.error(e)
    }
  }

  return (
    <div key={post.id} className="card">
      <div className="card-body">
        <h5 className="card-title">{post.title}</h5>
        <h6 className="card-subtitle mb-2 text-muted">
          {comments?.length} comments
        </h6>

        <ul>
          {comments?.map((c) => (
            <li key={c.id} className="card-text">
              {c.content}
            </li>
          ))}
        </ul>

        <form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <div className="mb-3">
            <input
              className="form-control"
              id="comment"
              placeholder="Type a comment"
              value={commentText}
              onChange={handleChange}
            />
          </div>

          <button className="btn btn-primary">Create</button>
        </form>
      </div>
    </div>
  )
}
