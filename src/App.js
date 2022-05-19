import { BrowserRouter, Switch, Route } from "react-router-dom";
import Header from "./components/Header";
import Nav from './components/Nav';
import Dashboard from './pages/Dashboard';
import Register from "./pages/Register";
import FeaturedUpdates from "./components/FeaturedUpdates";
import FeaturedUpdate2 from "./components/FeaturedUpdate2";
import Socials from './components/Socials';
import Login from "./pages/Login";
import Profile from './pages/Profile';
import AuthProvider, {} from './context/auth';
import PrivateRoute from "./components/PrivateRoute";

import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';


const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 1024 },
    items: 5,
  },
  desktop: {
    breakpoint: { max: 1024, min: 768 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 768, min: 640 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 640, min: 0 },
    items: 1,
  },
};

function App() {

  const customleftarrow = (
    <div className="absolute arrow-btn left-0 text-center py-3 cursor-pointer bg-white rounded-full">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-black w-full" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
      </svg>
    </div>
  );

  const customrightarrow = (
    <div className="absolute arrow-btn right-0 text-center py-3 cursor-pointer bg-white rounded-full">
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-black w-full" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
      </svg>
    </div>
  );


  return (
    <AuthProvider>
      <BrowserRouter>
        <Header />
        <Nav />
        <Switch>
          <Route exact path="/register" component={Register}  />
          <Route exact path="/login" component={Login}  />
          <PrivateRoute exact path="/dashboard" component={Dashboard}  />
          <PrivateRoute exact path="/profile" component={Profile}  />

        </Switch>
        <div className='mb-8 carousel'>
          <Carousel infinite customleftarrow={customleftarrow} customrightarrow={customrightarrow} responsive={responsive} itemClass="px-4">
            <FeaturedUpdates />
              <div className="text-white">
                <FeaturedUpdate2 />
              </div>
          </Carousel>
        </div>

        <div className='grid grid-cols-1 lg:grid-cols-12 gap-12'>
          <div className='lg:col-span-8 col-span-1'></div>

          <div>
            <div className="lg:sticky relative center top-8 ">
              <Socials />
            </div>
          </div>

        </div>
    </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
