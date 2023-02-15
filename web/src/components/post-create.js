import { useState } from 'react'
import { getInputValue } from '../utils/react-utils'
import { postApiService } from '../services'

export const PostCreate = ({ onCreate = () => {} }) => {
  const [title, setTitle] = useState('')

  const clearInput = () => setTitle(() => '')

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!title) {
      return
    }

    try {
      const response = await postApiService.create(title)
      const postCreated = await response.json()

      const newPost = {
        ...postCreated,
        comments: [],
      }

      onCreate(newPost)

      clearInput()
    } catch (error) {
      console.error(error)
      return
    }
  }

  const handleChange = (e) => setTitle(getInputValue(e))

  return (
    <form noValidate onSubmit={handleSubmit}>
      <div className="mb-3">
        <label className="form-label" htmlFor="title">
          Title
        </label>
        <input
          className="form-control"
          id="title"
          type="text"
          value={title}
          onChange={handleChange}
        />
      </div>

      <button className="btn btn-primary">Create</button>
    </form>
  )
}
