import React from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import styles from "./Navbar.module.css";

const NavBar = () => {
    const sessionUser = useSelector((state) => state.session.user);

    const dispatch = useDispatch();

    const showLoginForm = () => {
        dispatch(setCurrentModal(LoginForm));
        dispatch(showModal());
    };

    const showSignUpForm = () => {
        dispatch(setCurrentModal(SignUpForm));
        dispatch(showModal());
    };

    // const showSearchForm = () => {
    //     dispatch(setCurrentModal(SearchSection));
    //     dispatch(showModal());
    // };

    if (sessionUser) {
        return (
            <nav className={styles.container}>
                <div className={styles.logo}>
                    <NavLink to="/" exact={true} className={styles.home_link}>
                        {/* <Logo />  */}
                        <span>FullyTappd</span>
                    </NavLink>
                </div>
                <div className={styles.right}>
                    <div className={styles.profile_icon}>
                        {/* <ProfileDropdown /> */}
                        Profile Icon
                    </div>
                </div>
            </nav>
        );
    } else {
        return (
            <nav className={styles.container}>
                <div className={styles.logo}>
                    <NavLink
                        to="/"
                        exact={true}
                        className={styles.home_link}
                        activeClassName="active"
                    >
                        {/* <Logo /> */}
                        <span>FullyTappd</span>
                    </NavLink>
                </div>
                <div className={styles.right}>
                    <div>
                        <div className={styles.signin} onClick={showLoginForm}>
                            Log In
                        </div>
                    </div>
                    <div>
                        <div className={styles.signup} onClick={showSignUpForm}>
                            Sign Up
                        </div>
                    </div>
                </div>
            </nav>
        );
    }
};
