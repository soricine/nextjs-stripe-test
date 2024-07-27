import { prisma } from '@/database/client'
import { getTokenFromAuthorizationHeaders } from './getTokenFromAuthorizationHeaders'
import { NextApiRequest } from 'next'
import { OAuthTokenWithUser } from '@/types'

export const getOAuthTokenFromHttpRequest = async (
  req: NextApiRequest
): Promise<OAuthTokenWithUser | null> => {
  const authorizationHeader = req.headers.authorization
  const token = getTokenFromAuthorizationHeaders(authorizationHeader)
  if (token === undefined) {
    return null
  }
  const oauth = await prisma.oAuthToken.findFirst({
    where: {
      token,
      expiresAt: {
        gte: new Date(),
      },
    },
    include: {
      user: { select: { email: true } },
    },
  })
  return oauth
}
