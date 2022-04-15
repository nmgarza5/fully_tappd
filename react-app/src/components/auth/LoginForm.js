import React, { useState } from "react";
import modal_bottles from "../../images/modal_bottles.png"
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { login } from "../../store/session";
import SignUpForm from "./SignUpForm";
import { setCurrentModal, hideModal } from "../../store/modal";
import styles from "./Auth.module.css";

const LoginForm = () => {
    const [errors, setErrors] = useState([]);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const user = useSelector((state) => state.session.user);
    const dispatch = useDispatch();

    const onLogin = async (e) => {
        e.preventDefault();
        const data = await dispatch(login(username, password));
        if (data) {
            setErrors(data);
        }
        dispatch(hideModal());
    };

    const loginDemo = async (e) => {
		e.preventDefault();
		const data = await dispatch(login("keith-stone", "password"));
		if (data) return setErrors(data);
		dispatch(hideModal());
	};

    const showSignUpForm = () => {
		dispatch(setCurrentModal(SignUpForm));
	};

    if (user) {
        return <Redirect to="/" />;
    }

    return (
        <div className={styles.parent}>
            <div className={styles.info}>
                <img src={modal_bottles} alt="bottles" className={styles.bottles}/>
                <h2>FullyTappd</h2>
                <p></p>
            </div>
            <h4>Welcome back! Please login.</h4>
            <form className={styles.form_element}>
                {errors.length > 0 && (
                    <div className={styles.error_container}>
                        {errors.map((error, i) => (
                            <div key={i}>{error}</div>
                        ))}
                    </div>
                )}
                <div className={styles.fields}>
                    <div >
                        <label htmlFor="username" >Username</label>
                        <input
                            name="username"
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                        <input
                            name="password"
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                </div>
                <div className={styles.button_container}>
                    <div
                        className={styles.button}
                        onClick={onLogin}
                    >
                        Login
                    </div>
                    <div
                        className={styles.button}
                        onClick={loginDemo}
                    >
                        Demo User
                    </div>
                </div>
				<div>
                    Don't have an account?
                    <div  className={styles.signup} onClick={showSignUpForm}>
                    Sign Up!
                    </div>
				</div>
            </form>
        </div>
    );
};

export default LoginForm;
