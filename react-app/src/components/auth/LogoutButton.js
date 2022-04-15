import React from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../store/session';
import styles from './Auth.module.css'

const LogoutButton = () => {
  const dispatch = useDispatch()
  const onLogout = async (e) => {
    await dispatch(logout());
  };

  return <div role='button' className={styles.button_logout} onClick={onLogout}>Logout</div>;
};

export default LogoutButton;
