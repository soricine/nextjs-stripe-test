import { z } from 'zod'

export const verififyLogoinSchema = z.object({
  token: z.string(),
})
