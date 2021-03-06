import styles from './Splashpage.module.css'
import { useDispatch } from 'react-redux'
import { showModal, setCurrentModal } from "../../store/modal";
import SignUpForm from "../auth/SignUpForm";
import SearchSection from '../Search/SearchSection'
import brewhub from "../../images/brewhub.png"


import banner from "../../images/beer-toast.jpg"
import bottles from "../../images/bottles.png"
import defaultImage from "../../images/default_image.png"
import aws from "../../images/aws.png"
import ratings from "../../images/review_rating.png"
import search from "../../images/search_feature.png"
import likes from  "../../images/likes.png"

export const Splashpage = () => {
  const dispatch = useDispatch();

  const showSignUpForm = () => {
    dispatch(setCurrentModal(SignUpForm));
    dispatch(showModal());
  };

const addDefaultImage = (e) => {
  e.target.src = defaultImage
}


  return (
      <>
        <div className={styles.banner_container}>
          <img src={banner} alt="Toast!" className={styles.banner} onError={addDefaultImage}/>
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
              <img className={styles.inner_feature} src={ratings} alt="ratings"></img>
              <h3>CHECK IN AND RATE BEER </h3>
              <h4>Keep track of what you’ve tried and what you thought of it by checking in a beer and rating it.</h4>
            </div>
            {/* <div className={styles.feature}>
              Badges
              <div className={styles.inner_feature}>
              </div>
              <h3>DRINK NEW BEERS, UNLOCK BADGES</h3>
              <h4>Expand your palate by trying new & different beer styles and unlock achievements along the way.</h4>
            </div> */}
          </div>
        <div className={styles.other_feature_container} >
          <h2>Other Great Features</h2>
            <div className={styles.feature_container}>
            {/* <div className={styles.feature}>
              <div className={styles.inner_feature}>
              </div>
              <h3>FRIENDS</h3>
              <h4>Make friends and stay in touch with what you and your crew are drinking!</h4>
            </div> */}
            <div className={styles.feature}>
            <img className={styles.inner_feature} src={likes} alt="likes"></img>
              <h3>Likes</h3>
              <h4>Like all of your favorite beers and breweries!</h4>
            </div>
            <div className={styles.feature}>
            <img className={styles.inner_feature} src={search} alt="search"></img>
              <h3>Search</h3>
              <h4>Search for beers, breweries, or beer styles!</h4>
            </div>
            <div className={styles.feature}>
            <img className={styles.inner_feature} src={aws} alt="aws"></img>
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
              <img  src={brewhub}className={styles.brewhub} alt="" onError={addDefaultImage}/>
            </div>
            <div className={styles.business_feature}>
              <h2>FullyTappd for Business</h2>
              <h4>One Location to access your brewery.</h4>
              <p></p>
              <ul className={styles.list}>
                <li>Update or Delete your current Brewery</li>
                <li>Select and preview your beer information</li>
                <li>Create, Update, and Delete your Beers</li>
              </ul>
            </div>
          </div>
      </>
  )
}
