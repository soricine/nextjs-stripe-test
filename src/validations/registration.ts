import { z } from 'zod'

export const registrationFormSchema = z.object({
  username: z.string().min(2).max(50),
  email: z.string().min(1, 'You must privide an email address').email(),
})
