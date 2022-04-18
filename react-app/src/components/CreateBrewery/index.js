import React from 'react';
import { useDispatch } from 'react-redux';
import { BreweryForm } from '../../forms/BreweryForm';
import { showModal, setCurrentModal } from '../../store/modal';
import styles from './CreateBrewery.module.css'

export const CreateBrewery = () => {
    const dispatch = useDispatch()
    const showBreweryForm = () => {
        dispatch(setCurrentModal(() => (<BreweryForm />)));
        dispatch(showModal());
      }

  return <div onClick={showBreweryForm} className={styles.button}>Create New Brewery</div>;
};
