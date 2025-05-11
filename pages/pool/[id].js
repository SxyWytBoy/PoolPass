// pages/pool/[id].js
import { useRouter } from 'next/router';
import Link from 'next/link';
import Image from 'next/image'; // ✅ 1. Import the Image component

const pools = [
  {
    id: 1,
    name: 'Luxury Hotel Pool',
    location: 'London',
    price: '£25',
    description: 'Access to rooftop infinity pool with towels included.',
    extras: 'Includes free welcome drink and rooftop bar access.',
    image: 'https://images.unsplash.com/photo-1549394121-23f44e00702b', // Example image
  },
  {
    id: 2,
    name: 'Countryside B&B Pool',
    location: 'Somerset',
    price: '£15',
    description: 'Peaceful outdoor pool with countryside views.',
    extras: 'Access to garden and free tea/coffee.',
    image: 'https://images.unsplash.com/photo-1518709268801-59ab2052f092', // Example image
  },
  {
    id: 3,
    name: 'City Gym Pool',
    location: 'Manchester',
    price: '£10',
    description: 'Indoor heated pool at modern fitness center.',
    extras: 'Includes sauna and locker use.',
    image: 'https://images.unsplash.com/photo-1502921418249-9e6979377c10', // Example image
  },
];

export default function PoolDetail() {
  const router = useRouter();
  const { id } = router.query;

  const pool = pools.find((p) => p.id === parseInt(id));

  if (!pool) return <p>Loading or pool not found...</p>;

  return (
    <div style={{ padding: '20px' }}>
      <Link href="/">← Back to homepage</Link>
      
      {/* ✅ 2. Add responsive image */}
      <div style={{ marginBottom: '20px' }}>
        <Image 
          src={pool.image} 
          alt={pool.name} 
          width={600} 
          height={400} 
          layout="responsive" 
          objectFit="cover" 
        />
      </div>

      <h1>{pool.name}</h1>
      <p><strong>Location:</strong> {pool.location}</p>
      <p><strong>Price:</strong> {pool.price}</p>
      <p>{pool.description}</p>
      <p><strong>Extras:</strong> {pool.extras}</p>

      <Link
        href={{
          pathname: '/booking',
          query: { pool: pool.name },
        }}
      >
        <button style={{ marginTop: '20px' }}>Book This Pool</button>
      </Link>
    </div>
  );
}
