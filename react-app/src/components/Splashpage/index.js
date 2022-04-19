// import { useHistory } from 'react-router-dom'
// import {PageContainer} from '../PageContainer'
import styles from './Splashpage.module.css'
// import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { showModal, setCurrentModal } from "../../store/modal";
import SignUpForm from "../auth/SignUpForm";
import LoginForm from "../auth/LoginForm";
import SearchSection from '../SearchSection'


import banner from "../../images/beer-toast.jpg"
import bottles from "../../images/bottles.png"

export const Splashpage = () => {
	// const history = useHistory();
  const dispatch = useDispatch();

  const showSignUpForm = () => {
    dispatch(setCurrentModal(SignUpForm));
    dispatch(showModal());
  };
  const showLoginForm = () => {
    dispatch(setCurrentModal(LoginForm));
    dispatch(showModal());
};



  return (
      <>
        <div className={styles.banner_container}>
          {/* <div className={styles.right}>
                <div role='button' className={styles.button_top} onClick={showLoginForm}>
                    SIGN IN
                </div>
                <div role='button' className={styles.button_top} onClick={showSignUpForm}>
                    CREATE AN ACCOUNT
                </div>
          </div> */}
          <img src={banner} alt="Toast!" className={styles.banner} />
          <div className={styles.overlay}></div>
          <div className={styles.banner_info}>
              <div className={styles.info}>
                  <img src={bottles} alt="bottles" className={styles.bottles}/>
                  <h1>FullyTappd</h1>
                  <div className={styles.drink}>DRINK SOCIALLY</div>
                  <p></p>
                  <h2>Discover and share your favorite beer.</h2>
                  <div role='button' className={styles.button} onClick={showSignUpForm}>
                    Join Today!
                  </div>
              </div>
          </div>
        </div>
        <SearchSection />
          <div className={styles.feature_container} >
            <div className={styles.feature}>
              Ratings
              <div className={styles.inner_feature}>

              </div>
              <h3>CHECK IN AND RATE BEER </h3>
              <h4>Keep track of what you’ve tried and what you thought of it by checking in a beer and rating it.</h4>
            </div>
            <div className={styles.feature}>
              Badges
              <div className={styles.inner_feature}>
              </div>
              <h3>DRINK NEW BEERS, UNLOCK BADGES</h3>
              <h4>Expand your palate by trying new & different beer styles and unlock achievements along the way.</h4>
            </div>
          </div>
        <div className={styles.other_feature_container} >
          <h2>Other Great Features</h2>
            <div className={styles.feature_container} >
            <div className={styles.feature}>
              <div className={styles.inner_feature}>
              </div>
              <h3>FRIENDS</h3>
              <h4>Make friends and stay in touch with what you and your crew are drinking!</h4>
            </div>
            <div className={styles.feature}>
              <div className={styles.inner_feature}>
              </div>
              <h3>FAVORITES</h3>
              <h4>Save your most liked beers and breweries to your Favorites!</h4>
            </div>
            <div className={styles.feature}>
              <div className={styles.inner_feature}>
              </div>
              <h3>AWS UPLOADS</h3>
              <h4>FullyTappd utilizes Amazon Web services to securely store and deliver your images.</h4>
            </div>
          </div>
        </div>
        <div className={styles.claim_container}>
          <h2>Work for a brewery? View insights and engage with customers.</h2>
          <div role='button' className={styles.claim_button} onClick={showSignUpForm}>
            Claim your Brewery Today! <i className="fa-solid fa-angle-right"></i>
          </div>
        </div>
        <div className={styles.business_container} >
            <div className={styles.feature}>
              Brewhub Image
              <div className={styles.brewhub}>
              </div>
            </div>
            <div className={styles.business_feature}>
              <h2>FullyTappd for Business</h2>
              <h4>One Location to view all your brewery insights.</h4>
              <p></p>
              <ul className={styles.list}>
                <li>Quickly share your beer menus with the world</li>
                <li>Maximize visibility to drive new customers to your venue</li>
                <li>Easily create contactless menus</li>
                <li>Analytics to help you make data-driven decisions</li>
              </ul>
            </div>
          </div>
      </>
  )
}
