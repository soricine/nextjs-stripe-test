export const delay = async (timeoutMilliseconds: number): Promise<void> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(null)
    }, timeoutMilliseconds)
  })
}
