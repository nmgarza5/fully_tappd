import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setCurrentModal, hideModal } from "../../store/modal";
import { Redirect } from "react-router-dom";
import { signUp } from "../../store/session";
import styles from "./SignUpForm.module.css"
import DatePicker from 'react-date-picker';

const SignUpForm = () => {
    const user = useSelector((state) => state.session.user);

    const [errors, setErrors] = useState([]);
    const [username, setUsername] = useState("");
    const [first_name, setFirstName] = useState("");
    const [last_name, setLastName] = useState("");
    const [birthdate, setBirthdate] = useState(new Date());
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirm_password, setConfirmPassword] = useState("");
    const [banner_image, setBannerImage] = useState("");
    const [profile_image, setProfileImage] = useState("");
    const [header, setHeader] = useState("");
    // const [bio, setBio] = useState("");
    const dispatch = useDispatch();

    const handleClick = async (e) => {
        e.preventDefault();
        const userData = {
            username,
            first_name,
            last_name,
            birthdate,
            email,
            password,
            confirm_password,
            header,
            // bio,
            profile_image,
			banner_image
        };

        if (password === confirm_password) {
            console.group("PASSOWRD MATCH");
            const data = await dispatch(signUp(userData));
            if (data) {
                setErrors(data);
            }
            else {
                dispatch(hideModal());
            }
        }
    };

    if (user) {
        return <Redirect to="/activity" />;
    }

    const showSignUpForm = () => {
		dispatch(setCurrentModal(SignUpForm));
	};

    return (
        <div className={styles.parent}>
            <div className={styles.info}>
                <h1>FullyTappd</h1>
                <div className={styles.drink}>DRINK SOCIALLY</div>
                <p></p>
                <div className={styles.brewery_signup}>
                    <div className={styles.smallish_text}>
                    Are you a brewery that's trying to get added to Untappd, claim and manage your brewery page?
                    </div>
                    <div  className={styles.signup} onClick={showSignUpForm}>Click Here!</div>
                </div>
            </div>
            <form className={styles.signup_form}>
                <div>
                    {errors.map((error, ind) => (
                        <div key={ind}>{error}</div>
                    ))}
                </div>
                <div className={styles.fields}>
                    <div className={styles.small_text}>All fields below are required unless specified.</div>
                    <div className={styles.field_row}>
                        <div className={styles.field}>
                            <i className="fa-solid fa-user"></i>
                            <input
                                className={styles.input}
                                type="text"
                                name="username"
                                onChange={(e) => setUsername(e.target.value)}
                                placeholder='Username'
                                >
                            </input>
                        </div>
                        <div className={styles.field}>
                            <i className="fa-solid fa-envelope"></i>
                            <input
                                className={styles.input}
                                type="text"
                                name="email"
                                placeholder='Email'
                                onChange={(e) => setEmail(e.target.value)}
                            ></input>
                        </div>
                    </div>
                    <div className={styles.small_text}>Avoid using common words and include a mix of letters and numbers.</div>
                    <div className={styles.field_row}>
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
                        <div className={styles.field}>
                            <i className="fa-solid fa-lock"></i>
                            <input
                                className={styles.input}
                                placeholder=" Confirm Password"
                                type="password"
                                name="confirm_password"
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                value={confirm_password}
                                required={true}
                            ></input>
                        </div>
                    </div>
                    <div className={styles.field_row}>
                        <div className={styles.field}>
                            <i className="fa-brands fa-untappd"></i>
                            <input
                                className={styles.input}
                                placeholder='First Name'
                                type="text"
                                name="first_name"
                                onChange={(e) => setFirstName(e.target.value)}
                            ></input>
                        </div>
                        <div className={styles.field}>
                            <i className="fa-brands fa-untappd"></i>
                            <input
                                className={styles.input}
                                placeholder='Last Name'
                                type="text"
                                name="last_name"
                                onChange={(e) => setLastName(e.target.value)}
                            ></input>
                        </div>
                    </div>
                    <div>
                        <label>Birthdate</label>
                        <DatePicker
                        onChange={setBirthdate}
                        value={birthdate}
                        format="MM-yyyy"
                        required='true'

                         />
                    </div>
                    <div>
                        <label>Header</label>
                        <input
                            type="text"
                            name="header"
                            onChange={(e) => setHeader(e.target.value)}
                            value={header}
                            required={true}
                        ></input>
                    </div>
                    <div>
                        <label>Profile Image</label>
                        <input
                            type="text"
                            name="profile_image"
                            onChange={(e) => setProfileImage(e.target.value)}
                            placeholder="Please enter the url to your Profile Picture"
                            value={profile_image}
                            ></input>
                    </div>
                    <div>
                        <label>Banner Image</label>
                        <input
                            type="text"
                            name="banner_image"
                            onChange={(e) => setBannerImage(e.target.value)}
                            placeholder="Please enter the url to your Profile Picture"
                            value={banner_image}
                            ></input>
                    </div>
                    <div role='button' onClick={handleClick} className={styles.button}>Sign Up</div>
                </div>
            </form>
        </div>
    );
};

export default SignUpForm;
