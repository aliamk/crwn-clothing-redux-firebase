import UserActionTypes from './user.types'

const INITIAL_STATE = {
  currentUser: null,   // firebase's Google sign-in
  error: null // Redux-Saga's modification: SIGN_IN_FAILURES
}

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UserActionTypes.GOOGLE_SIGN_IN_SUCCESS:
    case UserActionTypes.EMAIL_SIGN_IN_SUCCESS:
      return {
        ...state,
        currentUser: action.payload,
        error: null // If action succeeds, return error to null
      }
    case UserActionTypes.GOOGLE_SIGN_IN_FAILURE:
    case UserActionTypes.EMAIL_SIGN_IN_FAILURE:
      return {
        ...state,
        error: action.payload
      }
    default:
      return state
  }
}

/*
// using ES6's default parameter value for state
const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case UserActionTypes.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload
      }
    default:
      return state
  }
}*/

export default userReducer