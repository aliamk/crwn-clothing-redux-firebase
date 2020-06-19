import { takeLatest, call, put } from 'redux-saga/effects' 
// takeEvery listens for every action of a specific type that is passed to it
/* call is a method that takes a function/method as it's first argument, and 
the second argument is the parameter that's passed into the first */
/* put is the saga equivalent of dispatch */

import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils'
import {
  fetchCollectionsSuccess,
  fetchCollectionsFailure
} from './shop.actions'

import ShopActionTypes from './shop.types' // listening for specific action types from this file

/*  Redux-Saga's whole purpose is to run these sagas all concurrently 
(wants to run them all together without blocking the execution). 

Get the CollectionRef to get the snapshot
Replace the PROMISE pattern of .get().then() with the GENERATOR pattern
Create the collectionsMap using 'call'
*/
export function* fetchCollections() {
  try {
    const collectionRef = firestore.collection('collections')
    const snapshot = yield collectionRef.get()
    const collectionsMap = yield call(convertCollectionsSnapshotToMap, snapshot)
    yield put(fetchCollectionsSuccess(collectionsMap))
  } catch (error) {
    yield put(fetchCollectionsFailure(error.message))
  }
}

//  Will pause everytime a specific action comes in
export function* onFetchCollectionsStart() {
  yield takeLatest(
    ShopActionTypes.FETCH_COLLECTIONS_START, 
    fetchCollections
  )
}

/* REFACTORED FROM THE PROMISE PATTERN TO THE GENERATOR PATTER ABOVE
const collectionRef = firestore.collection('collections')
    dispatch(fetchCollectionsStart())
    collectionRef.get().then(snapshot => {
        const collectionsMap = convertCollectionsSnapshotToMap(snapshot)
        dispatch (fetchCollectionsSuccess(collectionsMap))
      }) // If API call unsuccessful, send a dispatch to reducer to trigger fetchCollectionsFailure
      .catch(error => dispatch(
          fetchCollectionsFailure(error.message)
          ))
      } */
