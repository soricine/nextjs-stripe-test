import React, { useState } from 'react'
import LabelInput from './LabelInput'
import { Button } from '@/components/ui/button'
import { ReloadIcon } from '@radix-ui/react-icons'
import { delay } from '@/lib/delay'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Form } from './ui/Form'
import { newPasswd } from '@/validations/newPasswd'
import Link from 'next/link'

export default function SubmitForm() {
  const [submitted, setSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<z.infer<typeof newPasswd>>({
    resolver: zodResolver(newPasswd),
    defaultValues: {
      email: '',
      verificationCode: '',
      password: '',
      confirmPassword: '',
    },
  })

  const onSubmit = async (values: z.infer<typeof newPasswd>) => {
    setSubmitted(false)
    setSubmitError(false)
    setIsLoading(true)
    // await delay(2000)

    const result = await fetch('/api/newPasswd', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values),
    })
    if (result.status !== 200) {
      setSubmitError(true)
      setIsLoading(false)
      return
    }
    const resultJson = await result.json()
    console.log(resultJson)

    setSubmitted(true)
    setIsLoading(false)
    form.reset()
  }

  return (
    <div>
      {submitted && <div>Thank for Register</div>}
      {submitError && <div>Error !!!</div>}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <LabelInput
            name="email"
            description="insert your Email"
            label="Email"
            placeholder="example@email.com"
            control={form.control}
          ></LabelInput>
          <LabelInput
            name="verificationCode"
            description="insert verification Code here"
            label="verificationCode"
            placeholder="123"
            control={form.control}
          ></LabelInput>
          <LabelInput
            name="password"
            description="insert your Password"
            label="New Password"
            placeholder="123qwe"
            type="password"
            control={form.control}
          ></LabelInput>
          <LabelInput
            name="confirmPassword"
            description="insert again the same Password"
            label="Confirm New Password"
            placeholder="Same as New Password"
            type="password"
            control={form.control}
          ></LabelInput>
          <Button disabled={isLoading} type="submit">
            {isLoading && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
            Submit
          </Button>
        </form>
      </Form>
      <br />
      <Link href="/signin">
        <b>Sign-in Page</b>
      </Link>
    </div>
  )
}
