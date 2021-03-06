import React, { useState } from 'react';
import { Route, Switch } from 'react-router-dom';
// components
import Navbar from './components/navbar';
import Home from './components/home';
import UserHackathons from './components/UserHackathons';
import "./scss/App.scss";
import "./carousel.css";
import PrivateRoute from './PrivateRoute';
import Footer from './components/Footer';
import { loginData, signupData } from './utils/loginSignupFormData';
import LoginSignup from './components/login-signup';
import CreateHackathonForm from './components/CreateHackathonForm';
import ProfileMenu from './components/profile/ProfileMenu';
import HackathonView from './components/HackathonView';
import AllHackathons from './components/explore/AllHackathons';
import useAuthentication from './utils/useAuthentication';
import { UserContext } from './contexts/UserContext';
import SearchPage from './components/search/SearchPage';
import ProjectForm from './components/projects/ProjectForm';
import ProjectApproval from './components/projects/ProjectApproval';
import ProjectSubmissions from './components/projects/ProjectSubmissions';
import PendingAll from './components/projects/PendingAll';



const App = props => {
    const [returnTo, setReturnTo] = useState(window.location.pathname)
    const [user, setUser] = useAuthentication()
    console.log(returnTo)

  function updateUser(userObject) {
    setUser(userObject)
  } 

    return (
      <UserContext.Provider value={{ user, setUser }}>
      <div className="App">
        <Navbar 
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
              returnTo={returnTo} 
              setReturnTo={setReturnTo}

            />}
        />
        <PrivateRoute path='/approve/:hackathon_id' 
          component={ProjectApproval} />
        <PrivateRoute
          exact
          path='/project'
          component={ProjectForm} />
        <Route exact 
          path="/signup" 
          render={(props) => 
          <LoginSignup 
              {...props} 
              data={signupData}
              returnTo={returnTo}
              setReturnTo={setReturnTo}
                          />} />
        <Route exact path="/create"
        render={props => (
          <CreateHackathonForm {...props} />
        )} />

          <Route path="/hackathons/:id" component={HackathonView}/>
            
        <Route path="/explore" component={AllHackathons} />
        <Route path="/search" component={SearchPage} />
        <PrivateRoute path='/project-submissions' component={ProjectSubmissions} />
        <PrivateRoute path='/pending/all' component={PendingAll} />
        </Switch>
        </div>
        <Footer />
      </div>
      </UserContext.Provider>
    );
}

export default App;