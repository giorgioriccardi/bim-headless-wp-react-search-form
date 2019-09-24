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

  render() {
    const { business, isLoaded } = this.state;
    if (isLoaded) {
      return (
        <Fragment>
          <Link to='/'>Home</Link>
          <br />
          <h2>{business.title.rendered}</h2>
          <h2>{business.acf.licence_number}</h2>
        </Fragment>
      );
    }
    return <h3>Loading...</h3>;
  }
}

export default BusinessPage;
