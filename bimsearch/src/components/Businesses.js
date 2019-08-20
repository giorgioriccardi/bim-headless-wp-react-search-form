import React, { Component } from 'react';
import axios from 'axios';

export class Businesses extends Component {
  state = {
    businesses: [],
    isLoaded: false // is false until we get our request
  };

  componentDidMount() {
    axios
      .get('http://bim-business-search.local/wp-json/bim-business/v1/posts')
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
    if(isLoaded) {
        return (
            <div>
                { businesses. 27'50"

                }
            </div>

        );
    }
  }
}

export default Businesses;
