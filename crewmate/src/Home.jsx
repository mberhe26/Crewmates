import React from 'react'
import crewmateImage from './assets/image.png'
import spaceshipImage from './assets/image2.png'
import './App.css'

const Home = () => {
  return (
    <div className="home-container">
      <h1>Welcome to the Crewmate Creator!</h1>
      <p>Here is where you can create your very own set of crewmates before sending them off into space!</p>
      <img src={crewmateImage} alt="Crewmate Image" />
      <img src={spaceshipImage} alt="Spaceship Image" />
    </div>
  );
};

export default Home
