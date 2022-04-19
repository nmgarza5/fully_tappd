import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const BrewhubConditional = props => {
  const user = useSelector(state => state.session.user)
  const userBreweries = Object.values(user.breweries)
  console.log(userBreweries.length)
  return (
    <Route {...props}>

      {(userBreweries.length > 0)? props.children  : <Redirect to='/new-brewery' />}
    </Route>
  )
};


export default BrewhubConditional;
