// pages/host.js
import { useState } from 'react';
import Link from 'next/link';

export default function HostForm() {
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    price: '',
    description: '',
    extras: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('New Pool Submitted:', formData);
    setSubmitted(true);
  };

  return (
    <div style={{ padding: '20px' }}>
      <Link href="/">← Back to homepage</Link>
      <h1>Host Your Pool</h1>

      {submitted ? (
        <p>✅ Thanks! Your pool submission has been received.</p>
      ) : (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', maxWidth: '500px' }}>
          <label>Pool Name:</label>
          <input name="name" value={formData.name} onChange={handleChange} required />

          <label>Location:</label>
          <input name="location" value={formData.location} onChange={handleChange} required />

          <label>Price per Day (£):</label>
          <input name="price" value={formData.price} onChange={handleChange} required />

          <label>Description:</label>
          <textarea name="description" value={formData.description} onChange={handleChange} required />

          <label>Extras (optional):</label>
          <input name="extras" value={formData.extras} onChange={handleChange} />

          <button type="submit" style={{ marginTop: '15px' }}>Submit</button>
        </form>
      )}
    </div>
  );
}
