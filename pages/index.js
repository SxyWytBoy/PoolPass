// pages/index.js
import Link from 'next/link';
import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router'; // ✅ Added to detect query param

const pools = [
  // ... your existing pool objects
];

export default function Home() {
  const [search, setSearch] = useState('');
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [availableDate, setAvailableDate] = useState('');
  const [showSuccess, setShowSuccess] = useState(false); // ✅
  const router = useRouter(); // ✅

  useEffect(() => {
    if (router.query.submitted === 'true') {
      setShowSuccess(true);
      // Hide message after 4 seconds
      setTimeout(() => {
        setShowSuccess(false);
        // Clean URL by removing query param
        router.replace('/', undefined, { shallow: true });
      }, 4000);
    }
  }, [router]);

  const handleTypeChange = (event) => {
    const value = event.target.value;
    setSelectedTypes((prevSelectedTypes) =>
      prevSelectedTypes.includes(value)
        ? prevSelectedTypes.filter((type) => type !== value)
        : [...prevSelectedTypes, value]
    );
  };

  const filteredPools = pools.filter((pool) => {
    const matchesLocation = pool.location.toLowerCase().includes(search.toLowerCase());
    const matchesType = selectedTypes.length > 0 ? selectedTypes.includes(pool.type) : true;
    const matchesDate = availableDate ? pool.availableDates.includes(availableDate) : true;
    return matchesLocation && matchesType && matchesDate;
  });

  const renderRatingStars = (rating) => {
    const fullStars = Math.floor(rating);
    const halfStars = rating % 1 !== 0;
    let stars = [];

    for (let i = 0; i < fullStars; i++) {
      stars.push('★');
    }

    if (halfStars) {
      stars.push('☆');
    }

    while (stars.length < 5) {
      stars.push('☆');
    }

    return stars.join(' ');
  };

  return (
    <div className="container">
      <h1>🏊 Pool Pass</h1>
      <p>Find and book access to pools across the UK</p>

      {/* ✅ Success Message */}
      {showSuccess && (
        <div style={{
          backgroundColor: '#d4edda',
          color: '#155724',
          padding: '12px',
          borderRadius: '5px',
          border: '1px solid #c3e6cb',
          marginBottom: '20px',
        }}>
          ✅ Your pool has been submitted successfully!
        </div>
      )}

      {/* Search and Filter UI */}
      <div className="filters" style={{ marginBottom: '20px' }}>
        {/* Search by Location */}
        <input
          type="text"
          placeholder="Search by Location"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            padding: '8px',
            width: '300px',
            marginRight: '10px',
            borderRadius: '5px',
            border: '1px solid #ccc',
          }}
        />

        {/* Pool Type Filter */}
        <div style={{ position: 'relative' }}>
          <button
            style={{
              padding: '8px',
              marginRight: '10px',
              borderRadius: '5px',
              border: '1px solid #ccc',
            }}
            onClick={() => {
              const dropdown = document.getElementById('type-dropdown');
              dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
            }}
          >
            Select Pool Type
          </button>
          <div
            id="type-dropdown"
            style={{
              position: 'absolute',
              backgroundColor: 'white',
              boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.2)',
              display: 'none',
              zIndex: 1,
              padding: '10px',
              borderRadius: '5px',
              width: '200px',
            }}
          >
            {['Hotel Pool', 'Public Pool', 'Gym Pool', 'Private Pool'].map((type) => (
              <div key={type} style={{ marginBottom: '10px' }}>
                <input
                  type="checkbox"
                  value={type}
                  checked={selectedTypes.includes(type)}
                  onChange={handleTypeChange}
                  id={type}
                  style={{ marginRight: '10px' }}
                />
                <label htmlFor={type} style={{ cursor: 'pointer' }}>{type}</label>
              </div>
            ))}
          </div>
        </div>

        {/* Date Picker */}
        <input
          type="date"
          value={availableDate}
          onChange={(e) => setAvailableDate(e.target.value)}
          style={{
            padding: '8px',
            borderRadius: '5px',
            border: '1px solid #ccc',
          }}
        />
      </div>

      {/* Display Pools */}
      <div>
        {filteredPools.map((pool) => (
          <div key={pool.id} className="card" style={{ marginBottom: '20px' }}>
            <div style={{ position: 'relative', width: '100%', height: '200px', marginBottom: '15px' }}>
              <Image
                src={pool.image}
                alt={pool.name}
                layout="fill"
                objectFit="cover"
                style={{ borderRadius: '10px' }}
              />
            </div>
            <h2>{pool.name}</h2>
            <p><strong>Location:</strong> {pool.location}</p>
            <p><strong>Price:</strong> {pool.price}</p>
            <p>{pool.description}</p>
            <p><strong>Rating:</strong> {renderRatingStars(pool.rating)}</p>
            <div>
              <strong>Reviews:</strong>
              {pool.reviews.map((review, index) => (
                <div key={index} style={{ marginBottom: '10px' }}>
                  <p><strong>{review.user}</strong>: {review.comment}</p>
                  <p>{renderRatingStars(review.rating)}</p>
                </div>
              ))}
            </div>
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
