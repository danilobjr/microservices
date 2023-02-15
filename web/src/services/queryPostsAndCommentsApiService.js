const baseUrl = 'http://localhost:9002'

const get = async () => await fetch(baseUrl)

export const queryPostsAndCommentsApiService = {
  get,
}
