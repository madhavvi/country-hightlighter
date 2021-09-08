import React from 'react';
import './App.css';
import Countries from '../Countries/Countries';
import Header from '../Header/Header';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Header />
      </header>
      <Countries />
    </div>
  );
}

export default App;
