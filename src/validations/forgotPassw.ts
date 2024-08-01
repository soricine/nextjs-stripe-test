import { z } from 'zod'

export const registrationFormSchema = z.object({
  email: z.string().min(1, 'You must privide an email address').email(),
})
