import React from 'react';
import './Part1.css';

function Part1() {
  return (
    <div className="Part1">
      <h1 className="Whatdoyouwanttolearn">What do you want to learn?</h1>
      <div className="Search">
        <input type="text" placeholder="Search..." className="searchbar" />
        <button className="searchButton">Search</button>
      </div>
    </div>
  );
}

export default Part1;
