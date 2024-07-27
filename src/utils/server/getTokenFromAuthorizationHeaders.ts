export const getTokenFromAuthorizationHeaders = (
  header: string
): string | undefined => {
  if (!header) {
    return undefined
  }
  if (!header.toLowerCase().startsWith('bearer ')) {
    return undefined
  }
  const headerParts = header.trim().split(' ')
  if (headerParts.length < 2) {
    return undefined
  }
  return headerParts[1]
}
