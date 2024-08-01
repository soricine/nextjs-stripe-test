import { z } from 'zod'

export const newPasswd = z
  .object({
    email: z.string().min(1, 'You must privide an email address').email(),
    verificationCode: z.string().min(6),
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
