import React, { Component, Fragment } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

export class BusinessPage extends Component {
  state = {
    busines: {},
    isLoaded: false
  };

  componentDidMount() {
    axios
      .get(
        // `http://bim-business-search.local/?rest_route=/bim-businesses/v1/posts/${this.props.match.params.id}` // Disable custom endpoints in favour of WP Rest API
        `http://bim-business-search.local/wp-json/wp/v2/posts/${this.props.match.params.id}`
      )
      .then(res =>
        this.setState({
          business: res.data,
          isLoaded: true
        })
      )
      .catch(err => console.log(err));
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
