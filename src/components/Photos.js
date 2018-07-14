import React, { Component } from 'react';
import Axios from 'axios';

// Styles
import '../assets/styles/index.css';
import '../assets/styles/Photos.css';
// Styles

// Components
import NotFound from '../components/NotFound.js';
import Loading from '../components/Loading.js';
// Components

export default class Photos extends Component {

  constructor(props) {

    super(props);

    this.state = {
      is_loading: true,
      photos: []
    };

  }

  componentDidMount() {
    this.get_photos();
  }
  
  get_photos() {
    
    let self = this;
    let venue_id = this.props.id;

    this.setState({ is_loading: true });

    Axios.get('https://api.foursquare.com/v2/venues/' + venue_id + '/photos', {
      params: {
        client_id: 'GH4BWS2A1V0K0RAIGWA401NNQ04JUIF55HUTP30LQ1IKINUL',
        client_secret: 'NRTY31TIGPDGK5GWODTMDKTQL1JTW1VKLWHWZJR425E03WSN',
        v: 20120610,
        limit: 12
      }
    }).then((response) => {
      
      self.setState({ is_loading: false, photos: [] });

      if(response.data.meta.code === 200) {

        if(response.data.response.photos.items !== undefined) {
          self.setState({ photos: response.data.response.photos.items });
        }

      }

    }).catch((error) => {
      self.setState({ is_loading: false, photos: [] });
    });

  }

  render_list() {
    
    if(this.state.is_loading === false) {

      if(this.state.photos.length > 0) {
        
        return this.state.photos.map((photo, key) => (
          <div key={key} className="photo-element box-sizing">

            <div className="photo-element-content box-sizing" style={{ backgroundImage: 'url(' + photo.prefix + photo.width + 'x' + photo.height + photo.suffix + ')' }}>

              <div className="photo-element-user-image transition-animation-3">
                <div style={{backgroundImage: 'url( ' + photo.user.photo.prefix + '80x80' + photo.user.photo.suffix + ' )'}}></div>
              </div>

              <div className="photo-element-user-name transition-animation-3">{photo.user.firstName} {photo.user.lastName !== undefined ? photo.user.lastName : ''}</div>

            </div>

          </div>
        ));

      }else{
        return (
          <NotFound text={'There is no photo for this venue'} icon={require('../assets/images/icons/no-image.png')} />
        );
      }

    }else{
      return (
        <Loading text={'Loading venue photos...'} icon={require('../assets/images/icons/loading.png')} />
      );
    }

  }

  render() {
    return (
      <div className="photos">

        {this.render_list()}

      </div>
    );
  }

}