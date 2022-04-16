import React from 'react';
import { PageContainer } from '../../PageContainer';
import { BeerForm } from '../../../forms/BeerForm'
import styles from './CreateBeer.module.css'

export const CreateBeer = () => {

  return (
    <PageContainer>
        <h1 className={styles.header}>Create Your New Beer</h1>
        <BeerForm />
    </PageContainer>
  )
};

// export default CreateBrewery;
