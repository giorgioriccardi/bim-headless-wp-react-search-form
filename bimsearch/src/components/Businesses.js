import React, { Component } from 'react';
import axios from 'axios';

export class Businesses extends Component {
  state = {
    businesses: [],
    isLoaded: false // is false until we get our request
  };

  componentDidMount() {
    axios
      //   .get('http://bim-business-search.local/wp-json/bim-businesses/v1/posts')
      .get(
        'http://bim-business-search.local/?rest_route=/bim-businesses/v1/posts'
      )
      .then(res =>
        this.setState({
          businesses: res.data,
          isLoaded: true
        })
      )
      .catch(err => console.log(err));
  }

  render() {
    console.log(this.state);
    const { businesses, isLoaded } = this.state;
    if (isLoaded) {
      return (
        <div>
          {businesses.map(business => (
            <h2>{business.acf.business_name}</h2>
          ))}
        </div>
      );
    }
    return <h3>Loading BIM Businesses Data...</h3>;
  }
}

export default Businesses;
