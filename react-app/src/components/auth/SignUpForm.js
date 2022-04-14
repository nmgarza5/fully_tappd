import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { hideModal } from "../../store/modal";
import { Redirect } from "react-router-dom";
import { signUp } from "../../store/session";
import styles from "./Auth.module.css"

const SignUpForm = () => {
    const user = useSelector((state) => state.session.user);

    const [errors, setErrors] = useState([]);
    const [username, setUsername] = useState("");
    const [first_name, setFirstName] = useState("");
    const [last_name, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirm_password, setConfirmPassword] = useState("");
    const [profile_image, setProfilePicture] = useState("");
    const [header, setHeader] = useState("");
    const [bio, setBio] = useState("");
    const dispatch = useDispatch();

    const handleClick = async (e) => {
        e.preventDefault();
        const userData = {
            username,
            first_name,
            last_name,
            email,
            password,
            confirm_password,
            header,
            bio,
            profile_image,
        };

        if (password === confirm_password) {
            console.group("PASSOWRD MATCH");
            const data = await dispatch(signUp(userData));
            if (data) {
                setErrors(data);
            }
            dispatch(hideModal());
        }
    };

    if (user) {
        return <Redirect to="/" />;
    }

    return (
        <div className={styles.parent}>
            <h4>Welcome to FullyTappd!</h4>
            <form className={styles.signup_form}>
                <div>
                    {errors.map((error, ind) => (
                        <div key={ind}>{error}</div>
                    ))}
                </div>
                <div className={styles.fields}>
                    <div>
                        <label>User Name</label>
                        <input
                            type="text"
                            name="username"
                            onChange={(e) => setUsername(e.target.value)}
                            value={username}
                        ></input>
                    </div>
                    <div>
                        <label>First Name</label>
                        <input
                            type="text"
                            name="first_name"
                            onChange={(e) => setFirstName(e.target.value)}
                            value={first_name}
                        ></input>
                    </div>
                    <div>
                        <label>Last Name</label>
                        <input
                            type="text"
                            name="last_name"
                            onChange={(e) => setLastName(e.target.value)}
                            value={last_name}
                        ></input>
                    </div>
                    <div>
                        <label>Email</label>
                        <input
                            type="text"
                            name="email"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                        ></input>
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
                        <label>Profile Picture</label>
                        <input
                            type="text"
                            name="profile_image"
                            onChange={(e) => setProfilePicture(e.target.value)}
                            placeholder="Please enter the url to your Profile Picture"
                            value={profile_image}
                            ></input>
                    </div>
                    <div role='button' onClick={handleClick} className={styles.div_button}>Sign Up</div>
                </div>
            </form>
        </div>
    );
};

export default SignUpForm;
