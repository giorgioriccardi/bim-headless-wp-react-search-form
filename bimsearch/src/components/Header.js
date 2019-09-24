import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class Header extends Component {
  render() {
    const logo =
      'https://www.seatoskywebsolutions.ca/wordpress/wp-content/uploads/2019/04/SSWS_logo_blue.png';
    return (
      <Link to='/'>
        <div>
          <p>
            <img src={logo} className='App-logo' alt='logo' />
          </p>
          <h1 className='App-title'>
            SSWS - BIM Business Search Form with React SPA w/ headless WP
          </h1>
        </div>
      </Link>
    );
  }
}

export default Header;
