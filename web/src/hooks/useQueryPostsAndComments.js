import { queryPostsAndCommentsApiService } from '../services'

export const useQueryPostsAndComments = () => {
  const [posts, setPosts] = useState([])

  useEffect(() => {
    queryPostsAndCommentsApiService
      .get()
      .then((resp) => resp.json())
      .then(setPosts)
  }, [])

  return [posts, setPosts]
}
