import React, { useState } from 'react'
import LabelInput from './LabelInput'
import { Button } from '@/components/ui/button'
import { ReloadIcon } from '@radix-ui/react-icons'
import { delay } from '@/lib/delay'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Form } from './ui/Form'
import { registrationFormSchema } from '@/validations/submit'
import Link from 'next/link'

export default function SubmitForm() {
  const [submitted, setSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<z.infer<typeof registrationFormSchema>>({
    resolver: zodResolver(registrationFormSchema),
    defaultValues: {
      email: '',
    },
  })

  const onSubmit = async (values: z.infer<typeof registrationFormSchema>) => {
    setSubmitted(false)
    setSubmitError(false)
    setIsLoading(true)
    // await delay(2000)

    const result = await fetch('/api/register', {
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
      {submitted && <div>Thank for Submit</div>}
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
          <Button disabled={isLoading} type="submit">
            {isLoading && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
            Submit
          </Button>{' '}
          <br />
          <Link href="signin">Sign In</Link>
        </form>
      </Form>
    </div>
  )
}
