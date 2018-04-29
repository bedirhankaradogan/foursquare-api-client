import React, { Component } from 'react';

// Styles
import '../assets/styles/index.css';
import '../assets/styles/NotFound.css';
// Styles

export default class NotFound extends Component {
  
  constructor(props) {

    super(props);

    this.state = {
      icon: this.props.icon,
      text: this.props.text
    }

  }

  render_icon() {
    if(this.state.icon !== undefined && this.state.icon !== '') {
      return (
        <img src={this.state.icon} className="not-found-icon" alt="Not Found" />
      );
    }else{
      return null;
    }
  }

  render_text() {
    if(this.state.text !== undefined && this.state.text !== '') {
      return (
        <div className="not-found-text" dangerouslySetInnerHTML={{__html: this.state.text}}></div>
      );
    }else{
      return null;
    }
  }

  render() {
    return (
      <div className="not-found box-sizing">
        
        {this.render_icon()}
        {this.render_text()}

      </div>
    );
  }

}