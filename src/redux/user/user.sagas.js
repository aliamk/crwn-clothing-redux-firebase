  import { takeLatest, put, all, call } from 'redux-saga/effects';

import UserActionTypes from './user.types';

import {
  signInSuccess,
  signInFailure,
  signOutSuccess,
  signOutFailure,
  signUpSuccess,
  signUpFailure
} from './user.actions';

import {
  auth,
  googleProvider,
  createUserProfileDocument,
  getCurrentUser
} from '../../firebase/firebase.utils';

export function* getSnapshotFromUserAuth(userAuth, additionalData) {
  try {
    const userRef = yield call(
      createUserProfileDocument,
      userAuth,
      additionalData
    );
    const userSnapshot = yield userRef.get();
    yield put(signInSuccess({ id: userSnapshot.id, ...userSnapshot.data() }));
  } catch (error) {
    yield put(signInFailure(error));
  }
}


export function* signInWithGoogle() {
  try {
    const { user } = yield auth.signInWithPopup(googleProvider);
    // console.log(userRef)
    yield getSnapshotFromUserAuth(user);
  } catch (error) {
    yield put(signInFailure(error));
  }
}

export function* signInWithEmail({ payload: { email, password } }) {
  try {
    const { user } = yield auth.signInWithEmailAndPassword(email, password);
    yield getSnapshotFromUserAuth(user);
  } catch (error) {
    yield put(signInFailure(error));
  }
}

/* User persistence:  Check for getCurrentUser from firebase.utils  */
export function* isUserAuthenticated() {
  try {
    const userAuth = yield getCurrentUser();
    // If userAuth is null (no sign-in means no session), then just end the function
    if (!userAuth) return
    // If there is a value, call the snapshot
    yield getSnapshotFromUserAuth(userAuth);
  } catch (error) {
    yield put(signInFailure(error));
  }
}

export function* signOut() {
  try {
    yield auth.signOut();
    yield put(signOutSuccess());
  } catch (error) {
    yield put(signOutFailure(error));
  }
}

export function* signUp({ payload: { email, password, displayName } }) {
  try {
    const { user } = yield auth.createUserWithEmailAndPassword(email, password);
    yield put(signUpSuccess({ user, additionalData: { displayName } }));
  } catch (error) {
    yield put(signUpFailure(error));
  }
}

export function* signInAfterSignUp({ payload: { user, additionalData } }) {
  yield getSnapshotFromUserAuth(user, additionalData);
}

export function* signInAfterSignOut({ payload: { user, additonalData} }) {
  yield getSnapshotFromUserAuth(user, additonalData)
}

// LISTENERS

/* Create a LISTENER that listens for the start call of the Google sign-In API call. 
It will trigger the AUTH in signInWithPopup (using googleProvider) within the singInWithGoole
function. If the authentication is correct, googleSignInSuccess will update the user.reducer
with currentUser details.
*/
export function* onGoogleSignInStart() {
  yield takeLatest(UserActionTypes.GOOGLE_SIGN_IN_START, signInWithGoogle);
}

/* Create a LISTENER that listens for the start call of the email sign-In API call
and give it any objects it needs (email and password).  This will trigger the AUTH
within the signInWithEmail function */
export function* onEmailSignInStart() {
  yield takeLatest(UserActionTypes.EMAIL_SIGN_IN_START, signInWithEmail);
}

/* USER PERSISTENCE
Creating a listener for user persistence */
export function* onCheckUserSession() {
  yield takeLatest(UserActionTypes.CHECK_USER_SESSION, isUserAuthenticated);
}

/* SIGN-OUT
Creating listener for signing-out  */
export function* onSignOutStart() {
  yield takeLatest(UserActionTypes.SIGN_OUT_START, signOut);
}

/* SIGNUP
Creating listener for signing-up  */
export function* onSignUpStart() {
  yield takeLatest(UserActionTypes.SIGN_UP_START, signUp);
}

export function* onSignUpSuccess() {
  yield takeLatest(UserActionTypes.SIGN_UP_SUCCESS, signInAfterSignUp);
}



// EXPORT ALL SAGAS
export function* userSagas() {
  yield all([
    call(onGoogleSignInStart),
    call(onEmailSignInStart),
    call(onCheckUserSession),
    call(onSignOutStart),
    call(onSignUpStart),
    call(onSignUpSuccess)
  ]);
}



/*
RECREATING THIS CODE TAKEN FROM APP.JS IN ORDER TO MOVE 
FIREBASES' GOOGLE'S SIGNIN FUNCTIONALITY TO SAGA
this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
  if (userAuth) {
    const userRef = await createUserProfileDocument(userAuth) 

    userRef.onSnapshot(snapShot => {
      setCurrentUser({
        id: snapShot.id,
        ...snapShot.data()
      }) 
    }) 
   }
  setCurrentUser(userAuth)
  /*addCollectionAndDocuments('collections', collectionsArray.map(
    ({ title, items }) => ({ title, items})))
}) 
} */