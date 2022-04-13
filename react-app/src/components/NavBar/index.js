import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import LoginForm from "../auth/LoginForm";
import SignUpForm from "../auth/SignUpForm";
import styles from "./NavBar.module.css";

import { showModal, setCurrentModal } from "../../store/modal";
import ProfileDropdown from "../ProfileDropdown"


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
                        <i className="fa-brands fa-untappd"></i>
                        {/* <Logo />  */}
                        <span>FullyTappd</span>
                    </NavLink>
                </div>
                <div className={styles.right}>
                    <div className={styles.profile_icon}>
                        <ProfileDropdown />
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
                        <div role='button' className={styles.signin} onClick={showLoginForm}>
                            Log In
                        </div>
                    </div>
                    <div>
                        <div role='button' className={styles.signup} onClick={showSignUpForm}>
                            Sign Up
                        </div>
                    </div>
                </div>
            </nav>
        );
    }
};

export default NavBar;
