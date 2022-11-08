import { initializeApp } from "firebase/app"
import { getAuth, signInWithRedirect, GoogleAuthProvider, signInWithPopup } from "firebase/auth"
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore"

// https://firebase.google.com/docs/web/setup#available-libraries
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAyhfMkaeluzDhcDL6DR3-QkSGVasbP_Fk",
  authDomain: "crwn-clothing-db-ce2ea.firebaseapp.com",
  projectId: "crwn-clothing-db-ce2ea",
  storageBucket: "crwn-clothing-db-ce2ea.appspot.com",
  messagingSenderId: "214616512824",
  appId: "1:214616512824:web:8adba58601acd83a0589cd",
}

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig)

const provider = new GoogleAuthProvider()
provider.setCustomParameters({
  prompt: "select_account",
})

export const auth = getAuth(firebaseApp)
export const signInWithGooglePopup = () => signInWithPopup(auth, provider)

export const db = getFirestore(firebaseApp)

export const createUserDocumentFromAuth = async (userAuth) => {
  console.log(userAuth)
  const userDocRef = await doc(db, "users", userAuth.uid)
  console.log(userDocRef)
  const userSnapshot = await getDoc(userDocRef)
  console.log(userSnapshot)
  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth
    const createdAt = new Date()
    try {
      await setDoc(userDocRef, { displayName, email, createdAt })
    } catch (err) {
      console.log(err, "error creating user")
    }
  }

  return userDocRef
}
