// pages/booking.js
import { useState } from 'react';
import Link from 'next/link';

import { useRouter } from 'next/router';

export default function BookingForm() {
  const router = useRouter();
  const { pool: selectedPool } = router.query;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    date: '',
    pool: '',
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
    console.log('Booking Info:', formData);
    setSubmitted(true);
  };

  return (
    <div style={{ padding: '20px' }}>
      <Link href="/">← Back to homepage</Link>
      <h1>Book a Pool</h1>

      {submitted ? (
        <p>✅ Booking submitted! We'll contact you soon.</p>
      ) : (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', maxWidth: '400px' }}>
          <label>Name:</label>
          <input name="name" value={formData.name} onChange={handleChange} required />

          <label>Email:</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />

          <label>Date:</label>
          <input type="date" name="date" value={formData.date} onChange={handleChange} required />

          <label>Choose a Pool:</label>
          <select name="pool" value={formData.pool} onChange={handleChange} required>
            <option value="">-- Select --</option>
            <option value="Luxury Hotel Pool">Luxury Hotel Pool</option>
            <option value="Countryside B&B Pool">Countryside B&B Pool</option>
            <option value="City Gym Pool">City Gym Pool</option>
          </select>

          <button type="submit" style={{ marginTop: '15px' }}>Submit Booking</button>
        </form>
      )}
    </div>
  );
}
