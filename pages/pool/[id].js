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
    image: '/images/countryside-pool.jpeg',
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
    return <p className="p-8 text-gray-600">Loading...</p>;
  }

  const renderRatingStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0;
    const stars = [];

    for (let i = 0; i < fullStars; i++) stars.push('★');
    if (halfStar) stars.push('☆');
    while (stars.length < 5) stars.push('☆');

    return stars.join(' ');
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <Link href="/" className="text-blue-600 hover:underline text-sm mb-4 inline-block">
        ← Back to Pools
      </Link>

      <h1 className="text-3xl font-bold mb-4">{pool.name}</h1>

      {/* Image Container */}
      <div className="w-full mb-6 rounded-lg overflow-hidden border border-gray-300">
        <Image
          src={pool.image}
          alt={pool.name}
          width={1200}
          height={600}
          style={{ width: '100%', height: 'auto', objectFit: 'cover' }}
        />
      </div>

      {/* Pool Info */}
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <p className="mb-2"><span className="font-semibold">Location:</span> {pool.location}</p>
        <p className="mb-2"><span className="font-semibold">Price:</span> {pool.price}</p>
        <p className="mb-2"><span className="font-semibold">Type:</span> {pool.type}</p>
        <p className="mb-2"><span className="font-semibold">Available Dates:</span> {pool.availableDates.join(', ')}</p>
        <p className="mb-4"><span className="font-semibold">Rating:</span> <span className="text-yellow-500">{renderRatingStars(pool.rating)}</span></p>
        <p className="mb-4 text-gray-700">{pool.description}</p>

        {/* Book Button */}
        <Link href={`/booking?poolId=${pool.id}`}>
          <button className="mt-4 bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition duration-200">
            Book your PoolPass
          </button>
        </Link>
      </div>

      {/* Reviews */}
      <div className="mt-6">
        <h2 className="text-xl font-semibold mb-4">Reviews</h2>
        {pool.reviews.map((review, index) => (
          <div key={index} className="mb-4 p-4 bg-gray-100 rounded-md">
            <p className="font-medium">{review.user}</p>
            <p className="text-yellow-500">{renderRatingStars(review.rating)}</p>
            <p className="text-gray-700 mt-1">{review.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
