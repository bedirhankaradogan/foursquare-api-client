import React, { Component } from 'react';

// Styles
import '../assets/styles/index.css';
import '../assets/styles/PriceTier.css';
// Styles

export default class PriceTier extends Component {

  constructor(props) {

    super(props);

    this.state = {
      tiers: [1, 2, 3, 4],
      tier: this.props.tier
    }

  }

  render_tier() {

    return this.state.tiers.map((tier, key) => {

      let opacity = 0;

      if(tier <= this.state.tier) {
        opacity = 1;
      }

      return (
        <div key={key} className="price-tier-unit" style={{ opacity: opacity }}></div>
      )
    });

  }

  render() {
    return (
      <div className="price-tier">
        {this.render_tier()}
      </div>
    );
  }

}