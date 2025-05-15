import { useState } from 'react';
import Link from 'next/link';

export default function Booking() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    date: '',
  });

  const handleChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    alert('Booking submitted! (Not actually submitting)');
  };

  return (
    <div style={{ maxWidth: 400, margin: '40px auto', fontFamily: 'Arial, sans-serif' }}>
      <h1>Book Your Pool</h1>
      <form onSubmit={handleSubmit}>
        <label>Name</label><br />
        <input
          name="name"
          value={formData.name}
          onChange={handleChange}
          style={{ width: '100%', padding: 8, marginBottom: 12 }}
          required
        /><br />
        <label>Email</label><br />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          style={{ width: '100%', padding: 8, marginBottom: 12 }}
          required
        /><br />
        <label>Date</label><br />
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          style={{ width: '100%', padding: 8, marginBottom: 20 }}
          required
        /><br />
        <button type="submit" style={{
          backgroundColor: '#0070f3',
          color: 'white',
          padding: '10px 15px',
          border: 'none',
          borderRadius: 5,
          cursor: 'pointer'
        }}>
          Submit Booking
        </button>
      </form>
      <Link href="/">
        <a style={{ display: 'inline-block', marginTop: 20, color: '#0070f3' }}>
          Back to Home
        </a>
      </Link>
    </div>
  );
}
