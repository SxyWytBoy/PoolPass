// pages/thankyou.js
import Link from 'next/link';

export default function ThankYou() {
  return (
    <div style={{ padding: 20, textAlign: 'center' }}>
      <h1>Thank You!</h1>
      <p>Your pool has been submitted and will appear on Pool Pass soon.</p>
      <Link href="/">
        <a>Back to Home</a>
      </Link>
    </div>
  );
}
