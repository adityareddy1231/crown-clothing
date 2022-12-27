import { useState } from "react"
import {
  createAuthUserWithEmailAndPassword,
  createUserDocumentFromAuth,
} from "../../utils/firebase/firebase.utils"
import FormInput from "../form-input/form-input.component"
import Button from "../button/button.component"
import "./sign-up-form.styles.scss"

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
    <div className="sign-up-container">
      <h2>Don't have an account?</h2>
      <span>Sign up with your email and password</span>
      <form onSubmit={(event) => handleSubmit(event)}>
        <FormInput
          label="Display Name"
          inputOptions={{
            type: "text",
            name: "displayName",
            onChange: handleChange,
            value: displayName,
            required: true,
          }}
        />
        <FormInput
          inputOptions={{
            type: "email",
            name: "email",
            onChange: handleChange,
            value: email,
            required: true,
          }}
        />
        <FormInput
          inputOptions={{
            type: "password",
            name: "password",
            onChange: handleChange,
            value: password,
            required: true,
          }}
        />
        <FormInput
          inputOptions={{
            type: "password",
            name: "confirmPassword",
            onChange: handleChange,
            value: confirmPassword,
            required: true,
          }}
        />
        <Button type="submit">Sign Up</Button>
      </form>
    </div>
  )
}

export default SignUpForm
