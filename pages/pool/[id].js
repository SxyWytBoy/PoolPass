// pages/pool/[id].js
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';

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
    rating: 4.5,
    reviews: [
      { user: 'John Doe', comment: 'Amazing experience!', rating: 5 },
      { user: 'Jane Smith', comment: 'Lovely pool.', rating: 4 },
    ],
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
    rating: 3.8,
    reviews: [
      { user: 'Alice Brown', comment: 'Relaxing place!', rating: 4 },
      { user: 'Bob White', comment: 'Great view.', rating: 3 },
    ],
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
    rating: 4.2,
    reviews: [
      { user: 'Sarah Green', comment: 'A bit small.', rating: 3 },
      { user: 'Tom Clark', comment: 'Perfect for after the gym!', rating: 5 },
    ],
  },
];

export default function PoolDetail() {
  const router = useRouter();
  const { id } = router.query;

  const pool = pools.find((p) => p.id === parseInt(id));

  if (!pool) {
    return <p>Loading...</p>;
  }

  const renderRatingStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStars = rating % 1 !== 0;
    let stars = [];

    for (let i = 0; i < fullStars; i++) stars.push('★');
    if (halfStars) stars.push('☆');
    while (stars.length < 5) stars.push('☆');

    return stars.join(' ');
  };

  return (
    <div className="container" style={{ padding: '20px' }}>
      <Link href="/">← Back to Pools</Link>

      <h1>{pool.name}</h1>
      <div style={{ position: 'relative', width: '100%', height: '300px', marginBottom: '20px' }}>
        <Image
          src={pool.image}
          alt={pool.name}
          layout="fill"
          objectFit="cover"
          style={{ borderRadius: '10px' }}
        />
      </div>

      <p><strong>Location:</strong> {pool.location}</p>
      <p><strong>Price:</strong> {pool.price}</p>
      <p><strong>Description:</strong> {pool.description}</p>
      <p><strong>Type:</strong> {pool.type}</p>
      <p><strong>Available Dates:</strong> {pool.availableDates.join(', ')}</p>
      <p><strong>Rating:</strong> {renderRatingStars(pool.rating)}</p>

      <h3>Reviews</h3>
      {pool.reviews.map((review, index) => (
        <div key={index} style={{ marginBottom: '10px' }}>
          <p><strong>{review.user}:</strong> {review.comment}</p>
          <p>{renderRatingStars(review.rating)}</p>
        </div>
      ))}
    </div>
  );
}
