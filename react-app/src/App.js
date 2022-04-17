import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";
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
import BusinessUserForm from "./components/auth/BusinessUserForm";

function App() {
    const [loaded, setLoaded] = useState(false);
    const dispatch = useDispatch();

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
                <NavBar />
                <Modal />
                <Switch>
                    <Route exact path="/breweries/:id">
						<SingleBrewery />
					</Route>
                    <Route exact path="/beer/:id">
						<SingleBeer />
					</Route>
                    <Route exact path="/" >
                        <Splashpage />
                    </Route>
                    <Route exact path="/breweries" >
                        <BreweriesList />
                    </Route>
                    <Route exact path="/beer" >
                        <BeerList />
                    </Route>
                    <Route exact path="/new-business">
						<BusinessUserForm />
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
