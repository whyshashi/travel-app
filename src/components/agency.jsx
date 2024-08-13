import { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route, Link, useParams, useNavigate } from 'react-router-dom';
const firebaseUrl = 'https://fir-22282-default-rtdb.asia-southeast1.firebasedatabase.app/destinations.json';
    
import { Home } from './home';
import { Category } from './views';
import { DestinationDetails } from './DestinationDetails';

    export const Appt = () => {
      const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

      const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
        localStorage.setItem('theme', newTheme);
      };

      return (
        <Router>
          <div className={`app ${theme}`}>
            <header>
              <h1>Travel Planning App</h1>
              <nav>
                <Link to="/">Home</Link>
                <Link to="/category/Adventure">Adventure</Link>
                <Link to="/category/Leisure">Leisure</Link>
                <Link to="/category/Cultural">Cultural</Link>
                <button onClick={toggleTheme}>
                  Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
                </button>
              </nav>
            </header>

            <main>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/category/:type" element={<Category />} />
                <Route path="/destination/:id" element={<DestinationDetails />} />
              </Routes>
            </main>
          </div>
        </Router>
      );
    };

    
