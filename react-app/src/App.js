import React, { useState, useEffect } from "react";
import { useDispatch, useSelector} from "react-redux";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import NavBar from "./components/NavBar";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import { authenticate } from "./store/session";
import { PageWrapper } from "../src/components/PageWrapper";
import Modal from "./components/Modal/Modal";
import { Splashpage } from "./components/Splashpage";
import { SingleBrewery } from "./components/Breweries/SingleBrewery";
import { CreateBrewery } from "./components/Breweries/CreateBrewery";
import SearchResults from "./components/Search/SearchResults";
// import { CreateBeer } from "./components/Beer/CreateBeer";
import BreweriesList from "./components/Breweries/BreweriesList";
import BeerList from "./components/Beer/BeerList";
import { SingleBeer } from "./components/Beer/SingleBeer";
import { Footer } from "./components/Footer";
import ErrorPage from "./components/ErrorPage";
// import ActivityPage from "./components/ActivityPage";
// import ProfilePage from "./components/ProfilePage";
import Brewhub from "./components/Brewhub";
// import SignUpPage from "./components/SignUpPage";
// import SplashConditional from "./components/Splashpage/SplashConditional";
import BrewhubConditional from "./components/Brewhub/BrewhubConditional";
import { receiveBreweries } from "./store/breweries";
import { receiveBeer } from "./store/beer";
// import ActivityConditional from "./components/ActivityPage/ActivityConditional";

function App() {
    const [loaded, setLoaded] = useState(false);
    const dispatch = useDispatch();
    const sessionUser = useSelector((state) => state.session.user);

    useEffect(() => {
        (async () => {
            await dispatch(receiveBreweries());
            await dispatch(receiveBeer());
            await dispatch(authenticate());
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
                    {/* <ActivityConditional exact path="/activity" >
                        <ActivityPage />
                    </ActivityConditional> */}
                    {/* <Route exact path="/profiles/:id" >
                        <ProfilePage />
                    </Route> */}
                    <BrewhubConditional exact path="/brewhub" >
                        <Brewhub />
                    </BrewhubConditional>
                    {!sessionUser
                    ?
                    <Route exact path="/" >
                        <Splashpage />
                    </Route>
                    :
                    <Route exact path="/" >
                        <BreweriesList />
                    </Route> }
                    <Route exact path="/breweries" >
                        <BreweriesList />
                    </Route>
                    <Route exact path="/beer" >
                        <BeerList />
                    </Route>
                    <ProtectedRoute exact path="/new-brewery">
						<CreateBrewery />
					</ProtectedRoute>
                    <Route exact path="/search/:searchWord">
						<SearchResults />
					</Route>
                    <Route>
						<ErrorPage path="*" />
					</Route>
                </Switch>
                <Footer />
            </PageWrapper>
        </BrowserRouter>
    );
}

export default App;
