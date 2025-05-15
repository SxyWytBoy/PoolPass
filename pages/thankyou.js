import Link from 'next/link';

export default function ThankYou() {
  return (
    <div style={{ padding: '40px', textAlign: 'center' }}>
      <h1>Thank You!</h1>
      <p>Your pool has been submitted and will appear on Pool Pass soon.</p>
      <Link href="/">
        <a>
          <button
            type="button"
            style={{
              marginTop: '20px',
              padding: '12px 24px',
              fontSize: '16px',
              cursor: 'pointer',
              borderRadius: '6px',
              border: 'none',
              backgroundColor: '#0070f3',
              color: 'white',
            }}
          >
            Back to Home
          </button>
        </a>
      </Link>
    </div>
  );
}
