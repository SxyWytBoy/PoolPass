// pages/pool/[id].js
import Image from 'next/image';
import Link from 'next/link';

const pools = [
  // your pools data here, same as before
];

export default function PoolDetail({ pool }) {
  if (!pool) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-8">
        <p className="p-8 text-gray-600">Pool not found.</p>
        <Link href="/">
          <a className="text-blue-600 hover:underline text-sm">← Back to Pools</a>
        </Link>
      </div>
    );
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
      <Link href="/">
        <a className="text-blue-600 hover:underline text-sm mb-4 inline-block">
          ← Back to Pools
        </a>
      </Link>

      <h1 className="text-3xl font-bold mb-4">{pool.name}</h1>

      <div className="w-full mb-6 rounded-lg overflow-hidden border border-gray-300">
        {/* Next.js image without style prop */}
        <Image
          src={pool.image}
          alt={pool.name}
          width={1200}
          height={600}
          objectFit="cover" // use objectFit as a prop instead of style
          sizes="100vw"
          priority={true}
        />
      </div>

      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <p className="mb-2">
          <span className="font-semibold">Location:</span> {pool.location}
        </p>
        <p className="mb-2">
          <span className="font-semibold">Price:</span> {pool.price}
        </p>
        <p className="mb-2">
          <span className="font-semibold">Type:</span> {pool.type}
        </p>
        <p className="mb-2">
          <span className="font-semibold">Available Dates:</span>{' '}
          {pool.availableDates.join(', ')}
        </p>
        <p className="mb-4">
          <span className="font-semibold">Rating:</span>{' '}
          <span className="text-yellow-500">{renderRatingStars(pool.rating)}</span>
        </p>
        <p className="mb-4 text-gray-700">{pool.description}</p>

        <Link href={`/booking?poolId=${pool.id}`}>
          <button className="w-full bg-blue-600 text-white px-6 py-3 rounded-md hover:bg-blue-700 transition duration-200 text-lg font-medium mt-4">
            Book your PoolPass
          </button>
        </Link>
      </div>

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

export async function getStaticPaths() {
  const paths = pools.map((pool) => ({
    params: { id: pool.id.toString() },
  }));

  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const pool = pools.find((p) => p.id.toString() === params.id) || null;

  return {
    props: { pool },
  };
}
