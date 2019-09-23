import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.sass';
import Header from './components/Header';
import Businesses from './components/Businesses';
import BusinessPage from './components/BusinessPage';
export class App extends Component {
  render() {
    return (
      <Router>
        <Fragment>
          <header className='App-header'>
            <Header />
            <div className='debug'>
              <h1 className='title'>Bulma styles</h1>
              <p className='subtitle'>
                CSS framework based on{' '}
                <a href='https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Flexible_Box_Layout/Basic_Concepts_of_Flexbox'>
                  Flexbox
                </a>
              </p>

              <div className='field'>
                <div className='control'>
                  <input className='input' type='text' placeholder='Input' />
                </div>
              </div>

              <div className='field'>
                <p className='control'>
                  <span className='select'>
                    <select>
                      <option>Select dropdown</option>
                    </select>
                  </span>
                </p>
              </div>

              <div className='buttons'>
                <a href='/' className='button is-primary'>
                  Primary
                </a>
                <a href='/' className='button is-link'>
                  Link
                </a>
              </div>
            </div>
            {/* end .debug */}
          </header>
          {/* <Businesses /> */}
          <Route exact path='/' component={Businesses} />
          <Route
            exact
            path='/business/:licence_number'
            component={BusinessPage}
          />
          {/* id will become Licence # */}
        </Fragment>
      </Router>
    );
  }
}

export default App;
