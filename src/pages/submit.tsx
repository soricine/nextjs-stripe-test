import React from 'react'
import SubmitForm from '../components/SubmitForm'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  async function main() {
    const allUsers = await prisma.user.findMany()
    console.log(allUsers)
  }
}

export default function App() {
  return (
    <div className="App">
      <SubmitForm />
    </div>
  )
}
