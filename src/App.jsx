import React, { useState } from 'react';
import SearchBar from './components/SearchBar';
import Weather from './components/Weather';
import './App.css';

const App = () => {
  const [city, setCity] = useState();
  const handleSearch = (searchCity) => {
    setCity(searchCity);
  };
  return (
    <div>
      <h1>Weather Dashboard Application</h1>
      <SearchBar onSearch={handleSearch} />
      <Weather city={city} />
    </div>
  );
};

export default App;
