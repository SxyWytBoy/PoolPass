// pages/index.js
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

const Home = () => {
  const [search, setSearch] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [guests, setGuests] = useState(1);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [userLocation, setUserLocation] = useState('');

  const handleUseMyLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation(`Lat: ${latitude.toFixed(2)}, Lon: ${longitude.toFixed(2)}`);
      });
    } else {
      alert('Geolocation not supported.');
    }
  };

  const locations = ['London', 'Manchester', 'Somerset', 'Liverpool', 'Bristol'];

  const buttonStyle = {
    padding: '8px 12px',
    borderRadius: '5px',
    border: 'none',
    backgroundColor: '#0070f3',
    color: 'white',
    cursor: 'pointer',
    fontWeight: '500',
  };

  return (
    <div className="container" style={{ padding: '20px' }}>
      <h1>🏊 Pool Pass</h1>
      <p>Find and book access to pools across the UK</p>

      {/* ✅ Basic Search Filters */}
      <div className="basic-filters" style={{ marginBottom: '20px', display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
        {/* 📍 Location Search */}
        <div>
          <input
            list="location-options"
            placeholder="Search by postcode, city, area"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ padding: '8px', width: '220px', borderRadius: '5px', border: '1px solid #ccc' }}
          />
          <datalist id="location-options">
            {locations.map((loc, idx) => <option key={idx} value={loc} />)}
          </datalist>
        </div>

        {/* 📍 Use Current Location */}
        <button onClick={handleUseMyLocation} style={buttonStyle}>
          Use my current location
        </button>
        {userLocation && <span style={{ marginTop: '8px', fontStyle: 'italic' }}>{userLocation}</span>}

        {/* 📅 Date Picker */}
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          style={{ padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }}
        />

        {/* 👥 Number of Guests */}
        <select
          value={guests}
          onChange={(e) => setGuests(Number(e.target.value))}
          style={{ padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }}
        >
          {[...Array(10)].map((_, i) => (
            <option key={i} value={i + 1}>
              {i + 1} guest{i > 0 ? 's' : ''}
            </option>
          ))}
          <option value="10+">10+</option>
        </select>
      </div>

      {/* 🔧 Advanced Filters Toggle */}
      <button onClick={() => setShowAdvancedFilters(!showAdvancedFilters)} style={{ ...buttonStyle, marginBottom: '10px' }}>
        {showAdvancedFilters ? 'Hide Advanced Filters' : 'Show Advanced Filters'}
      </button>

      {/* 🔧 Advanced Filters Section */}
      {showAdvancedFilters && (
        <div style={{ border: '1px solid #ccc', borderRadius: '10px', padding: '15px', marginBottom: '20px' }}>
          <h3>Advanced Filters</h3>

          {/* ✅ Amenities */}
          <fieldset>
            <legend>Amenities</legend>
            {['Heated pool', 'Hot tub', 'Loungers', 'Towels provided', 'Changing rooms', 'Food/drinks available', 'Wi-Fi', 'Parking'].map((amenity, i) => (
              <label key={i} style={{ display: 'block', marginBottom: '5px' }}>
                <input type="checkbox" style={{ marginRight: '8px' }} />
                {amenity}
              </label>
            ))}
          </fieldset>

          {/* 🏊 Pool Type */}
          <fieldset>
            <legend>Pool Type</legend>
            {['Hotel', 'Private home', 'Airbnb-style', 'Indoor', 'Outdoor'].map((type, i) => (
              <label key={i} style={{ display: 'block', marginBottom: '5px' }}>
                <input type="checkbox" style={{ marginRight: '8px' }} />
                {type}
              </label>
            ))}
          </fieldset>

          {/* 💷 Price Range */}
          <fieldset>
            <legend>Price Range (£)</legend>
            <input type="number" placeholder="Min" style={{ marginRight: '10px', padding: '5px' }} />
            <input type="number" placeholder="Max" style={{ padding: '5px' }} />
          </fieldset>

          {/* 🕒 Time of Day */}
          <fieldset>
            <legend>Time of Day</legend>
            {['Morning', 'Afternoon', 'Evening'].map((slot, i) => (
              <label key={i} style={{ marginRight: '15px' }}>
                <input type="radio" name="timeOfDay" style={{ marginRight: '5px' }} />
                {slot}
              </label>
            ))}
          </fieldset>

          {/* ➕ Add-ons */}
          <fieldset>
            <legend>Add-ons</legend>
            {['Food packages', 'Day beds', 'Alcohol', 'Kids’ area'].map((addon, i) => (
              <label key={i} style={{ display: 'block', marginBottom: '5px' }}>
                <input type="checkbox" style={{ marginRight: '8px' }} />
                {addon}
              </label>
            ))}
          </fieldset>

          {/* ♿ Accessibility */}
          <fieldset>
            <legend>Accessibility</legend>
            {['Wheelchair access', 'Step-free access', 'Baby changing'].map((acc, i) => (
              <label key={i} style={{ display: 'block', marginBottom: '5px' }}>
                <input type="checkbox" style={{ marginRight: '8px' }} />
                {acc}
              </label>
            ))}
          </fieldset>

          {/* 🐶 Pet-Friendly */}
          <fieldset>
            <legend>Pet-Friendly</legend>
            <label>
              <input type="checkbox" style={{ marginRight: '8px' }} />
              Show pet-friendly pools only
            </label>
          </fieldset>
        </div>
      )}

      {/* Example Button: Replace this with filtered pool results logic */}
      <div style={{ marginTop: '30px', textAlign: 'center' }}>
        <Link href="/host">
          <button style={buttonStyle}>Host Your Pool</button>
        </Link>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          .basic-filters {
            flex-direction: column;
          }

          button:hover {
            background-color: #005ac1;
          }
        }
      `}</style>
    </div>
  );
};

export default Home;
