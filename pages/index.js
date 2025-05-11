// pages/index.js
import Link from 'next/link';
import { useState } from 'react';
import Image from 'next/image';

const pools = [
  {
    id: 1,
    name: 'Luxury Hotel Pool',
    location: 'London',
    price: '£25',
    description: 'Access to rooftop infinity pool with towels included.',
    type: 'Luxury',
    image: '/images/luxury-pool.jpg',
    availableDates: ['2025-05-15', '2025-05-16'],
  },
  {
    id: 2,
    name: 'Countryside B&B Pool',
    location: 'Somerset',
    price: '£15',
    description: 'Peaceful outdoor pool with countryside views.',
    type: 'Countryside',
    image: '/images/countryside-pool.jpg',
    availableDates: ['2025-05-14', '2025-05-18'],
  },
  {
    id: 3,
    name: 'City Gym Pool',
    location: 'Manchester',
    price: '£10',
    description: 'Indoor heated pool at modern fitness center.',
    type: 'Gym',
    image: '/images/city-gym-pool.jpg',
    availableDates: ['2025-05-10', '2025-05-12'],
  },
];

export default function Home() {
  const [search, setSearch] = useState('');
  const [type, setType] = useState('');
  const [availableDate, setAvailableDate] = useState('');

  const filteredPools = pools.filter((pool) => {
    const matchesLocation = pool.location.toLowerCase().includes(search.toLowerCase());
    const matchesType = type ? pool.type === type : true;
    const matchesDate = availableDate ? pool.availableDates.includes(availableDate) : true;
    return matchesLocation && matchesType && matchesDate;
  });

  return (
    <div className="container">
      <h1>🏊 Pool Pass</h1>
      <p>Find and book access to pools across the UK</p>

      {/* Search and Filter UI */}
      <div className="filters" style={{ marginBottom: '20px' }}>
        <input
          type="text"
          placeholder="Search by Location"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            padding: '8px',
            width: '300px',
            marginRight: '10px',
            borderRadius: '5px',
            border: '1px solid #ccc',
          }}
        />
        <select
          value={type}
          onChange={(e) => setType(e.target.value)}
          style={{
            padding: '8px',
            marginRight: '10px',
            borderRadius: '5px',
            border: '1px solid #ccc',
          }}
        >
          <option value="">Select Pool Type</option>
          <option value="Luxury">Luxury</option>
          <option value="Countryside">Countryside</option>
          <option value="Gym">Gym</option>
        </select>
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

      {/* Filtered Pools List */}
      <div>
        {filteredPools.map((pool) => (
          <div key={pool.id} className="card" style={{ marginBottom: '30px' }}>
            {/* ✅ Responsive image */}
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
            <Link href={`/pool/${pool.id}`}>
              <button style={{ marginTop: '10px' }}>View Details</button>
            </Link>
          </div>
        ))}
      </div>

      <div style={{ marginTop: '30px', textAlign: 'center' }}>
        <Link href="/host">
          <button>Host Your Pool</button>
        </Link>
      </div>
    </div>
  );
}
