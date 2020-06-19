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
  GOOGLE_SIGN_IN_SUCCESS: 'GOOGLE_SIGN_IN_SUCCESS',
  GOOGLE_SIGN_IN_FAILURE: 'GOOGLE_SIGN_IN_FAILURE',
  EMAIL_SIGN_IN_START: 'EMAIL_SIGN_IN_START',
  EMAIL_SIGN_IN_SUCCESS: 'EMAIL_SIGN_IN_SUCCESS',
  EMAIL_SIGN_IN_FAILURE: 'EMAIL_SIGN_IN_FAILURE'
}

export default UserActionTypes;