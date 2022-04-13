import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { signUp } from "../../store/session";

const SignUpForm = () => {
    const user = useSelector((state) => state.session.user);

    const [errors, setErrors] = useState([]);
    const [username, setUsername] = useState("");
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [profilePicture, setProfilePicture] = useState("");
    const [header, setHeader] = useState("");
    const [bio, setBio] = useState("");
    const dispatch = useDispatch();

    const onSignUp = async (e) => {
        e.preventDefault();

        const userData = {
            profilePicture,
            username,
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
            header,
            bio,
        };

        if (password === confirmPassword) {
            const data = await dispatch(signUp(userData));
            if (data) {
                setErrors(data);
            }
        }
    };

    if (user) {
        return <Redirect to="/" />;
    }

    return (
        <form onSubmit={onSignUp}>
            <div>
                {errors.map((error, ind) => (
                    <div key={ind}>{error}</div>
                ))}
            </div>
            <div>
                <label>Profile Picture</label>
                <input
                    type="text"
                    name="username"
                    onChange={(e) => setProfilePicture(e.target.value)}
                    placeholder="Please enter the url to your Profile Picture"
                    value={profilePicture}
                ></input>
            </div>
            <div>
                <label>First Name</label>
                <input
                    type="text"
                    name="firstName"
                    onChange={(e) => setFirstName(e.target.value)}
                    value={firstName}
                ></input>
            </div>
            <div>
                <label>Last Name</label>
                <input
                    type="text"
                    name="lastName"
                    onChange={(e) => setLastName(e.target.value)}
                    value={lastName}
                ></input>
            </div>
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
                    value={confirmPassword}
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
            <button type="submit">Sign Up</button>
        </form>
    );
};

export default SignUpForm;
