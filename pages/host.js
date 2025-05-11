// pages/host.js
import { useState } from 'react';
import { useRouter } from 'next/router'; // ✅ Import router

export default function Host() {
  const [poolName, setPoolName] = useState('');
  const [location, setLocation] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newPool = {
      poolName,
      location,
      price,
      description,
    };

    try {
      await fetch('https://script.google.com/macros/s/AKfycbzVNQhDJHcjERQFYI6GWs_5SJ7faBlOL2ien5MlL862DnU7sHPtybshgC9riiQkYSDSnA/exec', {
        method: 'POST',
        body: JSON.stringify(newPool),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // Clear the form
      setPoolName('');
      setLocation('');
      setPrice('');
      setDescription('');

      // Redirect to thank you page
      router.push('/thankyou');
    } catch (error) {
      console.error('Error submitting pool:', error);
      alert('Something went wrong. Please try again later.');
    }
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
