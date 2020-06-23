/* Want to use values instead of strings across the application
in order to keep code consistency and reduce errors (Assign the string 
'SET_CURRENT_USER' to a value). 

Export an OBJECT called UserActionTypes that will include
 the value that points to the string ... this is then imported
 into the userReducer.js and user.actions.js files as 
 UserActionTypes.SET_CURRENT_USER to remove duplicate strings */

 const UserActionTypes = {
  SET_CURRENT_USER: 'SET_CURRENT_USER',
  GOOGLE_SIGN_IN_START: 'GOOGLE_SIGN_IN_START',
  EMAIL_SIGN_IN_START: 'EMAIL_SIGN_IN_START',
  SIGN_IN_SUCCESS: 'SIGN_IN_SUCCESS',
  SIGN_IN_FAILURE: 'SIGN_IN_FAILURE',
  CHECK_USER_SESSION: 'CHECK_USER_SESSION',
  SIGN_OUT_START: 'SIGN_OUT_START',
  SIGN_OUT_SUCCESS: 'SIGN_OUT_SUCCESS',
  SIGN_OUT_FAILURE: 'SIGN_OUT_FAILURE',
  SIGN_UP_START: 'SIGN_UP_START',
  SIGN_UP_SUCCESS: 'SIGN_UP_SUCCESS',
  SIGN_UP_FAILURE: 'SIGN_UP_FAILURE'
}

export default UserActionTypes