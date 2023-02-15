const baseUrl = 'http://localhost:9000/posts'

const create = async (title) => {
  const opts = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ title }),
  }

  return await fetch(baseUrl, opts)
}

// const get = async () => await fetch(baseUrl)

export const postApiService = {
  create,
  // get,
}
