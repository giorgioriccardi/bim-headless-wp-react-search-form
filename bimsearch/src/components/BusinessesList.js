import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class BusinessView extends Component {
  render() {
    const { acf, title } = this.props.business; // id will become Licence #
    // check that the business inputs did not have any issue with ACF
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
    // if for some reason ACF are not rendered it will output acf=''
    if (acf.licence_number === '') {
      return (
        <div className='warning-message'>
          {title.rendered}: is missing some information
          <pre>
            <code>acf.licence_number === ''</code>
          </pre>
        </div>
      );
    }
    // this error check has to be done programatically
    return (
      <div>
        <h2 className='warning-message'>{title.rendered}</h2>
        {/* <h2>{acf.business_name}</h2> */}
        <h4>
          Owner: <em>{acf.business_owner}</em>
        </h4>
        <div>Licence #: {acf.licence_number}</div>
        <div>Address: {acf.business_address}</div>
        {/* <div>GMAP address: {acf.business_address.address}</div> */}
        <p>The GMAP will be implemented at a later stage, eventually</p>
        <Link to={`/business/${acf.licence_number}`}>Business # Link</Link>
      </div>
    );
  }
}

export default BusinessView;
