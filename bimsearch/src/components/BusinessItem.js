import React, { Component } from 'react';

export class BusinessItem extends Component {
  render() {
    const { acf, post_title } = this.props.business;
    // check that the business input did not have any issue with ACF
    // if for some reason ACF are not rendered it will output acf=false
    if (acf === false) {
      return (
        <div className='warning-message'>
          {post_title} is missing some information
        </div>
      );
    }
    return (
      <div>
        <h2>{acf.business_name}</h2>
        <h4>
          Owner: <em>{acf.business_owner}</em>
        </h4>
        {/* <div>Address: {acf.business_address.address}</div> */}
        <div>Address: {acf.business_address}</div>
      </div>
    );
  }
}

export default BusinessItem;
