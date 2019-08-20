import React, { Component } from 'react';

export class BusinessItem extends Component {
  render() {
    const { acf } = this.props.business;
    return (
      <div>
        <h2>{acf.business_name}</h2>
        <h4>
          Owner: <em>{acf.business_owner}</em>
        </h4>
        <div>Address: {acf.business_address.address}</div>
      </div>
    );
  }
}

export default BusinessItem;
