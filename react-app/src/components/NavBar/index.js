import React, {useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { NavLink } from "react-router-dom";
import LoginForm from "../auth/LoginForm";
import SignUpForm from "../auth/SignUpForm";
import styles from "./NavBar.module.css";
import SearchSection from "../SearchSection";

import { showModal, setCurrentModal } from "../../store/modal";
import ProfileDropdown from "../ProfileDropdown"


const NavBar = () => {
    const sessionUser = useSelector((state) => state.session.user);
    const dispatch = useDispatch();
    const [searchQuery, setSearchQuery] = useState("");
	const history = useHistory();

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

		// dispatch(hideModal());
		return;
	};

    const showLoginForm = () => {
        dispatch(setCurrentModal(LoginForm));
        dispatch(showModal());
    };

    const showSignUpForm = () => {
        dispatch(setCurrentModal(SignUpForm));
        dispatch(showModal());
    };

    const showSearchForm = () => {
        dispatch(setCurrentModal(SearchSection));
        dispatch(showModal());
    };

    if (sessionUser) {
        return (
            <nav className={styles.container}>
                <div className={styles.left}>
                    {sessionUser && sessionUser.business_user === true ? <NavLink to="/brewhub" exact={true} className={styles.home_link}>
                        <i className="fa-brands fa-untappd"></i>
                        <h1>FullyTappd</h1>
                    </NavLink> :
                    <NavLink to="/" exact={true} className={styles.home_link}>
                        <i className="fa-brands fa-untappd"></i>
                        <h1>FullyTappd</h1>
                     </NavLink> }
                    <NavLink to="/beer" exact={true} className={styles.nav_link}>
                        Beer
                    </NavLink>
                    <NavLink to="/breweries" exact={true} className={styles.nav_link}>
                        Breweries
                    </NavLink>
                </div>
                <div className={styles.right}>
                    <div className={styles.profile_icon}>
                        <ProfileDropdown />
                    </div>
                    <div>
					<input
						className={styles.search_box_field}
						type="text"
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
						placeholder="Search for Breweries or Beers"
					/>
					<i onClick={handleSubmit} className="fa-solid fa-magnifying-glass"></i>
				</div>
                </div>
            </nav>
        );
    } else {
        return (
            <nav className={styles.container}>
                 <div className={styles.left}>
                    <NavLink to="/" exact={true} className={styles.home_link}>
                        <i className="fa-brands fa-untappd"></i>
                        <h1>FullyTappd</h1>
                    </NavLink>
                    <NavLink to="/beer" exact={true} className={styles.nav_link}>
                        Beer
                    </NavLink>
                    <NavLink to="/breweries" exact={true} className={styles.nav_link}>
                        Breweries
                    </NavLink>
                </div>
                <div className={styles.right}>
                    <div>
                        <div role='button' className={styles.button_login} onClick={showLoginForm}>
                            SIGN IN
                        </div>
                    </div>
                    <div>
                        <div role='button' className={styles.button} onClick={showSignUpForm}>
                            CREATE AN ACCOUNT
                        </div>
                    </div>
                </div>
            </nav>
        );
    }
};

export default NavBar;
