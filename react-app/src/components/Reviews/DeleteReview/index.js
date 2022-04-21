import React from 'react';
import { useDispatch } from 'react-redux';
import { DeleteReviewForm } from '../DeleteReviewForm';
import { showModal, setCurrentModal } from '../../../store/modal';
import styles from './DeleteReview.module.css'


export const DeleteReview = ({review_id, beer_id}) => {
    const dispatch = useDispatch()

    const showDeleteReviewForm = () => {
        dispatch(setCurrentModal(() => (<DeleteReviewForm review_id={review_id} beer_id={beer_id}/>)));
        dispatch(showModal());
      }

  return <div onClick={showDeleteReviewForm} className={styles.button}>
            Delete
        </div>;
};
