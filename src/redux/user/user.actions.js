import UserActionTypes from './user.types'

/* setCurrentUser takes USER as the object and returns the ACTION that 
   can be used by 'mapDispatchToProps in App.js in order to communicate
  the action to the reducers */

// DON'T NEED THIS AFTER SAGA ADDED
// export const setCurrentUser = user => ({ 
//   type: UserActionTypes.SET_CURRENT_USER,
//   payload: user   
//  })

 /* Trigger the Google SignIn  -no payload required 
 because it's just telling the saga what to trigger*/
export const googleSignInStart = () => ({
 type: UserActionTypes.GOOGLE_SIGN_IN_START
});

 /* The success action will return the user so a payload is required */
export const signInSuccess = user => ({
 type: UserActionTypes.SIGN_IN_SUCCESS,
 payload: user
});

  /* The failure action will return an error so a payload is required */
 export const signInFailure = error => ({
   type: UserActionTypes.SIGN_IN_FAILURE,
   payload: error
 });

export const emailSignInStart = emailAndPassword => ({
 type: UserActionTypes.EMAIL_SIGN_IN_START,
 payload: emailAndPassword
});

//  Refactored in user.types.js so updating here too
//  export const emailSignInSuccess = user => ({
//   type: UserActionTypes.EMAIL_SIGN_IN_SUCCESS,
//   payload: user
//  })

//  export const emailSignInFailure = error=> ({
//   type: UserActionTypes.EMAIL_SIGN_IN_FAILURE,
//   payload: error
//  })

/* Actions created for user persistence using Sagas - pass checkUserSession 
from user.types.js into dispatch in App.js  */
export const checkUserSession = () => ({
 type: UserActionTypes.CHECK_USER_SESSION
});

export const signOutStart = () => ({
 type: UserActionTypes.SIGN_OUT_START
});

export const signOutSuccess = () => ({
 type: UserActionTypes.SIGN_OUT_SUCCESS
});

export const signOutFailure = error => ({
 type: UserActionTypes.SIGN_OUT_FAILURE,
 payload: error
});

/* Actions for turning Signing-up into Sagas
 Want to pass email, password and username in as one object called userCredentials
 from sign-up.component.jsx */
export const signUpStart = userCredentials => ({
 type: UserActionTypes.SIGN_UP_START,
 payload: userCredentials
});

export const signUpSuccess = ({ user, additionalData }) => ({
 type: UserActionTypes.SIGN_UP_SUCCESS,
 payload: { user, additionalData }
});

export const signUpFailure = error => ({
 type: UserActionTypes.SIGN_UP_FAILURE,
 payload: error
});