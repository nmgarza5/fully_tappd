import { useHistory } from 'react-router-dom'
import {PageContainer} from '../PageContainer'
// import styles from './Splashpage.module.css'
import BreweriesList from '../BreweriesList'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

export const Splashpage = () => {
  const [isLoaded, setIsLoaded] = useState(false)
  const history = useHistory();
  const dispatch = useDispatch();

  // useEffect(() => {
  //   const load = async () => {
  //     await dispatch(receiveHomeRestaurants())
  //     setIsLoaded(true);
  //   }
  //   load();
  // }, [dispatch])

//   useEffect(() => {
//     dispatch(receiveHomeRestaurants())
//     setIsLoaded(true);
//   }, [dispatch])

  return (
    <PageContainer>
        Splash Page
        <BreweriesList />
    </PageContainer>
  )
}
