// pages/thankyou.js
import Link from 'next/link';

export default function ThankYou() {
  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>Thank You!</h1>
      <p>Your pool has been submitted and will appear on Pool Pass soon.</p>
      <Link href="/">
        <button style={{ marginTop: '20px', padding: '10px 20px' }}>Back to Home</button>
      </Link>
    </div>
  );
}
