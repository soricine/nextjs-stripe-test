import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { Button } from '@/components/ui/button'

export default function AccountProfile() {
  const router = useRouter()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [token, setToken] = useState('')

  const getIsLoggedIn = async (): Promise<void> => {
    const token = localStorage.getItem('OAuthToken')
    if (!token) {
      setIsLoggedIn(false)
      setIsLoading(false)
      router.replace('/signin')
      return
    }
    setToken(token)
    const values = { token }
    const result = await fetch('/api/account', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values),
    })
    if (result.status !== 200) {
      setIsLoggedIn(false)
      setIsLoading(false)
      router.replace('/signin')
      return
    }
    setIsLoggedIn(true)
    setIsLoading(false)
  }
  useEffect(() => {
    getIsLoggedIn()
  }, [])

  const logout = async () => {
    const values = { token }
    const result = await fetch('/api/account', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values),
    })
    localStorage.removeItem('OAuthToken')
    router.push('/signin')
  }
  if (isLoading) {
    return (
      <div>
        <b>Loading...</b>
      </div>
    )
  }
  if (isLoggedIn === false) {
    return (
      <div>
        <b>Redirecting to sign in</b>
      </div>
    )
  }
  return (
    <div>
      <div>
        <b>Account Profile Page</b>
        <br />
        <br />
      </div>
      <Button onClick={logout}>Logout</Button>
    </div>
  )
}
