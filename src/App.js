import React, {Component} from 'react';
import Home from './pages/Home';
import CollegeInfo from './pages/CollegeInfo';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
  } from "react-router-dom";

class App extends Component {    
  render(){
    return (
      <div className="h-100">
        <Router>
          {/*navigation */}
          <nav className="navbar fixed-top navbar-dark navbar-expand-md bg-primary">
            <span className="navbar-brand mb-0 h1">College Info Station</span>
              <div className="container-fluid" id="navbarColor01">
                <div id="navbarNav">
                  <ul className="navbar-nav">
                      <li className="nav-item">
                          <Link className="nav-link" to="/">Home</Link>
                      </li>
                  </ul>
                </div>
              </div>
          </nav>

          
          <Switch>
            <Route exact path='/'>
              <Home />
            </Route>
            <Route exact path='/CollegeInfo' render={(props) => <CollegeInfo {...props} />} />
          </Switch>
        </Router>
    </div>
    );
  }
}

export default App;
