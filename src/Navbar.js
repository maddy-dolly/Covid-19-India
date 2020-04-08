import React, {Component} from 'react';
import {BrowserRouter as Router, Route, Link, Switch} from 'react-router-dom';
import HelpLink from  './Link/HelpLink'
import Home from './Home/Home';
import Faq from './FAQ/Faq';
import  './Navbar.css';

class Navbar extends Component {

  render() {
    return (
      <React.Fragment>
          <Router>
          <nav className="navbar navbar-expand-lg navbar-light bg-white navbar_head" >
            <span ><Link to='' className="navbar-brand"><img src={process.env.PUBLIC_URL + "/icon.png"} alt="covid-logo" height= "32px" width= "34px"/></Link></span>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav ul_set">
                <li className="nav-item active">
                <span ><Link to='/' className="navbar-brand link_head">Home</Link></span>                
                </li>
                <li className="nav-item">
                <span ><Link to="/helplink" className="navbar-brand link_head">Help Link</Link></span>                
                </li>
                <li className="nav-item">
                <span ><Link to='/faq' className="navbar-brand link_head">FAQ</Link></span> 
                </li>
                <li className="nav-item">
                   
                </li>
                </ul>
            </div>
        </nav>
        <Switch>
        <Route exact path='/' component={Home} />
        <Route exact path="/helplink" component={HelpLink}/>
        <Route exact path="/faq" component={Faq}/>
        </Switch>
       
          </Router>
        
      </React.Fragment>
     
   ) 
  }
 
}

export default Navbar;
