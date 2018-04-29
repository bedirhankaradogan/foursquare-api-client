import React, { Component } from 'react';

// Styles
import '../assets/styles/index.css';
import '../assets/styles/Home.css';
// Styles

// Components
import Header from '../components/Header.js';
import Venues from '../components/Venues.js';
import RecentSearches from '../components/RecentSearches.js';
// Components

export default class Home extends Component {

  render() {
    return (
      <div className="home">

        <Header type="long" />
        
        <div className="home-venues">
          <Venues />
        </div>

        <div className="home-recent-searches">
          <RecentSearches />
        </div>

      </div>
    );
  }

}