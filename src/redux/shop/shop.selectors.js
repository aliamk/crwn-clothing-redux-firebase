import { createSelector } from 'reselect'

/* Don't need COLLECTION_ID_MAP now bc we've turned SHOP_DATA into an object
(from an array), and modified selectCollection below by removing 
.find:

const COLLECTION_ID_MAP = {
  hats: 1,
  sneakers: 2,
  jackets: 3,
  womens: 4,
  mens: 5
}
*/

const selectShop = state => state.shop

export const selectCollections = createSelector(
  [selectShop],
  shop => shop.collections
)

/* For /shop: Convert the collections object into an array for selectCollections to use
Get all the keys in object:collections and make an array
Map over all the keys in the array and return all the values at those keys */
export const selectCollectionsforPreview = createSelector(
  [selectCollections],
  collections => Object.keys(collections)
    .map(key => 
      collections[key]
    )
)
  
/*
export const selectCollection = collectionUrlParam =>
createSelector(
  [selectCollections],
  collections => 
    collections.find(
      collection => 
        collection.id === COLLECTION_ID_MAP[collectionUrlParam]
    ) 
)
 REPLACED .FIND WITH BELOW CODE */

export const selectCollection = collectionUrlParam =>
createSelector(
  [selectCollections],
  collections => 
    collections[collectionUrlParam] 
)