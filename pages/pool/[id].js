// pages/pool/[id].js
import { useRouter } from 'next/router';
import Link from 'next/link';

const pools = [
  {
    id: 1,
    name: 'Luxury Hotel Pool',
    location: 'London',
    price: '£25',
    description: 'Access to rooftop infinity pool with towels included.',
    extras: 'Includes free welcome drink and rooftop bar access.',
  },
  {
    id: 2,
    name: 'Countryside B&B Pool',
    location: 'Somerset',
    price: '£15',
    description: 'Peaceful outdoor pool with countryside views.',
    extras: 'Access to garden and free tea/coffee.',
  },
  {
    id: 3,
    name: 'City Gym Pool',
    location: 'Manchester',
    price: '£10',
    description: 'Indoor heated pool at modern fitness center.',
    extras: 'Includes sauna and locker use.',
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
