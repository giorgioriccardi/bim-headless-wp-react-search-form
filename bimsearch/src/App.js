import React from 'react';
import './App.sass';
import Header from './components/Header';
import Businesses from './components/Businesses';

function App() {
  return (
    <div className='App'>
      <header className='App-header'>
        <Header />
        <div className='debug'>
          <h1 className='title'>Bulma</h1>
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
      <Businesses />
    </div>
  );
}

export default App;
