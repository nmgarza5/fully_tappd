import React from 'react';
import { useDispatch } from 'react-redux';
import { ReviewForm } from '../../../forms/ReviewForm';
import { showModal, setCurrentModal } from '../../../store/modal';
import styles from './CreateReview.module.css'


export const CreateReview = ({brewery_id, beer_id}) => {
    const dispatch = useDispatch()

    const showReviewForm = () => {
        dispatch(setCurrentModal(() => (<ReviewForm brewery_id={brewery_id} beer_id={beer_id}/>)));
        dispatch(showModal());
      }

  return <div className={styles.button}>
            <i onClick={showReviewForm} className="fa-solid fa-square-check fa-2x"></i>

        </div>;
};
