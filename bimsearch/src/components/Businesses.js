import React, { Component } from 'react';
import BusinessView from './BusinessView';
import axios from 'axios';

export class Businesses extends Component {
  state = {
    businesses: [],
    isLoaded: false // is false until we get our request
  };

  componentDidMount() {
    axios
      // .get('http://bim-business-search.local/wp-json/bim-businesses/v1/posts') // wp endpoint
      // .get('http://9210c8c3.ngrok.io/?rest_route=/bim-businesses/v1/posts') // test remote flywheel
      // .get('http://bim-business-search.local/wp-content/bimdata/bim_business_data_backup.json') // test local json data
      .get(
        'http://bim-business-search.local/?rest_route=/bim-businesses/v1/posts'
      )
      .then(response =>
        this.setState({
          businesses: response.data,
          isLoaded: true
        })
      )
      .catch(error => console.log(error));
  }

  render() {
    console.log(this.state);
    const { businesses, isLoaded } = this.state;
    if (isLoaded) {
      return (
        <div>
          {businesses.map(business => (
            <BusinessView key={business.id} business={business} />
          ))}
        </div>
      );
    }
    return <h3>Loading BIM Business Data...</h3>;
  }
}

export default Businesses;
