// TODO remove
export const log = (label) => (x) => {
  console.log(label, x)
  return x
}

export const prettyStringify = (x) => JSON.stringify(x, null, 2)
