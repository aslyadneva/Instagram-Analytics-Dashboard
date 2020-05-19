import React, { Component, Fragment } from 'react';
import { Route, Switch } from 'react-router-dom'; 
import Search from './components/Search'; 
import Dashboard from './components/Dashboard';


class App extends Component {
  render () {
    return ( 
      <Fragment>
        <Switch>
          <Route path="/" exact component={Search}/>
          <Route path="/:username" exact component={Dashboard}/>
        </Switch>  
      </Fragment>
    ); 
  } 
}

export default App;
