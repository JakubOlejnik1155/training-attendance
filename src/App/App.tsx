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
import Calendar from './Routes/Calendar'
import Trainings from './Routes/Trainings';
import { theme } from '../static/theme';

const App = () => {

  const routes = (
    <Switch>
      <PrivateRoute path="/dashboard" exact component={Dashboard}></PrivateRoute>
      <PrivateRoute path="/competitors" exact component={Competitors}></PrivateRoute>
      <PrivateRoute path="/competitor/:comp" component={CompetitorData}></PrivateRoute>
      <PrivateRoute path="/trainings" component={Trainings}></PrivateRoute>
      <PrivateRoute path="/calendar" component={Calendar}></PrivateRoute>
      <Route path="/" exact> <WelcomeSection /></Route>
      <Route path="/login" exact><Login /></Route>
      <Route path="/forgot-password" exact> <ForgotPass /> </Route>
      <Route path="/register" exact> <Register /></Route>
    </Switch>
  )
  return (
    <>
    {navigator.onLine ? routes : (
      <div style={{
        width: '100%',
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20px',
        backgroundColor: `${theme.dark}`,
        color: `${theme.blue}`,
      }}>
        <h4>Connect to internet to use App</h4>
      </div>
    )}
    </>
  );
}

export default App;
