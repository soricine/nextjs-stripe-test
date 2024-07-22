import { z } from 'zod'

export const registrationFormSchema = z
  .object({
    username: z.string().min(2).max(50),
    email: z.string().min(1, 'You must privide an email address').email(),
    password: z.string().min(6),
    confirmPassword: z.string().min(6),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: 'custom',
        message: 'The passwords did not match',
        path: ['confirmPassword'],
      })
    }
  })
