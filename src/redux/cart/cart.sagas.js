import { all, call, takeLatest, put } from 'redux-saga/effects'

import UserActionTypes from '../user/user.types' // listening for this
import { clearCart } from './cart.actions' // this is what we'll fire out of this saga

//  Methods for listeners
export function* clearCartOnSignOut() {
  yield put(clearCart()) // put out the clearCart method
}


// LISTENERS
export function* onSignOutSuccess() {
  yield takeLatest(UserActionTypes.SIGN_OUT_SUCCESS, clearCartOnSignOut)
}



// Create cart.saga's root saga: call the listeners here
export function* cartSagas() {
  yield(all([call(onSignOutSuccess)]))
}