// pages/thankyou.js
import Link from 'next/link';

export default function ThankYou() {
  return (
    <div style={{ maxWidth: '600px', margin: '40px auto', padding: '20px', textAlign: 'center' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '20px' }}>Thank You!</h1>
      <p style={{ marginBottom: '30px' }}>
        Your pool has been submitted and will appear on Pool Pass soon.
      </p>
      <Link href="/">
        <a
          style={{
            display: 'inline-block',
            backgroundColor: '#0070f3',
            color: '#fff',
            padding: '12px 24px',
            borderRadius: '6px',
            textDecoration: 'none',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'background-color 0.3s ease',
          }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#005bb5')}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#0070f3')}
        >
          Back to Home
        </a>
      </Link>
    </div>
  );
}
