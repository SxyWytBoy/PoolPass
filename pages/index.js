import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

const mockPools = [
  {
    id: 1,
    name: 'The Lakeside Pool',
    location: 'Cotswolds',
    price: '£60/day',
    image: '/pool1.jpg',
    description: 'A serene outdoor pool by the lake, ideal for family retreats.',
    rating: 4.5,
    reviews: [
      { user: 'Alice', comment: 'Wonderful atmosphere!', rating: 5 },
      { user: 'Tom', comment: 'Very relaxing', rating: 4 },
    ],
    amenities: ['Heated pool', 'Wi-Fi', 'Parking'],
    type: 'Outdoor',
    petFriendly: true,
  },
  {
    id: 2,
    name: 'Luxury City Spa Pool',
    location: 'London',
    price: '£95/day',
    image: '/pool2.jpg',
    description: 'Private rooftop pool with sauna access in Central London.',
    rating: 4.8,
    reviews: [
      { user: 'Beth', comment: 'Top-tier spa facilities!', rating: 5 },
    ],
    amenities: ['Hot tub', 'Towels provided', 'Food/drinks available'],
    type: 'Indoor',
    petFriendly: false,
  },
];

export default function Home() {
  const [search, setSearch] = useState('');
  const [availableDate, setAvailableDate] = useState('');
  const [guests, setGuests] = useState(1);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [amenities, setAmenities] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [priceRange, setPriceRange] = useState({ min: '', max: '' });
  const [timeOfDay, setTimeOfDay] = useState('');
  const [addons, setAddons] = useState([]);
  const [accessibility, setAccessibility] = useState([]);
  const [petFriendlyOnly, setPetFriendlyOnly] = useState(false);

  const handleAmenityChange = (e) => {
    const { value, checked } = e.target;
    setAmenities((prev) =>
      checked ? [...prev, value] : prev.filter((item) => item !== value)
    );
  };

  const handleTypeChange = (e) => {
    const { value, checked } = e.target;
    setSelectedTypes((prev) =>
      checked ? [...prev, value] : prev.filter((item) => item !== value)
    );
  };

  const handleAddonChange = (e) => {
    const { value, checked } = e.target;
    setAddons((prev) =>
      checked ? [...prev, value] : prev.filter((item) => item !== value)
    );
  };

  const handleAccessibilityChange = (e) => {
    const { value, checked } = e.target;
    setAccessibility((prev) =>
      checked ? [...prev, value] : prev.filter((item) => item !== value)
    );
  };

  const renderRatingStars = (rating) => {
    const stars = [];
    for (let i = 0; i < 5; i++) {
      stars.push(i < Math.round(rating) ? '⭐' : '☆');
    }
    return stars.join('');
  };

  const buttonStyle = {
    padding: '8px 12px',
    borderRadius: '5px',
    border: '1px solid #0070f3',
    backgroundColor: '#0070f3',
    color: 'white',
    cursor: 'pointer',
  };

  const filteredPools = mockPools.filter((pool) => {
    const matchesSearch = pool.location.toLowerCase().includes(search.toLowerCase()) || pool.name.toLowerCase().includes(search.toLowerCase());
    const matchesAmenities = amenities.every((a) => pool.amenities.includes(a));
    const matchesType = selectedTypes.length === 0 || selectedTypes.includes(pool.type);
    const matchesPetFriendly = !petFriendlyOnly || pool.petFriendly;

    return matchesSearch && matchesAmenities && matchesType && matchesPetFriendly;
  });

  return (
    <div style={{ padding: '20px' }}>
      <h1 style={{ marginBottom: '20px' }}>Find Your Perfect Pool</h1>

      {/* Basic Filters */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Enter postcode, city, or area"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ padding: '8px', flexGrow: 1, borderRadius: '5px', border: '1px solid #ccc' }}
        />
        <button onClick={() => alert("Use location coming soon...")} style={buttonStyle}>
          📍 Use My Location
        </button>
        <input
          type="date"
          value={availableDate}
          onChange={(e) => setAvailableDate(e.target.value)}
          style={{ padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }}
        />
        <select
          value={guests}
          onChange={(e) => setGuests(parseInt(e.target.value))}
          style={{ padding: '8px', borderRadius: '5px', border: '1px solid #ccc' }}
        >
          {[...Array(10).keys()].map((i) => (
            <option key={i + 1} value={i + 1}>{i + 1} {i === 0 ? 'guest' : 'guests'}</option>
          ))}
          <option value={11}>10+ guests</option>
        </select>
        <button onClick={() => setShowAdvancedFilters(!showAdvancedFilters)} style={buttonStyle}>
          {showAdvancedFilters ? 'Hide Advanced Filters' : 'Show Advanced Filters'}
        </button>
      </div>

      {/* Advanced Filters */}
      {showAdvancedFilters && (
        <div style={{ padding: '15px', border: '1px solid #ddd', borderRadius: '8px', marginBottom: '20px', backgroundColor: '#f9f9f9' }}>
          <div><strong>Amenities:</strong>
            {['Heated pool', 'Hot tub', 'Loungers', 'Towels provided', 'Changing rooms', 'Food/drinks available', 'Wi-Fi', 'Parking'].map((a) => (
              <label key={a} style={{ marginRight: '10px' }}>
                <input type="checkbox" value={a} checked={amenities.includes(a)} onChange={handleAmenityChange} /> {a}
              </label>
            ))}
          </div>
          <div><strong>Pool Type:</strong>
            {['Hotel Pool', 'Private Pool', 'Airbnb-style', 'Indoor', 'Outdoor'].map((type) => (
              <label key={type} style={{ marginRight: '10px' }}>
                <input type="checkbox" value={type} checked={selectedTypes.includes(type)} onChange={handleTypeChange} /> {type}
              </label>
            ))}
          </div>
          <div><strong>Price Range (£):</strong>
            <input type="number" placeholder="Min" value={priceRange.min} onChange={(e) => setPriceRange({ ...priceRange, min: e.target.value })} style={{ width: '80px', marginRight: '5px' }} />
            -
            <input type="number" placeholder="Max" value={priceRange.max} onChange={(e) => setPriceRange({ ...priceRange, max: e.target.value })} style={{ width: '80px', marginLeft: '5px' }} />
          </div>
          <div><strong>Time of Day:</strong>
            {['Morning', 'Afternoon', 'Evening'].map((t) => (
              <label key={t} style={{ marginRight: '10px' }}>
                <input type="radio" name="timeofday" value={t} checked={timeOfDay === t} onChange={() => setTimeOfDay(t)} /> {t}
              </label>
            ))}
          </div>
          <div><strong>Add-ons:</strong>
            {['Food packages', 'Day beds', 'Alcohol', 'Kids’ area'].map((addon) => (
              <label key={addon} style={{ marginRight: '10px' }}>
                <input type="checkbox" value={addon} checked={addons.includes(addon)} onChange={handleAddonChange} /> {addon}
              </label>
            ))}
          </div>
          <div><strong>Accessibility:</strong>
            {['Wheelchair access', 'Step-free access', 'Baby changing'].map((item) => (
              <label key={item} style={{ marginRight: '10px' }}>
                <input type="checkbox" value={item} checked={accessibility.includes(item)} onChange={handleAccessibilityChange} /> {item}
              </label>
            ))}
          </div>
          <div>
            <label>
              <input type="checkbox" checked={petFriendlyOnly} onChange={(e) => setPetFriendlyOnly(e.target.checked)} /> Show pet-friendly pools only
            </label>
          </div>
        </div>
      )}

      {/* Results */}
      {filteredPools.map((pool) => (
        <div key={pool.id} style={{ marginBottom: '30px', borderBottom: '1px solid #eee', paddingBottom: '20px' }}>
          <div style={{ position: 'relative', width: '100%', height: '200px' }}>
            <Image src={pool.image} alt={pool.name} layout="fill" objectFit="cover" style={{ borderRadius: '10px' }} />
          </div>
          <h2>{pool.name}</h2>
          <p><strong>Location:</strong> {pool.location}</p>
          <p><strong>Price:</strong> {pool.price}</p>
          <p>{pool.description}</p>
          <p><strong>Rating:</strong> {renderRatingStars(pool.rating)}</p>
          <Link href={`/pool/${pool.id}`}>
            <button style={{ ...buttonStyle, marginTop: '10px' }}>View Details</button>
          </Link>
        </div>
      ))}

      <div style={{ marginTop: '40px', textAlign: 'center' }}>
        <Link href="/host">
          <button style={buttonStyle}>Host Your Pool</button>
        </Link>
      </div>
    </div>
  );
}
