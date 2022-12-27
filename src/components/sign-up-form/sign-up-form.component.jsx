import { useState } from "react"
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils"

const defaultFormFields = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
}

const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields)
  const { displayName, email, password, confirmPassword } = formFields

  const handleSubmit = async (event) => {
    event.preventDefault()
    if (password !== confirmPassword) {
      alert("passwords do not match")
      return
    }
    try {
      const userAuth = await createAuthUserWithEmailAndPassword(email, password)
      await createUserDocumentFromAuth(userAuth.user, { displayName })
      setFormFields(defaultFormFields)
    } catch (err) {
      if (err.code === "auth/email-already-in-use") {
        alert("cannot create user, email already in use")
      }
      console.log(err)
    }
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormFields({ ...formFields, [name]: value })
  }

  return (
    <div>
      <h1>
        Sign up with your email and password
        <form onSubmit={(event) => handleSubmit(event)}>
          <label>Display Name</label>
          <input type="text" name="displayName" onChange={handleChange} value={displayName} required />
          <label>Email</label>
          <input type="email" name="email" onChange={handleChange} value={email} required />
          <label>Password</label>
          <input type="password" name="password" onChange={handleChange} value={password} required />
          <label>Confirm Password</label>
          <input type="password" name="confirmPassword" onChange={handleChange} value={confirmPassword} required />
          <button type="submit">Sign Up</button>
        </form>
      </h1>
    </div>
  )
}

export default SignUpForm
