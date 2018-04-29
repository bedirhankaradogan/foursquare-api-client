import React, { Component } from 'react';

// Config
import EventBus from '../config/EventBus.js';
// Config

// Styles
import '../assets/styles/index.css';
import '../assets/styles/RecentSearches.css';
// Styles

// Components
import NotFound from '../components/NotFound.js';
// Components

export default class RecentSearches extends Component {

  constructor(props) {

    super(props);

    this.state = {
      recent_searches: []
    };

  }

  componentDidMount() {

    EventBus.on('refresh_recent_searches_list', () => {
      this.get_recent_searches();
    });

  }

  get_recent_searches() {

    let recent_searches = localStorage.getItem('recent_searches');

    if(recent_searches != null) {
      this.setState({ recent_searches: JSON.parse(recent_searches) });
    }

  }

  render_list() {

    if(this.state.recent_searches.length > 0) {
      
      return this.state.recent_searches.map((recent_search, key) => (

        <div key={key} className="recent-search-element box-sizing" onClick={() => EventBus.emit('search_venue', recent_search)}>
          {recent_search.eating} in {recent_search.place}
        </div>

      ));

    }else{
      return (
        <NotFound text={'You haven\'t searched anything. Seems like you\'re new!'} />
      );
    }

  }

  render() {
    return (
      <div className="recent-searches box-shadow-orange">

        <div className="recent-searches-header box-sizing">RECENT SEARCHES</div>

        <div className="recent-searches-body box-sizing">

          {this.render_list()}

        </div>

      </div>
    );
  }

}