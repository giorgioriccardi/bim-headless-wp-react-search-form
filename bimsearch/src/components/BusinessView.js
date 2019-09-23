import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class BusinessView extends Component {
  render() {
    const { id, acf, title } = this.props.business; // id will become Licence #
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
        <h2 className='warning-message'>{title}</h2>
        {/* <h2>{acf.business_name}</h2> */}
        <h4>
          Owner: <em>{acf.business_owner}</em>
        </h4>
        <div>Address: {acf.business_address}</div>
        {/* <div>GMAP address: {acf.business_address.address}</div> */}
        <p>The GMAP will be implemented at a later stage, eventually</p>
        <Link to={`/business/${id}`}>Business Link</Link>
      </div>
    );
  }
}

export default BusinessView;
