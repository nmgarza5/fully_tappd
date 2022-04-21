import React from 'react';
import { useDispatch } from 'react-redux';
import { ReviewForm } from '../../../forms/ReviewForm';
import { showModal, setCurrentModal } from '../../../store/modal';
import styles from './UpdateReview.module.css'


export const UpdateReview = ({review, brewery_id, beer_id}) => {
    const dispatch = useDispatch()

    const showReviewForm = () => {
        dispatch(setCurrentModal(() => (<ReviewForm review={review} brewery_id={brewery_id} beer_id={beer_id}/>)));
        dispatch(showModal());
      }

  return <div onClick={showReviewForm} className={styles.button}>
            Edit
        </div>;
};
