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
  const [availableDate, setAvailableDate] = useState('');
  const [guests, setGuests] = useState(1);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const amenities = [
    'Heated pool',
    'Hot tub',
    'Loungers',
    'Towels provided',
    'Changing rooms',
    'Food/drinks available',
    'Wi-Fi',
    'Parking',
  ];

  const poolTypes = [
    'Hotel Pool',
    'Private Pool',
    'Airbnb-style',
    'Indoor',
    'Outdoor',
    'Public Pool',
    'Gym Pool',
  ];

  const handleTypeChange = (event) => {
    const value = event.target.value;
    setSelectedTypes((prev) =>
      prev.includes(value) ? prev.filter((type) => type !== value) : [...prev, value]
    );
  };

  const handleAmenityChange = (event) => {
    const value = event.target.value;
    setSelectedAmenities((prev) =>
      prev.includes(value) ? prev.filter((a) => a !== value) : [...prev, value]
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
    const matchesDate = availableDate ? pool.availableDates.includes(availableDate) : true;
    const matchesType = selectedTypes.length > 0 ? selectedTypes.includes(pool.type) : true;
    return matchesLocation && matchesDate && matchesType;
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
    padding: '10px 14px',
    borderRadius: '5px',
    border: 'none',
    backgroundColor: '#0070f3',
    color: 'white',
    cursor: 'pointer',
    fontWeight: '500',
    fontSize: '1rem',
  };

  return (
    <div className="container" style={{ padding: '20px' }}>
      <h1>🏊 Pool Pass</h1>
      <p>Find and book access to pools across the UK</p>

      {/* Basic Search Options */}
      <div style={{ marginBottom: '20px', display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
        <input
          type="text"
          placeholder="Search by Location or Postcode"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            padding: '10px',
            borderRadius: '5px',
            border: '1px solid #555',
            backgroundColor: '#fff',
            color: '#000',
            flexGrow: 1,
            minWidth: '200px',
            fontSize: '1rem',
          }}
        />
        <input
          type="date"
          value={availableDate}
          onChange={(e) => setAvailableDate(e.target.value)}
          style={{
            padding: '10px',
            borderRadius: '5px',
            border: '1px solid #555',
            backgroundColor: '#fff',
            color: '#000',
            fontSize: '1rem',
          }}
        />
        <select
          value={guests}
          onChange={(e) => setGuests(Number(e.target.value))}
          style={{
            padding: '10px',
            borderRadius: '5px',
            border: '1px solid #555',
            backgroundColor: '#fff',
            color: '#000',
            fontSize: '1rem',
          }}
        >
          {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
            <option key={num} value={num}>
              {num} {num === 10 ? '+' : ''}
            </option>
          ))}
        </select>
        <button onClick={() => setShowAdvanced(!showAdvanced)} style={buttonStyle}>
          {showAdvanced ? 'Hide Advanced Filters' : 'Show Advanced Filters'}
        </button>
      </div>

      {/* Advanced Filters */}
      {showAdvanced && (
        <div
          className="advanced-filters"
          style={{
            backgroundColor: '#f9f9f9',
            borderRadius: '10px',
            padding: '15px',
            marginBottom: '20px',
          }}
        >
          <h3>Advanced Filters</h3>

          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
            {/* Amenities */}
            <div>
              <strong>Amenities:</strong>
              {amenities.map((a) => (
                <label
                  key={a}
                  style={{
                    display: 'block',
                    cursor: 'pointer',
                    color: '#000',
                    fontWeight: '500',
                    backgroundColor: '#f1f1f1',
                    padding: '5px 8px',
                    borderRadius: '5px',
                    marginBottom: '5px',
                  }}
                >
                  <input
                    type="checkbox"
                    value={a}
                    checked={selectedAmenities.includes(a)}
                    onChange={handleAmenityChange}
                    style={{ marginRight: '10px' }}
                  />
                  {a}
                </label>
              ))}
            </div>

            {/* Pool Type */}
            <div>
              <strong>Pool Type:</strong>
              {poolTypes.map((type) => (
                <label
                  key={type}
                  style={{
                    display: 'block',
                    cursor: 'pointer',
                    color: '#000',
                    fontWeight: '500',
                    backgroundColor: '#f1f1f1',
                    padding: '5px 8px',
                    borderRadius: '5px',
                    marginBottom: '5px',
                  }}
                >
                  <input
                    type="checkbox"
                    value={type}
                    checked={selectedTypes.includes(type)}
                    onChange={handleTypeChange}
                    style={{ marginRight: '10px' }}
                  />
                  {type}
                </label>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Pool Listings */}
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

      {/* Host Call To Action */}
      <div style={{ marginTop: '30px', textAlign: 'center' }}>
        <Link href="/host">
          <button style={buttonStyle}>Host Your Pool</button>
        </Link>
      </div>
    </div>
  );
}
