import "tailwindcss/tailwind.css";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const route = router.pathname;

  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@100;200;300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </Head>

      <header className="h-16 w-container mx-auto px-5 text-black text-lg flex font-inter">
        <Link href="/">
          <div className={`mx-3 cursor-pointer flex items-center font-bold`}>
            Goalr
          </div>
        </Link>
        <Link href="/dashboard">
          <div className={`mx-3 cursor-pointer flex items-center`}>
            Dashboard
          </div>
        </Link>
        <Link href="/signup">
          <div className={`mx-3 ml-auto cursor-pointer flex items-center`}>
            Sign Up
          </div>
        </Link>
        <Link href="/login">
          <div className={`mx-3 cursor-pointer flex items-center`}>Login</div>
        </Link>
      </header>
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
