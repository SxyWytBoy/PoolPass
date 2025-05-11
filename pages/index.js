// pages/index.js
import Link from 'next/link';
import Image from 'next/image';

const pools = [
  {
    id: 1,
    name: 'Luxury Hotel Pool',
    location: 'London',
    price: '£25',
    description: 'Access to rooftop infinity pool with towels included.',
    image: '/images/luxury-pool.jpg',
  },
  {
    id: 2,
    name: 'Countryside B&B Pool',
    location: 'Somerset',
    price: '£15',
    description: 'Peaceful outdoor pool with countryside views.',
    image: '/images/countryside-pool.jpg',
  },
  {
    id: 3,
    name: 'City Gym Pool',
    location: 'Manchester',
    price: '£10',
    description: 'Indoor heated pool at modern fitness center.',
    image: '/images/city-gym-pool.jpg',
  },
];

export default function Home() {
  return (
    <div className="container">
      <h1>🏊 Pool Pass</h1>
      <p>Find and book access to pools across the UK</p>

      <div>
        {pools.map((pool) => (
          <div key={pool.id} className="card">
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
