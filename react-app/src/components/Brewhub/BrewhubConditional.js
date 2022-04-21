import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const BrewhubConditional = props => {
  const user = useSelector(state => state?.session?.user)
  let userBreweries;
  user ? userBreweries = Object.values(user?.breweries) : userBreweries = null
  return (
    <Route {...props}>
      {(user && userBreweries.length > 0)? props.children  : <Redirect to='/new-brewery' />}
    </Route>
  )
};


export default BrewhubConditional;
