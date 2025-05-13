import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

const pools = [
  // ... existing pool data remains unchanged
];

export default function Home() {
  const [search, setSearch] = useState('');
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [availableDate, setAvailableDate] = useState('');
  const [guests, setGuests] = useState(1);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const dropdownRef = useRef(null);

  const handleTypeChange = (event) => {
    const value = event.target.value;
    setSelectedTypes((prev) =>
      prev.includes(value) ? prev.filter((type) => type !== value) : [...prev, value]
    );
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const filteredPools = pools.filter((pool) => {
    const matchesLocation = pool.location.toLowerCase().includes(search.toLowerCase());
    const matchesType = selectedTypes.length > 0 ? selectedTypes.includes(pool.type) : true;
    const matchesDate = availableDate ? pool.availableDates.includes(availableDate) : true;
    return matchesLocation && matchesType && matchesDate;
  });

  const renderRatingStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStars = rating % 1 !== 0;
    let stars = [];

    for (let i = 0; i < fullStars; i++) stars.push('★');
    if (halfStars) stars.push('☆');
    while (stars.length < 5) stars.push('☆');

    return stars.join(' ');
  };

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
      {/* Logo + Banner Combined */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '20px' }}>
        <Image
          src="/images/poolpass_logo.jpeg"
          alt="Pool Pass Logo"
          width={120}
          height={120}
          style={{ borderRadius: '10px', objectFit: 'contain' }}
        />
        <div style={{ flex: 1 }}>
          <Image
            src="/images/poolpass_banner.jpg"
            alt="Pool Pass Banner"
            width={0}
            height={0}
            sizes="100vw"
            style={{ width: '100%', height: '120px', objectFit: 'cover', borderRadius: '10px' }}
          />
        </div>
      </div>

      {/* Header */}
      <div style={{ marginBottom: '30px' }}>
        <h1 style={{ margin: 0 }}>🏊 Pool Pass</h1>
        <p style={{ margin: 0 }}>Find and book access to pools across the UK</p>
      </div>

      {/* Basic Filters */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Search by postcode, city, area"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ padding: '8px', borderRadius: '5px', border: '1px solid #ccc', width: '250px' }}
        />
        <button
          onClick={() => alert('Using current location...')}
          style={{ ...buttonStyle, backgroundColor: '#444' }}
        >
          Use my location
        </button>
        <input
          type="date"
          value={availableDate}
          onChange={(e) => setAvailableDate(e.target.value)}
          style={{ padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }}
        />
        <select
          value={guests}
          onChange={(e) => setGuests(Number(e.target.value))}
          style={{ padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }}
        >
          {[...Array(10)].map((_, i) => (
            <option key={i + 1} value={i + 1}>{i + 1} guest{i > 0 && 's'}</option>
          ))}
          <option value={11}>10+ guests</option>
        </select>
        <button onClick={() => setShowAdvanced(!showAdvanced)} style={buttonStyle}>
          {showAdvanced ? 'Hide' : 'Show'} Advanced Filters
        </button>
      </div>

      {/* Advanced Filters */}
      {showAdvanced && (
        <div style={{ marginBottom: '20px', padding: '10px', border: '1px solid #ccc', borderRadius: '10px' }}>
          <h3>Advanced Filters</h3>
          <div ref={dropdownRef} style={{ marginBottom: '10px' }}>
            <strong>Pool Type:</strong>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '8px' }}>
              {['Hotel Pool', 'Public Pool', 'Gym Pool', 'Private Pool'].map((type) => (
                <label key={type} style={{ backgroundColor: '#f1f1f1', padding: '6px 10px', borderRadius: '5px', color: '#333' }}>
                  <input
                    type="checkbox"
                    value={type}
                    checked={selectedTypes.includes(type)}
                    onChange={handleTypeChange}
                    style={{ marginRight: '6px' }}
                  />
                  {type}
                </label>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Listings */}
      <div>
        {filteredPools.map((pool) => (
          <div key={pool.id} className="card" style={{ marginBottom: '30px' }}>
            <div style={{ width: '100%', height: 'auto', marginBottom: '15px' }}>
              <Image
                src={pool.image}
                alt={pool.name}
                width={600}
                height={300}
                style={{ borderRadius: '10px', objectFit: 'cover', width: '100%', height: 'auto' }}
              />
            </div>
            <h2>{pool.name}</h2>
            <p><strong>Location:</strong> {pool.location}</p>
            <p><strong>Price:</strong> {pool.price}</p>
            <p>{pool.description}</p>
            <p><strong>Rating:</strong> {renderRatingStars(pool.rating)}</p>
            <div>
              <strong>Reviews:</strong>
              {pool.reviews.map((review, index) => (
                <div key={index} style={{ marginBottom: '10px' }}>
                  <p><strong>{review.user}</strong>: {review.comment}</p>
                  <p>{renderRatingStars(review.rating)}</p>
                </div>
              ))}
            </div>
            <Link href={`/pool/${pool.id}`}>
              <button style={{ ...buttonStyle, marginTop: '10px' }}>View Details</button>
            </Link>
          </div>
        ))}
      </div>

      <div style={{ marginTop: '30px', textAlign: 'center' }}>
        <Link href="/host">
          <button style={buttonStyle}>Host Your Pool</button>
        </Link>
      </div>

      <style jsx>{`
        button:hover {
          background-color: #005ac1;
        }
      `}</style>
    </div>
  );
}
