import { BrowserRouter, Switch, Route } from "react-router-dom";
import Header from "./components/Header";
import Dashboard from './pages/Dashboard';
import Register from "./pages/Register";
import Login from "./pages/Login";
import Profile from './pages/Profile';
import AuthProvider, {} from './context/auth';
import PrivateRoute from "./components/PrivateRoute";



function App() {
  return (
    <AuthProvider>
    <BrowserRouter>
    <Header />
      <Switch>
      <Route exact path="/register" component={Register}  />
      <Route exact path="/login" component={Login}  />
      <PrivateRoute exact path="/dashboard" component={Dashboard}  />
      <PrivateRoute exact path="/profile" component={Profile}  />

      </Switch>
     
    </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
