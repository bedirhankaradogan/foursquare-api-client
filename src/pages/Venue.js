import React, { Component } from 'react';
import Axios from 'axios';

// Styles
import '../assets/styles/index.css';
import '../assets/styles/Venue.css';
// Styles

// Components
import PriceTier from '../components/PriceTier.js';
import Photos from '../components/Photos.js';
import Tips from '../components/Tips.js';
// Components

export default class Venue extends Component {

  constructor(props) {

    super(props);

    this.state = {
      is_loading: true,
      venue_id: this.props.match.params.id,
      venue: '',
      cover_photo: '',
      tips: ''
    }

  }

  componentDidMount() {

    window.scroll({ top: 0 });

    this.get_venue_details();

  }

  get_venue_details() {

    let self = this;

    this.setState({ is_loading: true });

    Axios.get('https://api.foursquare.com/v2/venues/' + this.state.venue_id, {
      params: {
        client_id: 'V131V0IPODZOAI4DH0TXB0W1VF4R1QCAHASGHJI35D3KJLWK',
        client_secret: 'YAOLTIPXQYLDX4E0MVNZSB1TJTIZKXCPTFBGMAPBXXC2LL1E',
        v: 20120610
      }
    }).then((response) => {

      self.setState({ is_loading: false, venue: '', cover_photo: '', tips: '' });

      if(response.data.meta.code === 200) {

        if(response.data.response.venue !== undefined) {

          let venue = response.data.response.venue;
          let cover_photo = venue.bestPhoto.prefix + venue.bestPhoto.width + 'x' + venue.bestPhoto.height + venue.bestPhoto.suffix;

          self.setState({ venue: venue, cover_photo: cover_photo, tips: venue.tips.groups[0].items.slice(0, 10) });
        }

      }

    }).catch((error) => {
      self.setState({ is_loading: false, venue: '', cover_photo: '', tips: '' });
    });

  }

  render_name() {

    if(this.state.is_loading === false) {

      if(this.state.venue !== '') {
        return this.state.venue.name;
      }else{
        return 'Venue couldn\'t been found!';
      }

    }else{
      return 'Venue is been loading...';
    }

  }

  render_bottom() {

    if(this.state.is_loading === false) {

      if(this.state.venue !== '') {
        return (
          <div className="venue-header-bottom box-sizing">

            <div className="venue-header-summary">

              <div className="venue-header-summary-point-wrapper">
                <div className="venue-header-summary-point-square"></div>
                <div className="venue-header-summary-point-text">{this.state.venue.rating === undefined || this.state.venue.rating === '' ? '0.0' : this.state.venue.rating.toFixed(1)}</div>
              </div>

              <div className="venue-header-summary-row">
                <div className="venue-header-summary-col">
                  <div className="venue-header-summary-icon">
                    <img src={require('../assets/images/icons/pin.png')} alt="Adress" />
                  </div>
                  <div className="venue-header-summary-text box-sizing">{this.state.venue.location.address === undefined && this.state.venue.location.address === '' ? 'Address not found!' : this.state.venue.location.address}</div>
                </div>
              </div>

              <div className="venue-header-summary-row">
                <div className="venue-header-summary-col">
                  <div className="venue-header-summary-icon">
                    <img src={require('../assets/images/icons/phone.png')} alt="Phone Number" />
                  </div>
                  <div className="venue-header-summary-text box-sizing">{this.state.venue.contact.formattedPhone === undefined && this.state.venue.contact.formattedPhone === '' ? 'Phone number not found!' : this.state.venue.contact.formattedPhone}</div>
                </div>
              </div>

              <div className="venue-header-summary-row">

                <div className="venue-header-summary-col">
                  <div className="venue-header-summary-icon">
                    <img src={require('../assets/images/icons/user.png')} alt="Visitors" />
                  </div>
                  <div className="venue-header-summary-text box-sizing">{this.state.venue.hereNow.count === undefined && this.state.venue.hereNow.count === '' ? 0 : this.state.venue.hereNow.count}</div>
                </div>

                <div className="venue-header-summary-col">
                  <div className="venue-header-summary-icon">
                    <img src={require('../assets/images/icons/price.png')} alt="Price" />
                  </div>
                  <div className="venue-header-summary-text box-sizing">
                    <PriceTier tier={this.state.venue.price !== undefined && this.state.venue.price !== '' ? this.state.venue.price.tier : 0} />
                  </div>
                </div>

              </div>

            </div>

          </div>
        );
      }

    }

  }

  render_body() {

    if(this.state.is_loading === false) {

      if(this.state.venue !== '') {
        return (
          <div className="venue-body">

            <div className="venue-photos">
              <Photos id={this.state.venue_id} />
            </div>

            <div className="venue-tips">
              <Tips tips={this.state.tips} />
            </div>

          </div>
        );
      }

    }

  }

  render() {
    return (
      <div className="venue">
        
        <div className="venue-header" style={{ backgroundImage: 'url(' + this.state.cover_photo + ')' }}>

          <div className="venue-header-top">

            <div className="venue-header-logo-wrapper">
              <img className="venue-header-logo" src={require('../assets/images/logos/logo-white-thin.png')} alt="Logo" />
              <img className="venue-header-icon" src={require('../assets/images/icons/venue.png')} alt="Venue" />
            </div>

            <div className="venue-header-name box-sizing">{this.render_name()}</div>

          </div>

          {this.render_bottom()}

        </div>

        {this.render_body()}

      </div>
    );
  }

}