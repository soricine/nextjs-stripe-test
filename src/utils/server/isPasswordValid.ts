import bcrypt from 'bcrypt'

export interface Props {
  password: string
  salt: string
  hashedPassword: string
}

export const isPasswordValid = async ({
  password,
  salt,
  hashedPassword,
}: Props): Promise<boolean> => {
  const saltedPassword = `${password}:${salt}`
  return new Promise((resolve, reject) => {
    bcrypt.compare(saltedPassword, hashedPassword, function (err, isValid) {
      if (err) reject(err)
      resolve(isValid)
    })
  })
}
