import { useState } from 'react';

export default function Home() {
  const [selectedPool, setSelectedPool] = useState(null);
  const [search, setSearch] = useState('');

  const pools = [
    {
      id: 1,
      name: "The Grand Spa Hotel",
      location: "Bath",
      price: "£25/day",
      image: "https://source.unsplash.com/400x200/?pool,hotel"
    },
    {
      id: 2,
      name: "Private Garden Pool",
      location: "Surrey",
      price: "£15/day",
      image: "https://source.unsplash.com/400x200/?pool,garden"
    }
  ];

  const filteredPools = pools.filter(pool =>
    pool.name.toLowerCase().includes(search.toLowerCase()) ||
    pool.location.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1>🏊 Pool Pass</h1>
      {!selectedPool ? (
        <>
          <input
            placeholder="Search by location or name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{ padding: '10px', marginBottom: '20px', width: '100%' }}
          />
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
            {filteredPools.map(pool => (
              <div
                key={pool.id}
                onClick={() => setSelectedPool(pool)}
                style={{
                  border: '1px solid #ccc',
                  borderRadius: '10px',
                  cursor: 'pointer',
                  width: '300px',
                  overflow: 'hidden'
                }}
              >
                <img src={pool.image} alt={pool.name} style={{ width: '100%' }} />
                <div style={{ padding: '10px' }}>
                  <h2>{pool.name}</h2>
                  <p>{pool.location}</p>
                  <p>{pool.price}</p>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <div>
          <button onClick={() => setSelectedPool(null)} style={{ marginBottom: '20px' }}>← Back</button>
          <img src={selectedPool.image} alt={selectedPool.name} style={{ width: '100%', borderRadius: '10px' }} />
          <h2>{selectedPool.name}</h2>
          <p>Location: {selectedPool.location}</p>
          <p>Price: {selectedPool.price}</p>
        </div>
      )}
    </div>
  );
}
