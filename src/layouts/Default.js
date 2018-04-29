import React, { Component } from 'react';
import { Route, BrowserRouter } from 'react-router-dom';

// Routes
import Home from '../pages/Home.js';
import Venue from '../pages/Venue.js';
// Routes

// Components
import Footer from '../components/Footer.js';
// Components

export default class Default extends Component {

  render() {
    return (
      <BrowserRouter>

        <div className="page user-select-none">

          <div className="content">

            <Route exact path="/" component={Home} />
            <Route path="/venue/:id" component={Venue} />
            
          </div>

          <Footer />
          
        </div>

      </BrowserRouter>
    );
  }
  
}