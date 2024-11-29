import React from 'react';
import './Part2.css';
import Card from './Card';

function Part2() {
  return (
    <div className="Part2">
      <div className="Preorder">
        <h1 style={{color: "black"}}>Discover Study Together</h1>
        <div className="card-container">
          <Card 
            title="Read DSA Concepts"
            description="This is the description for reading dsa concepts..."
            // buttonText="Go to Page 1"
            imageSource={require('../Images/Read.png')}
            navigateTo="/Read"
          />
          <Card 
            title="Explore Practice Problems"
            description="Solve DSA Problems.Filter based on tags and
            Company tags.Get curated problem lists by GFG ex..."
            // buttonText="Go to Page 2"
            imageSource={require('../Images/practice.png')}
            navigateTo="/problems"
          />
          <Card 
            title="Interview Preparation"
            description="An interview-centric course designed to prepare you for
            role of SDA for both product and service..."
            // buttonText="Go to Page 3"
            imageSource={require('../Images/learn.png')}
            navigateTo="/Learn"
          />
        </div>
      </div>
    </div>
  );
}

export default Part2;
