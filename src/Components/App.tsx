import React from 'react';
import { Switch, Route } from 'react-router-dom';

import Login from './Routes/Login';
import Register from './Routes/SignUp';
import WelcomeSection from './Routes/WelcomeSection';
import ForgotPass from './Routes/ForgotPass';

const App = () => {

  const routes = (
    <Switch>
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
