import bcrypt from 'bcrypt'

export interface Props {
  password: string
  salt: string
}

export const hashPassword = async ({
  password,
  salt,
}: Props): Promise<string> => {
  const saltRounds = 10
  const saltedPassword = `${password}:${salt}`
  return new Promise((resolve, reject) => {
    bcrypt.hash(saltedPassword, saltRounds, function (err, hash) {
      if (err) reject(err)
      resolve(hash)
    })
  })
}
