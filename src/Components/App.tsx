import React from 'react';
import { Switch, Route } from 'react-router-dom';
import WelcomeSection from './Routes/WelcomeSection';

const App = () => {

  const routes = (
    <Switch>
      <Route path="/" exact> <WelcomeSection /></Route>
      <Route path="/logn" exact> logowanie</Route>
      <Route path="/register" exact> rejestracja</Route>
    </Switch>
  )
  return (
    <>
      {routes}
    </>
  );
}

export default App;
