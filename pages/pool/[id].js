import { useRouter } from 'next/router';

export default function PoolDetail({ pool }) {
  const router = useRouter();

  // Show loading state if fallback is enabled (optional)
  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  if (!pool) {
    return <div>Pool not found</div>;
  }

  return (
    <div style={{ padding: '20px' }}>
      <h1>{pool.name}</h1>
      <p>{pool.description}</p>
      {/* Render other pool details */}
    </div>
  );
}

// Fetch data for each request
export async function getServerSideProps(context) {
  const { id } = context.params;

  // Replace this with your actual data fetching method or API call
  // Example: fetch pool data from local JSON or external API
  const pools = [
    { id: '1', name: 'Sunny Pool', description: 'A lovely sunny pool.' },
    { id: '2', name: 'Shady Pool', description: 'A pool in the shade.' },
  ];

  const pool = pools.find((p) => p.id === id) || null;

  if (!pool) {
    return {
      notFound: true,
    };
  }

  return {
    props: { pool }, // will be passed to the page component as props
  };
}
