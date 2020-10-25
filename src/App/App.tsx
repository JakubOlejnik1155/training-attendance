import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Login from './Routes/Login';
import Register from './Routes/SignUp';
import WelcomeSection from './Routes/WelcomeSection';
import ForgotPass from './Routes/ForgotPass';
import Dashboard from './Routes/Dashboard';
import PrivateRoute from './Routes/Components/PrivateRoute';
import Competitors from './Routes/Components/Competitors';
import CompetitorData from './Routes/CompetitorData';


const App = () => {

  const routes = (
    <Switch>
      <PrivateRoute path="/dashboard" exact component={Dashboard}></PrivateRoute>
      <PrivateRoute path="/competitors" exact component={Competitors}></PrivateRoute>
      <PrivateRoute path="/competitor/:comp" component={CompetitorData}></PrivateRoute>
      <Route path="/" exact> <WelcomeSection /></Route>
      <Route path="/login" exact><Login /></Route>
      <Route path="/forgot-password" exact> <ForgotPass /> </Route>
      <Route path="/register" exact> <Register /></Route>
    </Switch>
  )
  return (
    <>
      {routes}
    </>
  );
}

export default App;
