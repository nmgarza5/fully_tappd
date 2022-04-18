import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import NavBar from "./components/NavBar";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import { authenticate } from "./store/session";
import { receiveBreweries } from "./store/breweries";
import { receiveBeer } from "./store/beer";
import { PageWrapper } from "../src/components/PageWrapper";
import Modal from "./components/Modal/Modal";
import { Splashpage } from "./components/Splashpage";
import { SingleBrewery } from "./components/SingleBrewery";
import { CreateBrewery } from "./components/CreateBrewery";
import { CreateBeer } from "./components/Beer/CreateBeer";
import BreweriesList from "./components/BreweriesList";
import BeerList from "./components/Beer/BeerList";
import { SingleBeer } from "./components/Beer/SingleBeer";
import { Footer } from "./components/Footer";
import ErrorPage from "./components/ErrorPage";
import ActivityPage from "./components/ActivityPage";
import ProfilePage from "./components/ProfilePage";
import Brewhub from "./components/Brewhub";
import SignUpPage from "./components/SignUpPage";
import SplashConditional from "./components/Splashpage/SplashConditional";

function App() {
    const [loaded, setLoaded] = useState(false);
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);
    useEffect(() => {
        (async () => {
            await dispatch(authenticate());
            await dispatch(receiveBreweries())
            await dispatch(receiveBeer())
            setLoaded(true);
        })();
    }, [dispatch]);

    if (!loaded) {
        return null;
    }

    return (
        <BrowserRouter>
            <PageWrapper>

                {sessionUser && <NavBar /> }
                <Modal />
                <Switch>
                    <Route exact path="/sign-up">
						<SignUpPage />
					</Route>
                    <Route exact path="/breweries/:id">
						<SingleBrewery />
					</Route>
                    <Route exact path="/beer/:id">
						<SingleBeer />
					</Route>
                    <Route exact path="/activity" >
                        <ActivityPage />
                    </Route>
                    <Route exact path="/my-profile" >
                        <ProfilePage />
                    </Route>
                    <Route exact path="/brewhub" >
                        <Brewhub />
                    </Route>
                    <SplashConditional exact path="/" >
                        <Splashpage />
                    </SplashConditional>
                    <Route exact path="/breweries" >
                        <BreweriesList />
                    </Route>
                    <Route exact path="/beer" >
                        <BeerList />
                    </Route>
                    <ProtectedRoute exact path="/new-brewery">
						<CreateBrewery />
					</ProtectedRoute>
                    <ProtectedRoute exact path="/new-beer">
						<CreateBeer />
					</ProtectedRoute>
                    <Route>
						<ErrorPage />
					</Route>
                </Switch>
                <Footer />
            </PageWrapper>
        </BrowserRouter>
    );
}

export default App;
