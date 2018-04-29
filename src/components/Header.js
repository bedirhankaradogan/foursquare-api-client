import React, { Component } from 'react';
import ClassNames from 'classnames';

// Config
import EventBus from '../config/EventBus.js';
// Config

// Styles
import '../assets/styles/index.css';
import '../assets/styles/Header.css';
// Styles

export default class Header extends Component {

  constructor(props) {

    super(props);

    this.state = {
      logo: 'logo.png',
      form_data: {
        eating: '',
        place: ''
      },
      is_header_invisible: false,
      animated_classes: {
        header: false,
        content: false,
        logo: false,
        form_texts: false
      }
    }

  }

  componentDidMount() {

    if(this.props.type === 'short') {
      this.shorten_header();
    }

    EventBus.on('search_venue', (data) => {
      this.setState({ form_data: data });
    });

  }
  
  on_input_change(event) {

    this.state.form_data[event.target.name] = event.target.value;
    this.setState({ form_data: this.state.form_data });

  }

  search_venue() {
    
    if(this.state.form_data.eating === '') {
      alert('You should write a something to eat!');
    }else if(this.state.form_data.place === '') {
      alert('You should write a place!');
    }else{

      this.add_recent_searches();
      this.shorten_header();
      this.enable_scroll_listener();
      EventBus.emit('search_venue', this.state.form_data);

    }

  }

  add_recent_searches() {

    let form_data = this.state.form_data;
    let recent_searches = JSON.parse(localStorage.getItem('recent_searches'));
    let is_search_exists = false;

    if(recent_searches === null) {

      recent_searches = [];
      recent_searches.push(this.state.form_data);
      
    }else{

      is_search_exists = recent_searches.some((recent_search) => { return recent_search.eating === form_data.eating && recent_search.place === form_data.place; });

      if(is_search_exists === false) {
        recent_searches.unshift(this.state.form_data);
      }
  
      if(recent_searches.length > 10) {
        recent_searches.splice(-1,1);
      }

    }

    localStorage.setItem('recent_searches', JSON.stringify(recent_searches));
    EventBus.emit('refresh_recent_searches_list');

  }

  shorten_header() {

    this.setState({
      logo: 'logo-white.png',
      animated_classes: {
        header: true,
        content: true,
        logo: true,
        form_texts: true
      }
    });

  }

  enable_scroll_listener() {

    let self = this;
    let last_position = 0;

    window.onscroll = () => {

      let new_position = window.scrollY;

      if(last_position < 80) {
        self.show_header();
      }else{
        self.hide_header();
      }

      last_position = new_position;

    }

  }

  hide_header() {
    this.setState({ is_header_invisible: true });
  }

  show_header() {
    this.setState({ is_header_invisible: false });
  }

  render() {
    return (
      <div className={ClassNames({ 'header': true, 'transition-animation-3': true, 'header-short': this.state.animated_classes.header, 'header-invisible': this.state.is_header_invisible })}>

        <div className={ClassNames({ 'header-content': true, 'header-content-short': this.state.animated_classes.content })}>

          <div className={ClassNames({ 'header-logo': true, 'transition-animation-3': true, 'header-logo-short': this.state.animated_classes.logo })}>
            <img src={require('../assets/images/logos/' + this.state.logo)} alt="Logo" />
          </div>

          <div className={ClassNames({ 'header-form': true, 'box-sizing': true })}>

            <div className={ClassNames({ 'header-form-texts': true, 'header-form-texts-short': this.state.animated_classes.form_texts })}>
              <div className="header-form-main-text">Lorem ipsum dolor sit</div>
              <div className="header-form-sub-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit,<br />sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</div>
            </div>

            <div className="header-form-inputs">

              <div className="header-form-input-col">
                <input type="text" className="text-input box-shadow-black box-sizing" placeholder="I'm looking for" name="eating" value={this.state.form_data.eating} onChange={this.on_input_change.bind(this)} />
              </div>

              <div className="header-form-input-col">
                <input type="text" className="text-input box-shadow-black box-sizing" placeholder="Place" name="place" value={this.state.form_data.place} onChange={this.on_input_change.bind(this)} />
              </div>

              <div className="header-form-input-col">
                <button className="button box-shadow-black box-sizing" onClick={this.search_venue.bind(this)}>
                  <img src={require('../assets/images/icons/search.png')} alt="Search" />
                </button>
              </div>
              
            </div>

          </div>

        </div>

      </div>
    );
  }

}