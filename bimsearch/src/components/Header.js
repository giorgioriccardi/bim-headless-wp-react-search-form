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
            <div className='is-size-4'>
              <Link to='/'>
                <figure className='image is-128x128'>
                  <img src={logo} alt='logo' />
                </figure>
                <p>BIM Business Search Form</p>
              </Link>
            </div>
          </div>
        </div>
      </nav>
    );
  }
}

export default Header;
