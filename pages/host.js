// pages/host.js
import { useState } from 'react';

export default function Host() {
  const [poolName, setPoolName] = useState('');
  const [location, setLocation] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('New Pool Details:', { poolName, location, price, description });
    
    // Clear form
    setPoolName('');
    setLocation('');
    setPrice('');
    setDescription('');
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Host Your Pool</h1>
      <p>Submit your pool details to make it available on Pool Pass.</p>

      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '10px' }}>
          <label>Pool Name:</label>
          <input
            type="text"
            value={poolName}
            onChange={(e) => setPoolName(e.target.value)}
            required
            style={{ width: '100%', padding: '10px', marginTop: '5px' }}
          />
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label>Location:</label>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            required
            style={{ width: '100%', padding: '10px', marginTop: '5px' }}
          />
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label>Price per Day:</label>
          <input
            type="text"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            style={{ width: '100%', padding: '10px', marginTop: '5px' }}
          />
        </div>

        <div style={{ marginBottom: '10px' }}>
          <label>Description:</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            style={{ width: '100%', padding: '10px', marginTop: '5px' }}
          />
        </div>

        <button type="submit" style={{ padding: '10px 20px', fontSize: '16px' }}>Submit Pool</button>
      </form>
    </div>
  );
}
