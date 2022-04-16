import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { hideModal } from "../../store/modal";
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
    const [bio, setBio] = useState("");
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
            bio,
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
        return <Redirect to="/" />;
    }

    return (
        <div className={styles.parent}>
            <div className={styles.info}>
                <h1>FullyTappd</h1>
                <div className={styles.drink}>DRINK SOCIALLY</div>
                <p></p>
            </div>
            <form className={styles.signup_form}>
                <div>
                    {errors.map((error, ind) => (
                        <div key={ind}>{error}</div>
                    ))}
                </div>
                <div className={styles.fields}>
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
                    <div className={styles.field_row}>
                        <div className={styles.field}>
                            <input
                                className={styles.input}
                                placeholder='First Name'
                                type="text"
                                name="first_name"
                                onChange={(e) => setFirstName(e.target.value)}
                                value={first_name}
                            ></input>
                        </div>
                        <div className={styles.field}>
                            <input
                                className={styles.input}
                                placeholder='Last Name'
                                type="text"
                                name="last_name"
                                onChange={(e) => setLastName(e.target.value)}
                                value={last_name}
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
                        <label>Password</label>
                        <input
                            type="password"
                            name="password"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            ></input>
                    </div>
                    <div>
                        <label>Confirm Password</label>
                        <input
                            type="password"
                            name="confirm_password"
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            value={confirm_password}
                            required={true}
                        ></input>
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
                        <label>Bio</label>
                        <input
                            type="text"
                            name="bio"
                            onChange={(e) => setBio(e.target.value)}
                            value={bio}
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
