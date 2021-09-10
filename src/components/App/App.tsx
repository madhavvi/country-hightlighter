import React from 'react';
import './App.css';
import Regions from '../Regions/Regions';
import Header from '../Header/Header';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Header />
      </header>
      <Regions />
    </div>
  );
}

export default App;
