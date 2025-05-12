// pages/_app.js
import '../styles/globals.css';
import Image from 'next/image'; // Import Image for Next.js image optimization
import Link from 'next/link';   // Import Link for navigation

export default function App({ Component, pageProps }) {
  return (
    <>
      {/* Header Section */}
      <header className="header">
        <Link href="/">
          <Image
            src="/PoolPass Logo.jpeg" // Path to your logo image
            alt="PoolPass Logo"
            width={200} // Adjust width to make the logo bigger
            height={60} // Adjust height for correct aspect ratio
          />
        </Link>
        <nav className="nav">
          {/* Add your navigation links here */}
        </nav>
      </header>

      {/* Main Content of the Page */}
      <main className="container">
        <Component {...pageProps} />
      </main>
    </>
  );
}
