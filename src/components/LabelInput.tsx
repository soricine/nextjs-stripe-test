import React from 'react'
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from './ui/Form'
import { Input } from '@/components/ui/Input'

export type Props = {
  description?: string
  label?: string
  name?: string
  placeholder?: string
  password?: string
  confirmPassword?: string
  control: any
}

export default function LabelInput(params: Props) {
  const {
    description,
    name,
    label,
    password,
    confirmPassword,
    placeholder,
    control,
    ...props
  } = params
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <FormControl>
            <Input placeholder={placeholder} {...field} {...props} />
          </FormControl>
          <FormDescription>{description}</FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
