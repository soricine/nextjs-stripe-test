import React, { useState } from 'react'
// import LabelInput from "./LabelInput" ;
import {RegistrationData} from "../../types";

export default function SubmitForm() {
  const [submited, setSubmited] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async ( ) => {
    
    setIsLoading(true)

    const data: RegistrationData = { items: [{ id: 'xl-tshirt' }] }   
    const result = await fetch('/api/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    // let fnamed = document.getElementById("lname");
    const resultJson = await result.json()
    console.log(resultJson)

    setSubmited(true)
    setIsLoading(false)
  }

  return (
    <div>
      {submited && <div>ThankU</div>}
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
