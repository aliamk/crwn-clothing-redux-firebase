import React from 'react';
import { Route } from 'react-router-dom'
import { connect } from 'react-redux'

import CollectionsOverview from '../../components/collections-overview/collections-overview.component'
import CollectionPage from '../collection/collection.component'

import { updateCollections } from '../../redux/shop/shop.actions'

import {firestore, convertCollectionsSnapshotToMap} from '../../firebase/firebase.utils'

/* This is the /SHOP page.  Data is being populated on this page */

class ShopPage extends React.Component {
  unsubscribeFromSnapshot = null

  componentDidMount() {
    const { updateCollections } = this.props
    const collectionRef = firestore.collection('collections')

    this.unsubscribeFromSnapshot = collectionRef.onSnapshot(async snapshot => {
      // console.log(snapshot)
      const collectionsMap = convertCollectionsSnapshotToMap(snapshot)
      updateCollections(collectionsMap)
    })
  }
  render() {
    const { match } = this.props
    return (
      <div className='shop-page'>
    <Route exact path={`${ match.path }`} component={CollectionsOverview} />
    <Route path={`${ match.path }/:collectionId`} component={CollectionPage}/>
  </div>
    )
  }
}

const mapDispatchToProps = dispatch => ({
  updateCollections: collectionsMap => dispatch(updateCollections(collectionsMap))
})

/* REPLACED THIS WITH THE CLASS COMPONENT ABOVE AFTER DYNAMICALLY TRANSFERING THE SHOP_DATA
TO FIREBASE.  
const ShopPage = ({ match }) => (
  <div className='shop-page'>
    <Route exact path={`${ match.path }`} component={CollectionsOverview} />
    <Route path={`${ match.path }/:collectionId`} component={CollectionPage}/>
  </div>
)*/

export default connect(
  null,
  mapDispatchToProps
)(ShopPage)

/* 
The first ROUTE goes to the Collections Overview component
The second ROUTE: Nested Routing: we want to only populate the categories page with 
the items that the user has clicked on i.e., only return hats when clicking hats
- To do this, we want to access the URL, specifically the string after shop
- If it says shop/jackets, we want the category page to be populated by only items 
within the jackets data so we use: path={`${ match.path }/:collectionId`}
*/ 