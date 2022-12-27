import { signInWithGooglePopup, signInWithGoogleRedirect, createUserDocumentFromAuth } from "../../../utils/firebase/firebase.utils"
import SignUpForm from "../../sign-up-form/sign-up-form.component"

const SignIn = () => {
  const logGoogleUser = async () => {
    const userAuth = await signInWithGooglePopup()
    const userDocRef = createUserDocumentFromAuth(userAuth.user)
    console.log(userDocRef)
  }

  return (
    <div>
      <h1>Sign In Page</h1>
      <button onClick={logGoogleUser}>Sign in with Google Popup</button>
      <button onClick={signInWithGoogleRedirect}>Sign in with Google Redirect</button>
      <SignUpForm />
    </div>
  )
}

export default SignIn
