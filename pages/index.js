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
    amenities: ['Towels', 'WiFi', 'Shower'],
    petFriendly: true,
    accessibility: ['Wheelchair Access'],
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
    amenities: ['WiFi', 'Parking'],
    petFriendly: false,
    accessibility: [],
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
    amenities: ['Shower', 'Parking'],
    petFriendly: true,
    accessibility: ['Wheelchair Access'],
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
  const [guests, setGuests] = useState(1);
  const [showAdvanced, setShowAdvanced] = useState(false);
  const [selectedAmenities, setSelectedAmenities] = useState([]);
  const [priceRange, setPriceRange] = useState([0, 30]);
  const [petFriendlyOnly, setPetFriendlyOnly] = useState(false);
  const [accessibilityOptions, setAccessibilityOptions] = useState([]);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        // Close dropdown if needed
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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

  const handleAccessibilityChange = (event) => {
    const value = event.target.value;
    setAccessibilityOptions((prev) =>
      prev.includes(value) ? prev.filter((a) => a !== value) : [...prev, value]
    );
  };

  const filteredPools = pools.filter((pool) => {
    const priceValue = Number(pool.price.replace('£', ''));
    const matchesLocation = pool.location.toLowerCase().includes(search.toLowerCase());
    const matchesType = selectedTypes.length > 0 ? selectedTypes.includes(pool.type) : true;
    const matchesDate = availableDate ? pool.availableDates.includes(availableDate) : true;
    const matchesAmenities = selectedAmenities.length > 0
      ? selectedAmenities.every(a => pool.amenities.includes(a))
      : true;
    const matchesPrice = priceValue >= priceRange[0] && priceValue <= priceRange[1];
    const matchesPetFriendly = petFriendlyOnly ? pool.petFriendly : true;
    const matchesAccessibility = accessibilityOptions.length > 0
      ? accessibilityOptions.every(a => pool.accessibility.includes(a))
      : true;

    return (
      matchesLocation &&
      matchesType &&
      matchesDate &&
      matchesAmenities &&
      matchesPrice &&
      matchesPetFriendly &&
      matchesAccessibility
    );
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
    <div style={{ padding: '20px' }}>
      <h1>🏊 Pool Pass</h1>
      <p>Find and book access to pools across the UK</p>

      {/* Basic Search Options */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Search by postcode, city, area"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ padding: '8px', borderRadius: '5px', border: '1px solid #ccc', width: '250px' }}
        />
        <button onClick={() => alert('Using current location...')} style={{ ...buttonStyle, backgroundColor: '#444' }}>
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
        <div style={{ marginBottom: '20px', padding: '15px', border: '1px solid #ccc', borderRadius: '10px' }}>
          <h3>Advanced Filters</h3>

          <div style={{ marginBottom: '10px' }}>
            <strong>Pool Type:</strong>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '8px' }}>
              {['Hotel Pool', 'Public Pool', 'Gym Pool', 'Private Pool'].map((type) => (
                <label key={type}>
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

          <div style={{ marginBottom: '10px' }}>
            <strong>Amenities:</strong>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '8px' }}>
              {['WiFi', 'Parking', 'Towels', 'Shower'].map((amenity) => (
                <label key={amenity}>
                  <input
                    type="checkbox"
                    value={amenity}
                    checked={selectedAmenities.includes(amenity)}
                    onChange={handleAmenityChange}
                    style={{ marginRight: '6px' }}
                  />
                  {amenity}
                </label>
              ))}
            </div>
          </div>

          <div style={{ marginBottom: '10px' }}>
            <strong>Price Range: £{priceRange[0]} - £{priceRange[1]}</strong>
            <input
              type="range"
              min="0"
              max="50"
              value={priceRange[1]}
              onChange={(e) => setPriceRange([0, Number(e.target.value)])}
              style={{ width: '100%' }}
            />
          </div>

          <div style={{ marginBottom: '10px' }}>
            <label>
              <input
                type="checkbox"
                checked={petFriendlyOnly}
                onChange={() => setPetFriendlyOnly(!petFriendlyOnly)}
                style={{ marginRight: '6px' }}
              />
              Pet Friendly Only
            </label>
          </div>

          <div style={{ marginBottom: '10px' }}>
            <strong>Accessibility:</strong>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '8px' }}>
              {['Wheelchair Access'].map((option) => (
                <label key={option}>
                  <input
                    type="checkbox"
                    value={option}
                    checked={accessibilityOptions.includes(option)}
                    onChange={handleAccessibilityChange}
                    style={{ marginRight: '6px' }}
                  />
                  {option}
                </label>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Pool Listings */}
      <div>
        {filteredPools.map((pool) => (
          <div key={pool.id} style={{ marginBottom: '30px' }}>
            <Image src={pool.image} alt={pool.name} width={600} height={300} style={{ borderRadius: '10px', objectFit: 'cover', width: '100%', height: 'auto' }} />
            <h2>{pool.name}</h2>
            <p><strong>Location:</strong> {pool.location}</p>
            <p><strong>Price:</strong> {pool.price}</p>
            <p>{pool.description}</p>
            <p><strong>Amenities:</strong> {pool.amenities.join(', ')}</p>
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
