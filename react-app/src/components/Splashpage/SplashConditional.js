import React from 'react';
import { useSelector } from 'react-redux';
import { Route, Redirect } from 'react-router-dom';

const SplashConditional = props => {
  const user = useSelector(state => state.session.user)
  return (
    <Route {...props}>
      {console.log('PROPS --', props)}
      {console.log('PROPS --', props.children)}
      {/* {console.log('PROPS --', props.)} */}
      {(!user)? props.children  : <Redirect to='/activity' />}
    </Route>
  )
};


export default SplashConditional;
