import { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route, Link, useParams, useNavigate } from 'react-router-dom';
const firebaseUrl = 'https://fir-22282-default-rtdb.asia-southeast1.firebasedatabase.app/destinations.json';

export const DetailedView = ({ dest, onClose, onDelete }) => {
    return (
      <div className="detailed-view">
        <button onClick={onClose}>Back</button>
        <h2>{dest.name}</h2>
        <p>{dest.country}</p>
        <p>{dest.description}</p>
        <div>
          <img src={dest.profileImg} alt={`${dest.name} profile`} />
          {dest.additionalImages && dest.additionalImages.map((img, index) => (
            <img key={index} src={img} alt={`Slide ${index + 1}`} />
          ))}
        </div>
        <p>Budget: ${dest.averageBudget}</p>
        {dest.adminFlag && (
          <button onClick={() => onDelete(dest.id)}>Delete</button>
        )}
      </div>
    );
  };



export const Category = () => {
    const { type } = useParams();
    const [destinations, setDestinations] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
      fetchDestinations();
    }, [type]);

    const fetchDestinations = () => {
      axios.get(firebaseUrl)
        .then(response => {
          if (response.data) {
            const data = Object.keys(response.data).map(key => ({
              id: key,
              ...response.data[key],
            }));
            const filteredDestinations = data.filter(dest => dest.type === type);
            setDestinations(filteredDestinations);
          }
        })
        .catch(error => console.error('Error fetching data:', error));
    };

    return (
      <div>
        <h2>{type} Destinations</h2>
        <div className="card-list">
          {destinations.map(dest => (
            <DestinationCard
              key={dest.id}
              dest={dest}
              onClick={() => navigate(`/destination/${dest.id}`)}
            />
          ))}
        </div>
      </div>
    );
  };

export  const DestinationCard = ({ dest, onClick }) => (
    <div className="card" onClick={onClick}>
      <img src={dest.profileImg} alt={dest.name} />
      <h3>{dest.name}</h3>
      <p>{dest.country}</p>
      <p>Budget: ${dest.averageBudget}</p>
    </div>
  );
