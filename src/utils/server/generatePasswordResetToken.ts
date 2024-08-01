export const generatePasswordResetToken = (): string => {
  const code = Math.floor(Math.random() * 1000000)
  return code.toString().padStart(6, '0')
}
