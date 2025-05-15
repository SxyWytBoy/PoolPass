// pages/booking.js
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Booking() {
  const router = useRouter();
  const { poolId } = router.query;

  // Track when router is ready to avoid build-time errors
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (router.isReady) {
      setReady(true);
    }
  }, [router.isReady]);

  if (!ready) {
    // Render a loading state while router params are not available
    return <p className="p-8 text-center text-gray-600">Loading booking details...</p>;
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <Link href="/">
        <a className="text-blue-600 hover:underline text-sm mb-4 inline-block">
          ← Back to Pools
        </a>
      </Link>

      <h1 className="text-3xl font-bold mb-6">Booking PoolPass</h1>

      <p className="mb-4">
        You are booking pool with ID: <strong>{poolId}</strong>
      </p>

      {/* TODO: Add your booking form or payment flow here */}

      <p className="mt-6 text-gray-600">
        (Booking form functionality coming soon)
      </p>
    </div>
  );
}
