// pages/index.js
import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

const pools = [
  {
    id: 1,
    name: 'Luxury Hotel Pool',
    location: 'London',
    price: '£25',
    description: 'Access to rooftop infinity pool with towels included.',
    type: 'Hotel Pool',
    image: '/images/luxury-pool.jpg',
    availableDates: ['2025-05-15', '2025-05-16'],
    rating: 4.5,
    reviews: [
      { user: 'John Doe', comment: 'Amazing experience, highly recommended!', rating: 5 },
      { user: 'Jane Smith', comment: 'Lovely pool, but a bit crowded.', rating: 4 },
    ],
  },
  {
    id: 2,
    name: 'Countryside B&B Pool',
    location: 'Somerset',
    price: '£15',
    description: 'Peaceful outdoor pool with countryside views.',
    type: 'Public Pool',
    image: '/images/countryside-pool.jpeg',
    availableDates: ['2025-05-14', '2025-05-18'],
    rating: 3.8,
    reviews: [
      { user: 'Alice Brown', comment: 'A relaxing place to unwind!', rating: 4 },
      { user: 'Bob White', comment: 'Great view, but the pool could be cleaner.', rating: 3 },
    ],
  },
  {
    id: 3,
    name: 'City Gym Pool',
    location: 'Manchester',
    price: '£10',
    description: 'Indoor heated pool at modern fitness center.',
    type: 'Gym Pool',
    image: '/images/city-gym-pool.jpg',
    availableDates: ['2025-05-10', '2025-05-12'],
    rating: 4.2,
    reviews: [
      { user: 'Sarah Green', comment: 'Nice pool but a little too small for my liking.', rating: 3 },
      { user: 'Tom Clark', comment: 'Great for a quick swim after the gym!', rating: 5 },
    ],
  },
];

export default function Home() {
  const [search, setSearch] = useState('');
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [availableDate, setAvailableDate] = useState('');
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [showMobileFilters, setShowMobileFilters] = useState(false);
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

  const buttonHoverStyle = {
    ...buttonStyle,
    backgroundColor: '#005ac1',
  };

  return (
    <div className="container" style={{ padding: '20px' }}>
      <h1>🏊 Pool Pass</h1>
      <p>Find and book access to pools across the UK</p>

      {/* Mobile Filter Toggle */}
      <div className="mobile-filter-toggle" style={{ marginBottom: '10px', display: 'none' }}>
        <button
          onClick={() => setShowMobileFilters(!showMobileFilters)}
          style={buttonStyle}
        >
          {showMobileFilters ? 'Hide Filters' : 'Show Filters'}
        </button>
      </div>

      {/* Filters Section */}
      <div
        className="filters"
        style={{
          marginBottom: '20px',
          display: showMobileFilters ? 'block' : 'flex',
          flexWrap: 'wrap',
          gap: '10px',
        }}
      >
        <input
          type="text"
          placeholder="Search by Location"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            padding: '8px',
            width: '300px',
            borderRadius: '5px',
            border: '1px solid #ccc',
            flexGrow: 1,
          }}
        />

        {/* Pool Type Filter */}
        <div style={{ position: 'relative' }} ref={dropdownRef}>
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            style={buttonStyle}
          >
            Select Pool Type
          </button>
          {dropdownOpen && (
            <div
              style={{
                position: 'absolute',
                backgroundColor: 'white',
                boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.2)',
                zIndex: 1,
                padding: '10px',
                borderRadius: '5px',
                width: '200px',
              }}
            >
              {['Hotel Pool', 'Public Pool', 'Gym Pool', 'Private Pool'].map((type) => (
                <div key={type} style={{ marginBottom: '10px' }}>
                  <label htmlFor={type} style={{ cursor: 'pointer', color: '#333' }}>
                    <input
                      type="checkbox"
                      value={type}
                      checked={selectedTypes.includes(type)}
                      onChange={handleTypeChange}
                      id={type}
                      style={{ marginRight: '10px' }}
                    />
                    {type}
                  </label>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Date Picker */}
        <input
          type="date"
          value={availableDate}
          onChange={(e) => setAvailableDate(e.target.value)}
          style={{
            padding: '8px',
            borderRadius: '5px',
            border: '1px solid #ccc',
          }}
        />
      </div>

      {/* Display Pools */}
      <div>
        {filteredPools.map((pool) => (
          <div key={pool.id} className="card" style={{ marginBottom: '20px' }}>
            <div style={{ position: 'relative', width: '100%', height: '200px', marginBottom: '15px' }}>
              <Image
                src={pool.image}
                alt={pool.name}
                layout="fill"
                objectFit="cover"
                style={{ borderRadius: '10px' }}
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
        @media (max-width: 768px) {
          .filters {
            display: ${showMobileFilters ? 'block' : 'none'};
          }

          .mobile-filter-toggle {
            display: block;
          }

          button:hover {
            background-color: #005ac1;
          }
        }
      `}</style>
    </div>
  );
}
