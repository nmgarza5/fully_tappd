import React from 'react';
import { PageContainer } from '../PageContainer';
import { BreweryForm } from '../../forms/BreweryForm'
import styles from './CreateBrewery.module.css'

export const CreateBrewery = () => {

  return (
    <PageContainer>
        <h1 className={styles.header}>Create Your New Brewery</h1>
        <BreweryForm />
    </PageContainer>
  )
};

// export default CreateBrewery;
