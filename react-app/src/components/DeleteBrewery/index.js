import React from 'react';
import { useDispatch } from 'react-redux';
import { DeleteBreweryForm } from '../../forms/DeleteBreweryForm';
import { showModal, setCurrentModal } from '../../store/modal';
import styles from './DeleteBrewery.module.css'


export const DeleteBrewery = ({brewery_id}) => {
    const dispatch = useDispatch()

    const showDeleteForm = () => {
        dispatch(setCurrentModal(() => (<DeleteBreweryForm brewery_id={brewery_id} />)));
        dispatch(showModal());
      }

  return <div onClick={showDeleteForm} className={styles.button}>Delete Brewery</div>;
};
