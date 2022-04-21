import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = props => {
  const user = useSelector(state => state.session.user)
  console.log("U", user)
  console.log("USER BUSINES", user.business_user)
  return (
    <Route {...props}>
      {(user && user.business_user === true)? props.children  : <Redirect to='/' />}
    </Route>
  )
};


export default ProtectedRoute;
