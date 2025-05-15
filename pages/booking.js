import { useState } from 'react';

export default function Booking() {
  const [name, setName] = useState('');
  const [date, setDate] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    alert(`Booking confirmed for ${name} on ${date}`);
    // Add your booking logic here
  }

  return (
    <div style={{ padding: '20px', maxWidth: '400px', margin: 'auto' }}>
      <h1>Book Your Pool</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Name:<br />
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
          />
        </label>
        <label>
          Date:<br />
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
          />
        </label>
        <button
          type="submit"
          style={{
            padding: '10px 20px',
            backgroundColor: '#0070f3',
            color: 'white',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
          }}
        >
          Confirm Booking
        </button>
      </form>
    </div>
  );
}
