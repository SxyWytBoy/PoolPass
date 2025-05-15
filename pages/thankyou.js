// pages/thankyou.js
import Link from 'next/link';

export default function ThankYou() {
  return (
    <div style={{ maxWidth: 600, margin: '40px auto', padding: 20, textAlign: 'center' }}>
      <h1 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: 20 }}>Thank You!</h1>
      <p style={{ marginBottom: 30 }}>
        Your pool has been submitted and will appear on Pool Pass soon.
      </p>
      <Link href="/">
        <a
          style={{
            display: 'inline-block',
            backgroundColor: '#0070f3',
            color: '#fff',
            padding: '12px 24px',
            borderRadius: 6,
            textDecoration: 'none',
            fontWeight: '600',
            cursor: 'pointer',
            userSelect: 'none',
          }}
        >
          Back to Home
        </a>
      </Link>
    </div>
  );
}
