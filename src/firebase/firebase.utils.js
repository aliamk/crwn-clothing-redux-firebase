import firebase from 'firebase/app'
import 'firebase/firestore' // for the database
import 'firebase/auth'  // for the authorisation

const config = {
  apiKey: "AIzaSyCE8o3gtPNquPCj89EfRlgbVlCtEChYQSk",
  authDomain: "crwn-db-949da.firebaseapp.com",
  databaseURL: "https://crwn-db-949da.firebaseio.com",
  projectId: "crwn-db-949da",
  storageBucket: "crwn-db-949da.appspot.com",
  messagingSenderId: "703367615173",
  appId: "1:703367615173:web:4b8686cc8be509b48dd6ac",
  measurementId: "G-XSCE9G9LR6"
}

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if(!userAuth) return; // if NULL is returned (user not signed in), exit function

  /* if userAuth is true, find location of the data and its ID */
  const userRef = firestore.doc(`users/${ userAuth.uid }`) 
  
  /* This will produce the EXISTS property + will check if the authenticated user data already 
  exists in the database */
  const snapShot = await userRef.get() 
  
  if( !snapShot.exists ) {
    const { displayName, email } = userAuth // If snapshot is false (user is not saved in database), then create it
    const createdAt = new Date()

    try {
      await userRef.set({   // Create the user (a new document) in the database
        displayName,
        email,
        createdAt,
        ...additionalData
      })
    } catch(error) {
        console.log( 'error creating user', error.message )
    }
  }
  return userRef
}

firebase.initializeApp(config)

// Create new util to add our shop data to the Firebase database
export const addCollectionAndDocuments = (collectionKey, objectsToAdd) => {
  const collectionRef = firestore.collection(collectionKey)
  console.log(collectionRef)
}

export const auth = firebase.auth()
export const firestore = firebase.firestore()

const provider = new firebase.auth.GoogleAuthProvider()
provider.setCustomParameters({ prompt: 'select_account' })
export const signInWithGoogle = () => auth.signInWithPopup(provider)

export default firebase