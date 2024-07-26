import { NextApiRequest, NextApiResponse } from 'next'
import { VerifyUserLoginApiData } from '@/types'
import { verififyLogoinSchema } from '@/validations/account'
import { prisma } from '@/database/client'
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const response = verififyLogoinSchema.safeParse(req.body)
  const verifyUserLoginApiData = response.data as VerifyUserLoginApiData

  if (req.method == 'POST') {
    const oauth = await prisma.oAuthToken.findFirst({
      where: {
        token: verifyUserLoginApiData.token,
        expiresAt: {
          gte: new Date(),
        },
      },
    })

    if (!oauth) {
      return res.status(401).json({
        status: 'error',
        error: 'unauthorized',
        description: 'invalid username or password',
      })
    }

    return res.json({
      status: 'success',
      description: 'data was ook',
      data: {
        token: oauth.token,
        expiresAt: oauth.expiresAt,
      },
    })
  }
  if (req.method == 'DELETE') {
    await prisma.oAuthToken.delete({
      where: {
        token: verifyUserLoginApiData.token,
      },
    })
    return res.send('')
  }
  return res
    .setHeader('Allow', ['POST'])
    .status(405)
    .json({
      status: 'error',
      error: 'method_not_allowed',
      description: `Method ${req.method} not allowed`,
    })
}
