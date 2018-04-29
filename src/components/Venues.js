import React, { Component } from 'react';
import Axios from 'axios';
import { Link } from 'react-router-dom';

// Config
import EventBus from '../config/EventBus.js';
// Config

// Styles
import '../assets/styles/index.css';
import '../assets/styles/Venues.css';
// Styles

// Components
import PriceTier from '../components/PriceTier.js';
import NotFound from '../components/NotFound.js';
import Loading from '../components/Loading.js';
// Components

export default class Venues extends Component {

  constructor(props) {

    super(props);

    this.state = {
      is_loading: true,
      form_data: {
        eating: '',
        place: ''
      },
      venues: []
    };

  }

  componentDidMount() {

    EventBus.on('search_venue', (data) => {
      this.setState({ form_data: data }, () => {

        window.scroll({
          top: 0,
          behavior: 'smooth'
        });

        this.get_venues();
        
      });
    });

  }

  get_first_photo(venue_id, callback) {

    Axios.get('https://api.foursquare.com/v2/venues/' + venue_id + '/photos', {
      params: {
        client_id: 'V131V0IPODZOAI4DH0TXB0W1VF4R1QCAHASGHJI35D3KJLWK',
        client_secret: 'YAOLTIPXQYLDX4E0MVNZSB1TJTIZKXCPTFBGMAPBXXC2LL1E',
        v: 20120610,
        limit: 1
      }
    }).then((response) => {

      let result = -1; 

      if(response.data.meta.code === 200) {

        if(response.data.response.photos.items[0] !== undefined) {
          result = response.data.response.photos.items[0];
        }

      }

      callback(result);

    }).catch((error) => {
      callback(-1)
    });

  }
  
  get_venues() {

    let self = this;
    let eating = this.state.form_data.eating;
    let place = this.state.form_data.place;

    this.setState({ is_loading: true });

    Axios.get('https://api.foursquare.com/v2/venues/explore', {
      params: {
        client_id: 'V131V0IPODZOAI4DH0TXB0W1VF4R1QCAHASGHJI35D3KJLWK',
        client_secret: 'YAOLTIPXQYLDX4E0MVNZSB1TJTIZKXCPTFBGMAPBXXC2LL1E',
        v: 20120610,
        limit: 10,
        near: place,
        query: eating
      }
    }).then((response) => {
      
      self.setState({ is_loading: false, venues: [] });

      if(response.data.meta.code === 200) {

        if(response.data.response.groups[0].items !== undefined) {

          let venues = response.data.response.groups[0].items;

          self.setState({ venues: venues });

          for(let i = 0; i < venues.length; i++) {

            let venue = venues[i];

            self.get_first_photo(venue.venue.id, (photo) => {
              venues[i].venue['photo'] = photo.prefix + '500x500' + photo.suffix;
              self.setState({ venues: venues });
            });

          }

        }

      }

    }).catch((error) => {
      self.setState({ is_loading: false, venues: [] });
    });

  }

  render_list() {
    
    if(this.state.is_loading === false) {

      if(this.state.venues.length > 0) {
        
        return this.state.venues.map((venue, key) => (
          <div key={key} className="venue-element box-sizing">

            <div className="venue-element-content" style={{ backgroundImage: 'url(' + venue.venue.photo + ')' }}>

              <Link className="link" to={'/venue/' + venue.venue.id} />

              <div className="venue-element-detail">

                <div className="venue-element-name box-sizing">{venue.venue.name}</div>

                <div className="venue-element-summary box-sizing">

                  <div className="venue-element-summary-col box-sizing">
                    <div className="venue-element-summary-icon">
                      <img src={require('../assets/images/icons/user.png')} alt="Visitors" />
                    </div>
                    <div className="venue-element-summary-text box-sizing">{venue.venue.hereNow.count}</div>
                  </div>

                  <div className="venue-element-summary-col box-sizing">
                    <div className="venue-element-summary-icon">
                      <img src={require('../assets/images/icons/price.png')} alt="Price" />
                    </div>
                    <div className="venue-element-summary-text box-sizing">
                      <PriceTier tier={venue.venue.price !== undefined && venue.venue.price !== '' ? venue.venue.price.tier : 0} />
                    </div>
                  </div>

                  <div className="venue-element-summary-col box-sizing">
                    <div className="venue-element-summary-triangle"></div>
                    <div className="venue-element-summary-point">{venue.venue.rating === undefined || venue.venue.rating === '' ? '0.0' : venue.venue.rating.toFixed(1)}</div>
                  </div>

                </div>

              </div>

            </div>

          </div>
        ));

      }else{
        return (
          <NotFound text={'There is no such a venue in <b>' + this.state.form_data.place + '</b> about <b>' + this.state.form_data.eating + '</b>'} icon={require('../assets/images/icons/no-venue.png')} />
        );
      }

    }else{
      return (
        <Loading text={'Looking for venues...'} icon={require('../assets/images/icons/loading.png')} />
      );
    }

  }

  render() {
    return (
      <div className="venues">

        {this.render_list()}

      </div>
    );
  }

}