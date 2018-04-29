import React, { Component } from 'react';

// Styles
import '../assets/styles/index.css';
import '../assets/styles/Loading.css';
// Styles

export default class Loading extends Component {
  
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
        <img src={this.state.icon} className="loading-icon" alt="Loading" />
      );
    }else{
      return null;
    }
  }

  render_text() {
    if(this.state.text !== undefined && this.state.text !== '') {
      return (
        <div className="loading-text" dangerouslySetInnerHTML={{__html: this.state.text}}></div>
      );
    }else{
      return null;
    }
  }

  render() {
    return (
      <div className="loading box-sizing">
        
        {this.render_icon()}
        {this.render_text()}

      </div>
    );
  }

}