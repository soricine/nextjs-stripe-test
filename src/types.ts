import { OAuthToken, User } from '@prisma/client'

export type Item = {
  id: string
}
export type StripePurchaseData = {
  items: Item[]
}

export type RegistrationData = {
  email: string
  password: string
}

export type OAuthTokenData = {
  token: string
  expiresAt: Date
  userId: string
}

export type VerifyUserLoginApiData = {
  token: string
}

export type OAuthTokenWithUser = OAuthToken & {
  user: Partial<User>
}

export type NewPasswordData = {
  verificationCode: string
  email: string
  password: string
}
