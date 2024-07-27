import { NextApiRequest, NextApiResponse } from 'next'
import { prisma } from '@/database/client'
import { getOAuthTokenFromHttpRequest } from '@/utils/server/getOAuthTokenFromHttpRequest'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method == 'GET') {
    const oAuthToken = await getOAuthTokenFromHttpRequest(req)
    if (!oAuthToken) {
      return res.status(401).json({
        status: 'error',
        error: 'unauthorized',
        description: 'invalid oauth token',
      })
    }

    return res.json({
      status: 'success',
      description: 'data was ook',
      data: {
        token: oAuthToken.token,
        expiresAt: oAuthToken.expiresAt,
        user: {
          email: oAuthToken.user.email,
        },
      },
    })
  }
  if (req.method == 'DELETE') {
    const oAuthToken = await getOAuthTokenFromHttpRequest(req)
    if (!oAuthToken) {
      return res.status(401).json({
        status: 'error',
        error: 'unauthorized',
        description: 'invalid oauth token',
      })
    }
    await prisma.oAuthToken.delete({
      where: {
        token: oAuthToken.token,
      },
    })
    return res.send('')
  }
  return res
    .setHeader('Allow', ['DELETE', 'GET'])
    .status(405)
    .json({
      status: 'error',
      error: 'method_not_allowed',
      description: `Method ${req.method} not allowed`,
    })
}
