// // This is your test secret API key.
// import process from "process";
// import Stripe from "stripe" ;

import { NextApiRequest, NextApiResponse } from 'next'
import { RegistrationData } from '@/types'
import { registrationFormSchema } from '@/validations/registration'

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

  return res.json({
    status: 'success',
    description: 'data was ook',
    data: registrationData,
  })
}
