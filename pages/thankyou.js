import Link from 'next/link';

export default function ThankYou() {
  return (
    <div style={{ padding: 20, textAlign: 'center', fontFamily: 'Arial, sans-serif' }}>
      <h1>Thank You!</h1>
      <p>Your pool has been submitted and will appear on Pool Pass soon.</p>
      <Link href="/">
        <a style={{
          display: 'inline-block',
          marginTop: 20,
          padding: '10px 20px',
          backgroundColor: '#0070f3',
          color: '#fff',
          borderRadius: 5,
          textDecoration: 'none',
        }}>
          Back to Home
        </a>
      </Link>
    </div>
  );
}
