import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { login } from "../../store/session";
import { hideModal } from "../../store/modal";

const LoginForm = () => {
    const [errors, setErrors] = useState([]);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const user = useSelector((state) => state.session.user);
    const dispatch = useDispatch();

    const handleClick = async (e) => {
        e.preventDefault();
        const data = await dispatch(login(username, password));
        if (data) {
            setErrors(data);
        }
        dispatch(hideModal());
    };

    if (user) {
        return <Redirect to="/" />;
    }

    return (
        <form >
            <div>
                {errors.map((error, ind) => (
                    <div key={ind}>{error}</div>
                ))}
            </div>
            <div>
                <label htmlFor="username">Username</label>
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
                <div role='button' onClick={handleClick}>Login</div>
            </div>
        </form>
    );
};

export default LoginForm;
