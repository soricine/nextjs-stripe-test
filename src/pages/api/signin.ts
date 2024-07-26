// // This is your test secret API key.
// import process from "process";
// import Stripe from "stripe" ;

import { NextApiRequest, NextApiResponse } from 'next'
import { RegistrationData } from '@/types'
import { registrationFormSchema } from '@/validations/signin'
import { prisma } from '@/database/client'
import { v4 as uuidv4 } from 'uuid'
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
      password: registrationData.password,
    },
  })
  if (!user) {
    return res.status(401).json({
      status: 'error',
      error: 'unauthorized',
      description: 'invalid username or password',
    })
  }

  const exp = new Date(new Date().getTime() + 36 * 60 * 60 * 1000).toISOString()
  const oauth = await prisma.oAuthToken.create({
    data: {
      userId: user.id,
      token: uuidv4(),
      expiresAt: exp,
    },
  })

  return res.json({
    status: 'success',
    description: 'data was ook',
    data: {
      token: oauth.token,
      expiresAt: oauth.expiresAt,
      email: user.email,
      id: user.id,
    },
  })
}
