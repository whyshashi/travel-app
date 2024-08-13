import { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route, Link, useParams, useNavigate } from 'react-router-dom';
const firebaseUrl = 'https://fir-22282-default-rtdb.asia-southeast1.firebasedatabase.app/destinations.json';

export const AdminForm = ({ dest = {}, onSubmit }) => {
    const [name, setName] = useState(dest.name || '');
    const [country, setCountry] = useState(dest.country || '');
    const [description, setDescription] = useState(dest.description || '');
    const [averageBudget, setAverageBudget] = useState(dest.averageBudget || '');
    const [profileImg, setProfileImg] = useState(dest.profileImg || '');
    const [additionalImages, setAdditionalImages] = useState(dest.additionalImages || []);

    const handleSubmit = (e) => {
      e.preventDefault();

      const updatedDest = {
        name,
        country,
        description,
        averageBudget,
        profileImg,
        additionalImages
      };

      if (dest.id) {
        updatedDest.id = dest.id;  // Preserve the ID for updates
      }

      onSubmit(updatedDest);
      // Clear form fields after submission
      setName('');
      setCountry('');
      setDescription('');
      setAverageBudget('');
      setProfileImg('');
      setAdditionalImages([]);
    };

    return (
      <form onSubmit={handleSubmit}>
        <h2>{dest.id ? 'Update Destination' : 'Add New Destination'}</h2>
        <input 
          type="text" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
          placeholder="Destination Name" 
          required 
        />
        <input 
          type="text" 
          value={country} 
          onChange={(e) => setCountry(e.target.value)} 
          placeholder="Country" 
          required 
        />
        <textarea 
          value={description} 
          onChange={(e) => setDescription(e.target.value)} 
          placeholder="Description" 
          required 
        />
        <input 
          type="number" 
          value={averageBudget} 
          onChange={(e) => setAverageBudget(e.target.value)} 
          placeholder="Average Budget" 
          required 
        />
        <input 
          type="text" 
          value={profileImg} 
          onChange={(e) => setProfileImg(e.target.value)} 
          placeholder="Profile Image URL" 
          required 
        />
        <input 
          type="text" 
          value={additionalImages.join(', ')} 
          onChange={(e) => setAdditionalImages(e.target.value.split(',').map(url => url.trim()))} 
          placeholder="Additional Image URLs (comma-separated)" 
        />
        <button type="submit">
          {dest.id ? 'Update Destination' : 'Add Destination'}
        </button>
      </form>
    );
  };