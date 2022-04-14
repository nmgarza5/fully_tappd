import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";
import NavBar from "./components/NavBar";
// import ProtectedRoute from "./components/auth/ProtectedRoute";
import { authenticate } from "./store/session";
import { PageWrapper } from "../src/components/PageWrapper";
import Modal from "./components/Modal/Modal";
import { Splashpage } from "./components/Splashpage";
import { receiveBreweries } from "./store/breweries";

function App() {
    const [loaded, setLoaded] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        (async () => {
            await dispatch(authenticate());
            await dispatch(receiveBreweries())
            setLoaded(true);
        })();
    }, [dispatch]);

    if (!loaded) {
        return null;
    }

    return (
        <BrowserRouter>
            <PageWrapper>
                <NavBar />
                <Modal />
                <Switch>
                    <Route exact path="/" >
                        <Splashpage />
                    </Route>
                </Switch>
            </PageWrapper>
        </BrowserRouter>
    );
}

export default App;
