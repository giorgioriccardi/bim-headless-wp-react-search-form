import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class Header extends Component {
  render() {
    const logo =
      'https://www.seatoskywebsolutions.ca/wordpress/wp-content/uploads/2019/04/SSWS_logo_blue.png';
    return (
      <nav className='navbar is-primary'>
        <div className='container has-text-centered'>
          <div className='navbar-brand'>
            <p className='is-size-3'>
              <Link to='/'>
                <img src={logo} className='App-logo' alt='logo' />
                SSWS - BIM Business Search Form with React SPA w/ headless WP
              </Link>
            </p>
          </div>
        </div>
      </nav>
    );
  }
}

export default Header;
