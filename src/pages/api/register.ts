// // This is your test secret API key.
// import process from "process";
// import Stripe from "stripe" ;

import { NextApiRequest, NextApiResponse } from 'next'
import { RegistrationData } from '@/types'
import { registrationFormSchema } from '@/validations/registrationSchema'
import { prisma } from '@/database/client'
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

  const response = registrationFormSchema.safeParse(req.body)
  const registrationData = response.data as RegistrationData
  const passwordSalt = await generateSalt()
  const hashedPassword = await hashPassword({
    password: registrationData.password,
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

  const user = await prisma.user.create({
    data: {
      email: registrationData.email,
      hashedPassword,
      passwordSalt,
    },
  })
  return res.json({
    status: 'success',
    description: 'data was ook',
    data: user,
  })
}
