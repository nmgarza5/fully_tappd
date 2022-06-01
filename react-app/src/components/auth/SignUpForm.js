import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { hideModal } from "../../store/modal";
import { useHistory } from "react-router-dom";
import { signUp } from "../../store/session";
import { login } from "../../store/session";
import styles from "./SignUpForm.module.css"
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"
import 'react-datepicker/dist/react-datepicker-cssmodules.css';


const SignUpForm = () => {
    const history = useHistory()
    const [errors, setErrors] = useState([]);
    const [business_user, setBusinessUser] = useState(false);
    const [username, setUsername] = useState("");
    const [first_name, setFirstName] = useState("");
    const [last_name, setLastName] = useState("");
    const [birthdate, setBirthdate] = useState(new Date());
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirm_password, setConfirmPassword] = useState("");
    const [image, setImage] = useState(null);
    const [imageLoading, setImageLoading] = useState(false);
    const dispatch = useDispatch();

    const handleClick = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('name', 'NAME')
        formData.append('username', username)
        formData.append('first_name', first_name)
        formData.append('last_name', last_name)
        formData.append('business_user', business_user)
        formData.append('birthdate', birthdate)
        formData.append('email', email)
        formData.append('password', password)
        formData.append('confirm_password', confirm_password)
        formData.append('image', image)
        setImageLoading(true);

        if (password === confirm_password) {
            const data = await dispatch(signUp(formData));
            if (data.errors) {
                setImageLoading(false);
                setErrors(data.errors[0]);
                return
            }
            if (data?.payload?.business_user === true) {
                setImageLoading(false);
                history.push('/new-brewery')
                return dispatch(hideModal());

            }
            else {
                setImageLoading(false);
                history.push('/breweries')
                return dispatch(hideModal());
            }
        } else {
            setErrors(["Passwords do not match"])
        }
    };

    const loginBusinessDemo = async (e) => {
		e.preventDefault();
		const data = await dispatch(login("keith-stone", "password"));
		if (data.errors) {
            return setErrors(data.errors)
        }
		else {
            await dispatch(hideModal());
            history.push('/brewhub')
        }
	};

    const loginStandardDemo = async (e) => {
		e.preventDefault();
		const data = await dispatch(login("keith-stone2", "password"));
		if (data.errors) {
            return setErrors(data.errors)
        }
		else {
            await dispatch(hideModal());
            history.push('/breweries')
        }
	};

    const closeModal = () => {
        dispatch(hideModal())
    }

    const updateImage = (e) => {
        const file = e.target.files[0];
        setImage(file);
    }

    return (
        <div className={styles.parent}>
            <div className={styles.info}>
                <h1>FullyTappd</h1>
                <div className={styles.drink}>DRINK SOCIALLY</div>
                <p></p>
                <div className={styles.brewery_signup}>
                    <div className={styles.smallish_text}>
                    Are you a brewery that's trying to get added to FullyTappd, claim and manage your brewery page?
                    </div>
                    <label>
                        <input type="checkbox" onChange={() => setBusinessUser(!business_user)} />
                        Check the box if yes!
                    </label>
                </div>
            </div>
            <form className={styles.signup_form}>
                <div>
                    {errors.length > 1 && <div className={styles.errors}>{errors?.charAt(0)?.toUpperCase() + errors?.slice(1)?.replace("_", " ")}</div> }
                </div>
                <div className={styles.fields}>
                    <div className={styles.upper_fields}>
                        <div className={styles.small_text}>All fields below are required.</div>
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
                    </div>
                    <div className={styles.lower_container}>
                        <div className={styles.small_text}>You must be over the age of 21 to sign up for FullyTappd.</div>
                        <div className={styles.date}>
                            <label>Birthdate</label>
                            <DatePicker
                            className={styles.calendar}
                            selected={birthdate}
                            placeholder='Example: 12/12/1994'
                            value={birthdate}
                            required={true}
                            onChange={(date) => setBirthdate(date)} />
                        </div>
                        <div className={styles.lower_field}>
                            <label>Profile Image</label>
                            {/* <input
                            className={styles.lower_input}
                                type="text"
                                name="profile_image"
                                onChange={(e) => setProfileImage(e.target.value)}
                                placeholder="Please enter the url to your Profile Image"
                                value={profile_image}
                                ></input> */}
                                <input
                                className={styles.lower_input}
                                type="file"
                                accept="image/*"
                                onChange={updateImage}
                                />
                                {(imageLoading)&& <p>Loading...</p>}
                        </div>
                        {/* <div className={styles.lower_field}>
                            <label>Header</label>
                            <input
                            className={styles.lower_input}
                                type="text"
                                name="header"
                                onChange={(e) => setHeader(e.target.value)}
                                value={header}
                                placeholder="Write a short header for your Profile (Optional)"
                                required={true}
                                ></input>
                        </div> */}
                    </div>
                    <div className={styles.button_container}>
                        <div role='button' onClick={handleClick} className={styles.button}>Create Account</div>
                        <div className={styles.button} onClick={closeModal} >Cancel</div>
                    </div>
                    <div className={styles.lower}>
                        Or
                        <div className={styles.demo}>
                            Demo as a
                            <div
                                className={styles.demo_click}
                                onClick={loginBusinessDemo}
                            >
                                Business User
                            </div>
                            or
                            <div
                                className={styles.demo_click}
                                onClick={loginStandardDemo}
                            >
                                Standard User
                            </div>
                        </div>
				    </div>
                </div>
            </form>
        </div>
    );
};

export default SignUpForm;
