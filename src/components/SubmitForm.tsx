import React, { useState } from 'react'
import LabelInput from './LabelInput'
import { RegistrationData } from '../types'
import { Button } from '@/components/ui/Button'
import { ReloadIcon } from '@radix-ui/react-icons'
import { delay } from '@/lib/delay'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Form } from './ui/Form'

const formSchema = z.object({
  username: z.string().min(2).max(50),
})

export default function SubmitForm() {
  const [submitted, setSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: '',
    },
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setSubmitted(false)
    setSubmitError(false)
    setIsLoading(true)
    // await delay(2000)

    const data: RegistrationData = { items: [{ id: 'xl-tshirt' }] }
    const result = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
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
      {submitted && <div>ThankU</div>}
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
          <Button disabled={isLoading} type="submit">
            {isLoading && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
            Submit
          </Button>
        </form>
      </Form>
    </div>
  )
}
