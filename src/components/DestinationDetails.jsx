import { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route, Link, useParams, useNavigate } from 'react-router-dom';
const firebaseUrl = 'https://fir-22282-default-rtdb.asia-southeast1.firebasedatabase.app/destinations.json';

export const DestinationDetails = () => {
    const { id } = useParams();
    const [destination, setDestination] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
      fetchDestinationDetails();
    }, [id]);

    const fetchDestinationDetails = () => {
      axios.get(`${firebaseUrl.replace('.json', '')}/${id}.json`)
        .then(response => {
          if (response.data) {
            setDestination({ id, ...response.data });
          }
        })
        .catch(error => console.error('Error fetching destination details:', error));
    };

    if (!destination) return <div>Loading...</div>;

    return (
      <div className="detailed-view">
        <button onClick={() => navigate(-1)}>Back</button>
        <h2>{destination.name}</h2>
        <p>{destination.country}</p>
        <p>{destination.description}</p>
        <img src={destination.profileImg} alt={`${destination.name} profile`} />
        {destination.additionalImages && destination.additionalImages.map((img, index) => (
          <img key={index} src={img} alt={`Slide ${index + 1}`} />
        ))}
        <p>Budget: ${destination.averageBudget}</p>
      </div>
    );
  };
