// // This is your test secret API key.
// import process from "process";
// import Stripe from "stripe" ;

import { NextApiRequest, NextApiResponse } from 'next'
import { NewPasswordData } from '@/types'
import { newPasswd } from '@/validations/newPasswd'
import { prisma } from '@/database/client'
import { generatePasswordResetToken } from '@/utils/server/generatePasswordResetToken'
import { generateSalt } from '@/utils/server/generateSalt'
import { hashPassword } from '@/utils/server/hashPassword'
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res
      .setHeader('Allow', ['POST'])
      .status(405)
      .json({
        status: 'error',
        error: 'method_not_allowed',
        description: `Method ${req.method} not allowed`,
      })
  }

  const response = newPasswd.safeParse(req.body)
  const newPasswdData = response.data as NewPasswordData
  const passwordSalt = await generateSalt()
  const hashedPassword = await hashPassword({
    password: newPasswdData.password,
    salt: passwordSalt,
  })

  if (!response.success) {
    const { errors } = response.error

    return res.status(400).json({
      status: 'error',
      error: 'invalid_input',
      description: 'expected an array of items string id',
      errors,
    })
  }

  const user = await prisma.user.findFirst({
    where: {
      email: newPasswdData.email,
      resetPasswordToken: newPasswdData.verificationCode,
    },
  })
  if (!user) {
    return res.status(401).json({
      status: 'error',
      error: 'unauthorized',
      description: 'invalid username or password',
    })
  }

  await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      passwordSalt,
      hashedPassword,
    },
  })

  return res.json({
    status: 'success',
    description: 'New Password Created',
  })
}
