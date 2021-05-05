import React, {  useEffect, useState, Fragment } from 'react';
import axios from 'axios'
import { Route, Switch } from 'react-router-dom';
// components
import Navbar from './components/navbar';
import Home from './components/home';
import UserHackathons from './components/UserHackathons';
import "./scss/App.scss";
import "./carousel.css";
import { SessionContext } from './contexts/SessionContext';
import PrivateRoute from './PrivateRoute';
import Footer from './components/Footer';
import { loginData, signupData } from './utils/loginSignupFormData';
import LoginSignup from './components/login-signup';
import CreateHackathonForm from './components/CreateHackathonForm';
import Profile from './components/Profile';
import HackathonView from './components/HackathonView';
import AllHackathons from './components/explore/AllHackathons';
import useAuthentication from './utils/useAuthentication';



const App = props => {
    const [returnTo, setReturnTo] = useState(window.location.pathname)
    const [user, setUser] = useAuthentication()


  function updateUser(userObject) {
    setUser(userObject)
  }

    return (
 
      <div className="App">
        <Navbar updateUser={updateUser} 
        user={user}
        setUser={setUser}
        setReturnTo={setReturnTo} />
        {/* Routes to different components */}
        <div className="main-content d-flex flex-column flex-grow-1" role="main">
        <Switch>
        <Route
          exact path="/"
          component={Home} />
       <PrivateRoute
          path="/my-hackathons"
          component={UserHackathons}
        />
        <Route
          path="/login"
          render={(props) =>
            <LoginSignup
              {...props}
              data={loginData}
              updateUser={updateUser}
              setUser={setUser}
              returnTo={returnTo} 
              setReturnTo={setReturnTo}

            />}
        />
        <Route exact 
          path="/signup" 
          render={(props) => 
          <LoginSignup 
              {...props} 
              data={signupData}
              setUser={setUser}
              returnTo={returnTo}
              setReturnTo={setReturnTo}
                          />} />
        <Route exact path="/create"
        render={props => (
          <CreateHackathonForm {...props} />
        )} />

             <Route path="/hackathons/:id" render={(props) => <HackathonView {...props} />}
            />
        <Route path="/explore" component={AllHackathons} />
        <Route path="/profile" render={props => <Profile {...props} loggedIn={user.loggedIn} /> } />
        </Switch>
        </div>
        <Footer />
      </div>
    );
}

export default App;