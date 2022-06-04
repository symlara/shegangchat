import { BrowserRouter, Switch, Route } from "react-router-dom";
import Header from "./components/Header";
import Nav from './components/Nav';
import Dashboard from './pages/Dashboard';
import Register from "./pages/Register";
import meetups from './pages/meetups/shegang';
import updates from './pages/updates/h.e.r-updates';
import advise from './pages/advise/advise';
import albums from './pages/albums/albums';
import videos from './pages/videos/videos';
import samples from './pages/samples/samples';
// import forgotpassword from './pages/ForgotPasswordPage';
// import Socials from './components/Socials';
import Footer from './components/Footer';
import Login from "./pages/Login";
import Profile from './pages/Profile';
// import ForgotPassword from "./pages/Forgotpassword";
import AuthProvider, {} from './context/auth';
import PrivateRoute from "./components/PrivateRoute";

import Home from './container/Home';



function App() {  

  return (
    <AuthProvider>
      <BrowserRouter>
        <Header />
        <Nav />
       &nbsp;
        <Switch>
          <Route exact path="/register" component={Register}  />
          <Route exact path="/login" component={Login}  />
          <PrivateRoute exact path="/chat" component={Dashboard}  />
          <PrivateRoute exact path="/profile" component={Profile}  />
          {/* <Route exact path="/forgot-password" component={ForgotPassword}  /> */}
          <Route exact path="/meetups/shegang" component={meetups} />
          <Route exact path="/updates/h.e.r-updates" component={updates} />
          <Route exact path="/advise/advise" component={advise} />
          <Route exact path="/albums/albums" component={albums} />
          <Route exact path="/videos/videos" component={videos} />
          <Route exact path="/samples/samples" component={samples} />
          <Route exact path="/*" component={Home} />
          {/* <Route exact path="/forgot-password" component={forgotpassword} /> */}
        </Switch>
       
    </BrowserRouter>
      <Footer />
    </AuthProvider>
    
  );
}

export default App;