import React from 'react';
import { Route } from 'react-router-dom'

import CollectionsOverview from '../../components/collections-overview/collections-overview.component'
import CollectionPage from '../collection/collection.component'

/* This is the /SHOP page.  Data is being populated on this page */

const ShopPage = ({ match }) => (
  <div className='shop-page'>
    <Route exact path={`${ match.path }`} component={CollectionsOverview} />
    <Route path={`${ match.path }/:collectionId`} component={CollectionPage}/>
  </div>
)

export default ShopPage

/* 
The first ROUTE goes to the Collections Overview component
The second ROUTE: Nested Routing: we want to only populate the categories page with 
the items that the user has clicked on i.e., only return hats when clicking hats
- To do this, we want to access the URL, specifically the string after shop
- If it says shop/jackets, we want the category page to be populated by only items 
within the jackets data so we use: path={`${ match.path }/:collectionId`}
*/ 