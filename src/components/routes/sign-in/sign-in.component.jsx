import { signInWithGooglePopup, createUserDocumentFromAuth } from "../../../utils/firebase/firebase.utils"

const SignIn = () => {
  const logGoogleUser = async () => {
    const userAuth = await signInWithGooglePopup()
    const userDocRef = createUserDocumentFromAuth(userAuth.user)
  }

  return (
    <div>
      <h1>Sign In Page</h1>
      <button onClick={logGoogleUser}>Sign in with Google</button>
    </div>
  )
}

export default SignIn
