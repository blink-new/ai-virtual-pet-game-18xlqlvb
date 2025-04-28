
import { useState } from 'react';
import { PetDisplay } from './components/PetDisplay';
import './App.css';

function App() {
  return (
    <div className="app-container">
      <header className="app-header">
        <h1>Virtual Pet</h1>
      </header>
      
      <main className="app-content">
        <PetDisplay />
      </main>
      
      <footer className="app-footer">
        <nav className="navigation">
          <button className="nav-button">Home</button>
          <button className="nav-button">Play</button>
          <button className="nav-button">Care</button>
          <button className="nav-button">Shop</button>
        </nav>
      </footer>
    </div>
  );
}

export default App;