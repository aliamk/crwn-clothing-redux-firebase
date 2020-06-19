// function returns an object with a type that matches the userReducer's
/* setCurrentUser takes USER as the object and returns the ACTION that 
   can be used by 'mapDispatchToProps in App.js in order to communicate
  the action to the reducers */

  import UserActionTypes from './user.types'


export const setCurrentUser = user => ({ 
  type: UserActionTypes.SET_CURRENT_USER,
  payload: user   
 })

 /* Trigger the Google SignIn  -no payload required 
 because it's just telling the saga what to trigger*/
 export const googleSignInStart = () => ({
  type: UserActionTypes.GOOGLE_SIGN_IN_START
 })

 /* The success action will return the user so a payload is required */
 export const googleSignInSuccess = user => ({
   type: UserActionTypes.GOOGLE_SIGN_IN_SUCCESS,
   payload: user
 })

  /* The failure action will return an error so a payload is required */
 export const googleSignInFailure = error => ({
  type: UserActionTypes.GOOGLE_SIGN_IN_FAILURE,
  payload: error
})

export const emailSignInStart = (emailAndPassword) => ({
  type: UserActionTypes.EMAIL_SIGN_IN_START,
  payload: emailAndPassword
 })

 export const emailSignInSuccess = user => ({
  type: UserActionTypes.EMAIL_SIGN_IN_SUCCESS,
  payload: user
 })

 export const emailSignInFailure = error=> ({
  type: UserActionTypes.EMAIL_SIGN_IN_FAILURE,
  payload: error
 })