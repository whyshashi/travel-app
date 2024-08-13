import { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route, Link, useParams, useNavigate } from 'react-router-dom';
const firebaseUrl = 'https://fir-22282-default-rtdb.asia-southeast1.firebasedatabase.app/destinations.json';

import { AdminForm } from './AdminForm';
import { DestinationDetails } from './DestinationDetails';
import { Category,DetailedView,DestinationCard } from './views';

export const Home = () => {
    const [destinations, setDestinations] = useState([]);
    const [selectedDestination, setSelectedDestination] = useState(null);     
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCountry, setSelectedCountry] = useState('');
    const [budgetRange, setBudgetRange] = useState([0, 5000]);


    useEffect(() => {
      fetchDestinations();
    }, []);

    const fetchDestinations = () => {
      axios.get(firebaseUrl)
        .then(response => {
          if (response.data) {
            const data = Object.keys(response.data).map(key => ({
              id: key,
              ...response.data[key],
            }));
            setDestinations(data);
          }
        })
        .catch(error => console.error('Error fetching data:', error));
    };

   
    const handleCardClick = (dest) => {
      setSelectedDestination(dest);
    };

    const handleFilter = () => {
      return destinations.filter(dest => {
        return (
          dest.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
          (selectedCountry ? dest.country === selectedCountry : true) &&
          dest.averageBudget >= budgetRange[0] && dest.averageBudget <= budgetRange[1]
        );
      });
    };

    const handleSubmit = (dest) => {
      if (dest.id) {
        
        axios.patch(`${firebaseUrl.replace('.json', '')}/${dest.id}.json`, dest)
          .then(fetchDestinations)
          .catch(error => console.error('Error updating data:', error));
      } else {
        
        axios.post(firebaseUrl, dest)
          .then(fetchDestinations)
          .catch(error => console.error('Error adding data:', error));
      }
    };

    const handleDelete = (id) => {
      axios.delete(`${firebaseUrl.replace('.json', '')}/${id}.json`)
        .then(fetchDestinations)
        .catch(error => console.error('Error deleting data:', error));
    };

    return (
      <div>
        <header>
          <input 
            type="text" 
            placeholder="Search by city..."
            value={searchTerm} 
            onChange={(e) => setSearchTerm(e.target.value)} 
          />
          <select onChange={(e) => setSelectedCountry(e.target.value)}>
            <option value="">All Countries</option>
            {[...new Set(destinations.map(dest => dest.country))].map(country => (
              <option key={country} value={country}>{country}</option>
            ))}
          </select>
          <input 
            type="range" 
            min="0" 
            max="5000" 
            value={budgetRange[1]} 
            onChange={(e) => setBudgetRange([0, e.target.value])} 
          />
          <span>Budget up to ${budgetRange[1]}</span>
        </header>

        <main>
          {selectedDestination ? (
            <DetailedView 
              dest={selectedDestination} 
              onClose={() => setSelectedDestination(null)} 
              onDelete={handleDelete}
            />
          ) : (
            <div className="card-list">
              {handleFilter().map(dest => (
                <DestinationCard key={dest.id} dest={dest} onClick={() => handleCardClick(dest)} />
              ))}
            </div>
          )}
        </main>

        <footer>
          <AdminForm onSubmit={handleSubmit} />
          {selectedDestination && selectedDestination.adminFlag && (
            <AdminForm dest={selectedDestination} onSubmit={handleSubmit} />
          )}
        </footer>
      </div>
    );
  };