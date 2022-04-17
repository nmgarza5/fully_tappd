import { useHistory } from 'react-router-dom'
// import {PageContainer} from '../PageContainer'
import styles from './Splashpage.module.css'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { showModal, setCurrentModal } from "../../store/modal";
import SignUpForm from "../auth/SignUpForm";
import SearchSection from '../SearchSection'


import banner from "../../images/beer-toast.jpg"
import bottles from "../../images/bottles.png"

export const Splashpage = () => {
  const [searchQuery, setSearchQuery] = useState("");
	const history = useHistory();
  const dispatch = useDispatch();

  const showSignUpForm = () => {
    dispatch(setCurrentModal(SignUpForm));
    dispatch(showModal());
  };

  const handleSubmit = (e) => {
		e.preventDefault();

		if (searchQuery.includes("%")) {
			alert(
				`Please do not use the "percent" symbol in your search query.`
			);
			setSearchQuery("");
		} else if (searchQuery) {
			history.push(`/search/${searchQuery}`);
		} else {
			alert(`Please enter a search query.`);
		}
		return;
	};


  return (
      <>
        <div className={styles.banner_container}>
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
        {/* <div className={styles.search_container}>
          <div className={styles.search_button}>
              <i className="fa-solid fa-magnifying-glass"></i>
              <form>
                <input
                  className={styles.search_box_field}
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search"
                  ></input>
                <div onClick={handleSubmit} className={styles.search_button}>
                  Let's Go
                </div>
              </form>
          </div>
        </div> */}
        <SearchSection />
      </>
  )
}
