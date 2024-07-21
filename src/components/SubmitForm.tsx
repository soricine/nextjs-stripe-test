import React, { useState } from 'react'
// import LabelInput from "./LabelInput" ;
import { RegistrationData } from '../types'

export default function SubmitForm() {
  const [submitted, setSubmitted] = useState(false)
  const [submitError, setSubmitError] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async () => {
    setSubmitted(false)
    setSubmitError(false)
    setIsLoading(true)

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
      <form>
        {/* Form() */}
        <button disabled={isLoading} id="submit" onClick={handleSubmit}>
          <span id="button-text">
            {isLoading ? (
              <div className="spinner" id="spinner"></div>
            ) : (
              'Submit'
            )}
          </span>
        </button>
      </form>
    </div>
  )
}
