import Link from 'next/link';

export default function Booking({ poolId }) {
  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <Link href="/">
        <a className="text-blue-600 hover:underline text-sm mb-4 inline-block">
          ← Back to Pools
        </a>
      </Link>

      <h1 className="text-3xl font-bold mb-6">Booking PoolPass</h1>

      {poolId ? (
        <p className="mb-4">
          You are booking pool with ID: <strong>{poolId}</strong>
        </p>
      ) : (
        <p className="mb-4 text-red-600">No pool selected for booking.</p>
      )}

      <p className="mt-6 text-gray-600">(Booking form coming soon)</p>
    </div>
  );
}

// This function runs at build time and passes props to the page
export async function getStaticProps(context) {
  // We can't get query parameters at build time,
  // so we return null for poolId to avoid undefined errors
  return {
    props: {
      poolId: null,
    },
  };
}
