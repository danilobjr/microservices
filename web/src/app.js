import { descend } from 'ramda'
import { PostCreate, Post } from './components'
import { useQueryPostsAndComments } from './hooks'
import { sortByProp } from './utils/functional-utils'

// components
const PostCreateContainer = (props) => (
  <div>
    <h4>Create Post</h4>
    <PostCreate {...props} />
  </div>
)

const PostListContainer = ({ posts }) => (
  <div
    className="mt-4"
    style={{
      display: 'flex',
      flexDirection: 'column',
      rowGap: '1rem',
    }}
  >
    <h4>Posts</h4>

    {posts?.map((p) => (
      <Post key={p.id} post={p} />
    ))}
  </div>
)

export const App = () => {
  const [posts, setPosts] = useQueryPostsAndComments()

  const sortedPosts = sortByProp('createdAt', descend)(posts)

  const handlePostCreation = (postCreated) =>
    setPosts((prevPosts) => [...prevPosts, postCreated])

  return (
    <div className="container">
      <PostCreateContainer onCreate={handlePostCreation} />
      <PostListContainer posts={sortedPosts} />
    </div>
  )
}
