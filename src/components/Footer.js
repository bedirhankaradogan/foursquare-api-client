import React, { Component } from 'react';

// Styles
import '../assets/styles/index.css';
import '../assets/styles/Footer.css';
// Styles

export default class Footer extends Component {

  render() {
    return (
      <div className="footer">

        <div className="footer-menu box-sizing">
        
          <div className="footer-menu-element">
            <a href="#">About Us</a>
          </div>

          <div className="footer-menu-element">
            <a href="#">Contact</a>
          </div>

          <div className="footer-menu-element">
            <a href="#">Blog</a>
          </div>

        </div>

      </div>
    );
  }

}