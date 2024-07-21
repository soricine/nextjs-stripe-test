import React, { useState } from 'react'
import LabelInput from './LabelInput'
import { RegistrationData } from '../types'
import { Button } from '@/components/ui/button'
import { ReloadIcon } from '@radix-ui/react-icons'
import { delay } from '@/lib/delay'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Form } from './ui/Form'

const formSchema = z.object({
  username: z.string().min(2).max(50),
  email: z.string().min(1, 'You must privide an email address').email(),
})

export default function SubmitForm() {
  const [submitted, setSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
      email: '',
    },
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
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
  }

  return (
    <div>
      {submitted && <div>Thank for Submit</div>}
      {submitError && <div>Error !!!</div>}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <LabelInput
            name="username"
            description="insert your username"
            label="Username"
            placeholder="qwe123"
            control={form.control}
          ></LabelInput>
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
          </Button>
        </form>
      </Form>
    </div>
  )
}
