import React from 'react';
import './App.css';
import Header from './components/Header';
import Businesses from './components/Businesses';

function App() {
  return (
    <div className='App'>
      <header className='App-header'>
        <Header />
      </header>
      <Businesses />
    </div>
  );
}

export default App;
