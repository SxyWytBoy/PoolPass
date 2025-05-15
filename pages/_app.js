// pages/_app.js
import '../styles/globals.css';
import Image from 'next/image';
import Link from 'next/link';

export default function App({ Component, pageProps }) {
  return (
    <>
      {/* Header Section */}
      <header className="header">
        <div className="header-logo-wrapper">
          <Link href="/">
            <a aria-label="PoolPass Home">
              <Image
                src="/poolpass_logo.jpeg" // Make sure the filename is lowercase and no spaces
                alt="PoolPass Logo"
                width={300}  // Bigger logo width
                height={100} // Adjust height for aspect ratio
                priority={true}
              />
            </a>
          </Link>
        </div>

        <div className="header-banner-wrapper">
          <Image
            src="/banner.jpg"
            alt="PoolPass Banner"
            width={1200} // Banner width
            height={200} // Thicker banner height
            priority={true}
            objectFit="cover"
          />
        </div>

        <nav className="nav">
          <Link href="/">
            <a>Home</a>
          </Link>
          <Link href="/pools">
            <a>Pools</a>
          </Link>
          <Link href="/contact">
            <a>Contact</a>
          </Link>
        </nav>
      </header>

      {/* Main Content */}
      <main className="container">
        <Component {...pageProps} />
      </main>
    </>
  );
}
