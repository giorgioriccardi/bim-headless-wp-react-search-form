import React, { Component, Fragment } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export class BusinessPage extends Component {
  state = {
    business: {},
    isLoaded: false
  };

  componentDidMount() {
    const slug = this.props.match.params.slug;
    axios
      .get(
        // `http://bim-business-search.local/?rest_route=/bim-businesses/v1/posts/${this.props.match.params.id}` // Disable custom endpoints in favour of WP Rest API
        `http://bim-business-search.local/wp-json/wp/v2/posts?slug=${slug}`
      )
      .then(response => {
        this.setState({
          business: response.data[0],
          isLoaded: true
        });
      })
      .catch(error => console.log(error));
  }

  // create a separate sub-component for naics_code and import it here
  // https://developmentarc.gitbooks.io/react-indepth/content/life_cycle/birth/post_mount_with_component_did_mount.html

  render() {
    const { business, isLoaded } = this.state;
    if (isLoaded) {
      return (
        <Fragment>
          <Link to='/'>
            <span className='icon'>
              <i className='fas fa-home'></i>
            </span>
            Back
          </Link>
          <h2>{business.title.rendered}</h2>
          <h4>
            Owner: <em>{business.acf.business_owner}</em>
          </h4>
          <p>Licence #: {business.acf.licence_number}</p>
          {/* <p>Address: {business.acf.business_address}</p> */}
          <p>NAICS: {business.naics_code}</p>
          <p>Category: {business.categories}</p>
          <div>GMAP address: {business.acf.business_address.address}</div>
          {/* <small>The GMAP will be implemented at a later stage, eventually</small> */}
          <hr />
          <Link to='/'>
            <span className='icon'>
              <i className='fas fa-home'></i>
            </span>
            Back
          </Link>
        </Fragment>
      );
    }
    return <h3>Loading...</h3>;
  }
}

export default BusinessPage;
