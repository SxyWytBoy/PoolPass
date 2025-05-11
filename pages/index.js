// pages/index.js
import Link from 'next/link';

const pools = [
  {
    id: 1,
    name: 'Luxury Hotel Pool',
    location: 'London',
    price: '£25',
    description: 'Access to rooftop infinity pool with towels included.',
  },
  {
    id: 2,
    name: 'Countryside B&B Pool',
    location: 'Somerset',
    price: '£15',
    description: 'Peaceful outdoor pool with countryside views.',
  },
  {
    id: 3,
    name: 'City Gym Pool',
    location: 'Manchester',
    price: '£10',
    description: 'Indoor heated pool at modern fitness center.',
  },
];
<div style={{ marginTop: '20px' }}>
  <Link href="/host">
    <button style={{ padding: '10px 20px', fontSize: '16px' }}>Host Your Pool</button>
  </Link>
</div>

export default function Home() {
  return (
    <div style={{ padding: '20px' }}>
      <h1>Pool Pass</h1>
      <p>Find and book access to pools across the UK</p>

      <div>
        {pools.map((pool) => (
          <div key={pool.id} style={{ border: '1px solid #ccc', padding: '15px', marginBottom: '10px' }}>
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
    </div>
  );
}
