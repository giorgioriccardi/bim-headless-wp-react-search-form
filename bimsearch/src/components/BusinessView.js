import React, { Component } from 'react';

export class BusinessView extends Component {
  render() {
    const { acf, title } = this.props.business;
    // check that the business input did not have any issue with ACF
    // if for some reason ACF are not rendered it will output acf=false
    if (acf === false) {
      return (
        <div className='warning-message'>
          {title}: is missing some information
          <pre>
            <code>acf === false</code>
          </pre>
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
        <p>The GMAP will be implemented at a later stage, eventually</p>
      </div>
    );
  }
}

export default BusinessView;
