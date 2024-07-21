import React from "react"; 

export default function LabelInput() {

    return (
        <form>
            <label htmlFor="name" id="fn">First Name : </label>
            <input type="text" id="fname" name="fname" required/><br/><br/> 
            <label htmlFor="name" id="ln">Last Name : </label>
            <input type="text" id="lname" name="lname" required/><br/> <br/>
             
        </form>    
    )  
}