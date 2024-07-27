import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { Button } from '@/components/ui/button'

export default function AccountProfile() {
  const router = useRouter()
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [token, setToken] = useState('')
  const [userEmail, setUserEmail] = useState('')

  const getIsLoggedIn = async (): Promise<void> => {
    const token = localStorage.getItem('OAuthToken')
    if (!token) {
      setIsLoggedIn(false)
      setIsLoading(false)
      router.replace('/signin')
      return
    }
    setToken(token)
    const result = await fetch('/api/account', {
      method: 'GET',
      headers: { Accept: 'application/json', Authorization: `Bearer ${token}` },
    })
    if (result.status !== 200) {
      setIsLoggedIn(false)
      setIsLoading(false)
      router.replace('/signin')
      return
    }
    const resultJson = await result.json()
    setUserEmail(resultJson.data.user.email)
    setIsLoggedIn(true)
    setIsLoading(false)
  }
  useEffect(() => {
    getIsLoggedIn()
  }, [])

  const logout = async () => {
    const result = await fetch('/api/account', {
      method: 'DELETE',
      headers: { Accept: 'application/json', Authorization: `Bearer ${token}` },
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
        <b>Account {userEmail} Page</b>
        <br />
        <br />
      </div>
      <Button onClick={logout}>Logout</Button>
    </div>
  )
}
