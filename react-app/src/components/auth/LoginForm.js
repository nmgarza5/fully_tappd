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
                <h1>FullyTappd</h1>
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
                    <div className={styles.field}>
                        <i className="fa-solid fa-user"></i>
                        <input
                            className={styles.input}
                            type="text"
                            name="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder='Username'
                            >
                        </input>
                    </div>
                    <div className={styles.field}>
                        <i className="fa-solid fa-lock"></i>
                        <input
                            className={styles.input}
                            placeholder="Password"
                            type="password"
                            name="password"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            ></input>
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
                <div className={styles.grey_line}></div>
				<div>
                    New around here?
                    <div  className={styles.signup} onClick={showSignUpForm}>
                    Sign Up!
                    </div>
				</div>
            </form>
        </div>
    );
};

export default LoginForm;
