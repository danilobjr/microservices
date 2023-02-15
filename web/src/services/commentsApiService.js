const baseUrl = (postId) => `http://localhost:9001/posts/${postId}/comments`

const create = (postId, comment) =>
  fetch(baseUrl(postId), {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ content: comment }),
  })

// const get = (postId) => fetch(baseUrl(postId))

export const commentApiService = {
  create,
  // get,
}
