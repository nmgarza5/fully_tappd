import React from 'react';
import { useDispatch } from 'react-redux';
import { BreweryForm } from '../../../forms/BreweryForm';
import { showModal, setCurrentModal } from '../../../store/modal';
import styles from './UpdateBrewery.module.css'

export const UpdateBrewery = ({brewery}) => {
    const dispatch = useDispatch()
    const showBreweryForm = () => {
        dispatch(setCurrentModal(() => (<BreweryForm brewery={brewery} />)));
        dispatch(showModal());
      }

  return <div onClick={showBreweryForm} className={styles.button}>Update Brewery</div>;
};
