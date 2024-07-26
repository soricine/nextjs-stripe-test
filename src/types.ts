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
