// pages/index.js
import Link from 'next/link';
import Image from 'next/image'; // ✅ Import the Image component

const pools = [
  {
    id: 1,
    name: 'Luxury Hotel Pool',
    location: 'London',
    price: '£25',
    description: 'Access to rooftop infinity pool with towels included.',
    image: '/images/luxury-pool.jpg', // ✅ Add an image URL for this pool
  },
  {
    id: 2,
    name: 'Countryside B&B Pool',
    location: 'Somerset',
    price: '£15',
    description: 'Peaceful outdoor pool with countryside views.',
    image: '/images/countryside-pool.jpg', // ✅ Add an image URL for this pool
  },
  {
    id: 3,
    name: 'City Gym Pool',
    location: 'Manchester',
    price: '£10',
    description: 'Indoor heated pool at modern fitness center.',
    image: '/images/city-gym-pool.jpg', // ✅ Add an image URL for this pool
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
            {/* ✅ Add the Image component here */}
            <Image
              src={pool.image}  // Image source from the pool object
              alt={pool.name}    // Alt text for accessibility
              width={600}         // Set the width for the image
              height={400}        // Set the height for the image
              layout="responsive" // Makes the image responsive
              objectFit="cover"   // Ensures the image covers the space without distortion
            />
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
