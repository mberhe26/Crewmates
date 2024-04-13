import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './Home';
import Crewmate from './Crewmate';
import CrewmateGallery from './CrewmateGallery';

function App() {
 
    return (
      <Router>
        <div className="app-container">
          <nav>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/create">Create Crewmate</Link>
              </li>
              <li>
                <Link to="/gallery">Crewmate Gallery</Link>
              </li>
            </ul>
          </nav>
  
          <div className="content-container">
            <Routes>
              <Route exact path="/" element={<Home />} />
              <Route path="/create" element={<Crewmate />} />
              <Route path="/gallery" element={<CrewmateGallery />} />
            </Routes>
          </div>
        </div>
      </Router>
    );
  }
export default App;
