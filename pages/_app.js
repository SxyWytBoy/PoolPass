// pages/_app.js
import '../styles/globals.css';
import Image from 'next/image';
import Link from 'next/link';

export default function App({ Component, pageProps }) {
  return (
    <>
      <header>
        <Link href="/">
          <a>
            <Image
              src="/poolpass_logo.jpeg" // Make sure file name matches exactly (case sensitive)
              alt="PoolPass Logo"
              width={auto}
              height={160} // Bigger logo height to match CSS
              className="header-logo"
              style={{ width: 'auto', height: '160px' }}
              priority
            />
          </a>
        </Link>

        <Image
          src="/banner.jpg" // Banner image file
          alt="Banner"
          width={1200} // Banner width, adjust as needed
          height={300} // Banner height matches CSS max-height
          className="header-banner"
          priority
        />

        <nav className="nav">
          {/* Add your nav links here */}
        </nav>
      </header>

      <main className="container">
        <Component {...pageProps} />
      </main>
    </>
  );
}
