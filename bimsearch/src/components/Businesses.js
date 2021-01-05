import React, { Component, Fragment } from "react";
import BusinessItem from "./BusinessItem";
import axios from "axios";
import { Link } from "react-router-dom";

export class Businesses extends Component {
  state = {
    businesses: [],
    isLoaded: false, // is false until we get our request
  };

  componentDidMount() {
    axios
      // .get('http://bim-business-search.local/wp-json/bim-businesses/v1/posts') // wp endpoint
      // .get('http://9210c8c3.ngrok.io/?rest_route=/bim-businesses/v1/posts') // test remote flywheel
      // .get('http://bim-business-search.local/wp-content/bimdata/bim_business_data_backup.json') // test local json data
      .get(
        // 'http://bim-business-search.local/?rest_route=/bim-businesses/v1/posts' // Disable custom endpoints in favour of WP Rest API
        // 'http://bim-business-search.local/wp-json/wp/v2/posts'
        "http://bimbusinesssearch.local/wp-json/wp/v2/posts"
      )
      .then((response) => {
        this.setState({
          businesses: response.data,
          isLoaded: true,
        });
      })
      .catch((error) => console.log(error));
  }

  render() {
    console.log(this.state);
    const { businesses, isLoaded } = this.state;
    if (isLoaded) {
      return (
        <Fragment>
          {businesses.map((business) => (
            <BusinessItem key={business.id} business={business} />
          ))}
          <Link to="/" className="button floatRight">
            <small className="link">^ Up ^</small>
          </Link>
        </Fragment>
      );
    }
    return (
      <button className="button is-primary is-large is-loading">
        Loading BIM data
      </button>
    );
  }
}

export default Businesses;
