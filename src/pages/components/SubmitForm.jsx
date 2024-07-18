import React from "react";


export default function SubmitForm() {

  const [message, setMessage] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);



  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const result = await fetch("/api/submit-form-api", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ items: [{ id: "xl-tshirt" }] }),
    })
      const resultJson = await result.json() ;
      console.log(resultJson);
      setIsLoading(false);
  };


  React.useEffect(() => {
    // Create PaymentIntent as soon as the page loads
    
  }, []);

console.log("eceewce");
  return (
    <form id="payment-form" onSubmit={handleSubmit}>

              <label htmlFor="name" id="fn">First Name : </label>
              <input type="text" id="fname" name="fname" required/><br/><br/> 
              <label htmlFor="name" id="ln">Last Name : </label>
              <input type="text" id="lname" name="lname" required/><br/> <br/>
              
              <button disabled={isLoading} id="submit" onClick={handleSubmit}>
                <span id="button-text">
                    {isLoading ? <div className="spinner" id="spinner"></div> : "Submit"}
                </span>
              </button>
      {/* Show any error or success messages */}
  
    </form>
  );
}