import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import NormalLoginForm from './pages/Login/index';
import Index from './pages/Index';

class App extends React.Component {
  render(){
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path='/login' component={NormalLoginForm}></Route>
          <Route path='/' component={Index}></Route>
        </Switch>
      </BrowserRouter>
    );
  }
}

export default App;
