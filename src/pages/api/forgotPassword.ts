// // This is your test secret API key.
// import process from "process";
// import Stripe from "stripe" ;

import { NextApiRequest, NextApiResponse } from 'next'
import { RegistrationData } from '@/types'
import { registrationFormSchema } from '@/validations/forgotPassw'
import { prisma } from '@/database/client'
import { isPasswordValid } from '@/utils/server/isPasswordValid'
import { generatePasswordResetToken } from '@/utils/server/generatePasswordResetToken'
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

  const response = registrationFormSchema.safeParse(req.body)

  if (!response.success) {
    const { errors } = response.error

    return res.status(400).json({
      status: 'error',
      error: 'invalid_input',
      description: 'expected an array of items string id',
      errors,
    })
  }

  const registrationData = response.data as RegistrationData

  const user = await prisma.user.findFirst({
    where: {
      email: registrationData.email,
    },
  })
  if (!user) {
    return res.status(401).json({
      status: 'error',
      error: 'unauthorized',
      description: 'invalid username or password',
    })
  }

  const tokenExpiresAt = new Date(
    new Date().getTime() + 1 * 5 * 1000
  ).toISOString()

  const passwordResetToken = generatePasswordResetToken()

  await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      resetPasswordToken: passwordResetToken,
      resetPasswordExpiresAt: tokenExpiresAt,
    },
  })

  console.log('reset passwd token : ', passwordResetToken)
  return res.json({
    status: 'success',
    description: 'sent email token',
  })
}
