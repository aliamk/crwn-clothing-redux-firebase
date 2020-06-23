import firebase from 'firebase/app' 
import 'firebase/firestore'   // for the database
import 'firebase/auth'  // for the authorisation

const config = {
  apiKey: 'AIzaSyCdHT-AYHXjF7wOrfAchX4PIm3cSj5tn14',
  authDomain: 'crwn-db.firebaseapp.com',
  databaseURL: 'https://crwn-db.firebaseio.com',
  projectId: 'crwn-db',
  storageBucket: 'crwn-db.appspot.com',
  messagingSenderId: '850995411664',
  appId: '1:850995411664:web:7ddc01d597846f65'
} 

firebase.initializeApp(config) 

/* STORE REGISTERED USERS IN FIREBASE'S COLLECTION: USERS */
export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return  // if NULL is returned (user not signed in), exit function
  /* if userAuth is true, find location of the data and its ID */
  const userRef = firestore.doc(`users/${userAuth.uid}`) 
/* This will produce the EXISTS property + will check if the authenticated user data already 
  exists in the database */
  const snapShot = await userRef.get() 

  if (!snapShot.exists) {
    const { displayName, email } = userAuth  // If snapshot is false (user is not saved in database), then create it
    const createdAt = new Date() 
    try {
      await userRef.set({  // Create the user (a new document) in the database
        displayName,
        email,
        createdAt,
        ...additionalData
      }) 
    } catch (error) {
      console.log('error creating user', error.message) 
    }
  }

  return userRef 
} 

/* STORE SHOP_DATA IN FIREBASE'S COLLECTION: COLLECTIONS */
export const addCollectionAndDocuments = async ( collectionKey, objectsToAdd ) => {
  const collectionRef = firestore.collection(collectionKey) 
  // console.log(collectionRef)
  /* BATCH-WRITING: grouping all the calls into one big request  */
  const batch = firestore.batch() 
  objectsToAdd.forEach(obj => {  // don't use .map bc don't want a new array
    const newDocRef = collectionRef.doc()   // get each doc at an empty string and randomly generate an ID
    // console.log(newDocRef)
    batch.set(newDocRef, obj)  // this will set the newDocRefs to the value: objects
  }) 

  return await batch.commit()  // sends the requests and returns a PROMISE
} 

/* Want to receive the title and items from the  collections snapshot from shop.component 
and convert the returned array into an object  */
export const convertCollectionsSnapshotToMap = collections => {
  const transformedCollection = collections.docs.map(doc => {
    const { title, items } = doc.data() 

    return {
      routeName: encodeURI(title.toLowerCase()),
      id: doc.id,
      title,
      items
    } 
  }) 
  // console.log(tranformedCollection)
  return transformedCollection.reduce((accumulator, collection) => {
    accumulator[collection.title.toLowerCase()] = collection 
    return accumulator 
  }, {}) 
} 

/* For user persistence - this method returns a new Promise that saga can work with
to get the userAuth object, then immediately unsubscribe.  Once unsubscribed, resolve with 
the userAuth object. If it fails to resolve, then reject with an error */
export const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const unsubscribe = auth.onAuthStateChanged(userAuth => {
      unsubscribe()
      resolve(userAuth)
    }, reject)
  })
}

export const auth = firebase.auth() 
export const firestore = firebase.firestore() 

export const googleProvider = new firebase.auth.GoogleAuthProvider() 
googleProvider.setCustomParameters({ prompt: 'select_account' }) 
export const signInWithGoogle = () => auth.signInWithPopup(googleProvider) 

export default firebase 

/* export const convertCollectionsSnapshotToMap = (collections) => {
  const transformedCollection = collections.docs.map(doc => {
    const { title, items } = doc.data()
  
    return {
      routeName: encodeURI(title.toLowerCase()),
      id: doc.id,
      title,
      items
    }
  })
  */