import { useState } from "react"
import {
  signInWithGooglePopup,
  createUserDocumentFromAuth,
  signInAuthUserWithEmailAndPassword,
} from "../../utils/firebase/firebase.utils"
import FormInput from "../form-input/form-input.component"
import Button from "../button/button.component"
import "./sign-in-form.styles.scss"

const defaultFormFields = {
  email: "",
  password: "",
}

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields)
  const { email, password } = formFields

  const handleSubmit = async (event) => {
    event.preventDefault()

    try {
      const response = await signInAuthUserWithEmailAndPassword(email, password)
      setFormFields(defaultFormFields)
    } catch (err) {
      switch (err.code) {
        case "auth/wrong-password":
          alert("incorrect password for email")
          break
        case "auth/user-not-found":
          alert("no user associated with this email")
          break
        default:
          console.log(err)
      }
    }
  }

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormFields({ ...formFields, [name]: value })
  }

  const signInWithGoogle = async () => {
    const userAuth = await signInWithGooglePopup()
    await createUserDocumentFromAuth(userAuth.user)
  }

  return (
    <div className="sign-up-container">
      <h2>Already have an account?</h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={(event) => handleSubmit(event)}>
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
        <div className="buttons-container">
          <Button type="submit">Sign In</Button>
          <Button type="button" buttonType="google" onClick={signInWithGoogle}>
            Google Sign In
          </Button>
        </div>
      </form>
    </div>
  )
}

export default SignInForm
