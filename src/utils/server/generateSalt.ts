import bcrypt from 'bcrypt'

export const generateSalt = async (): Promise<string> => {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(function (err, salt) {
      if (err) reject(err)
      resolve(salt)
    })
  })
}
