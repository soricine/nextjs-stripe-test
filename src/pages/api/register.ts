// // This is your test secret API key.
// import process from "process";
// import Stripe from "stripe" ;

import { NextApiRequest, NextApiResponse } from 'next'
import { IsArray, IsString, validateOrReject } from 'class-validator'
// const stripe = Stripe (process.env.STRIPE_SECRET_KEY);

// const calculateOrderAmount = (items) => {
//    Replace this constant with a calculation of the order's amount
//    Calculate the order total on the server to prevent
//    people from directly manipulating the amount on the client
//   return 1400;
// };

class Item {
  @IsString()
  id!: string
}

class RegistrationData {
  @IsArray()
  items!: Item[]
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const requestBody = new RegistrationData()
  const { items } = req.body

  requestBody.items = items

  try {
    await validateOrReject(requestBody)
    return res.json({
      status: 'success',
      description: 'data was ook',
      data: requestBody,
    })
  } catch {
    return res.status(400).json({
      status: 'error',
      error: 'invalid_input',
      description: 'expected an array of items string id',
    })
  }
}
