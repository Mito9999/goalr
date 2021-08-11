import Head from "next/head";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col w-container mx-auto px-3 font-inter">
      <Head>
        <title>Goalr</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div
          className="flex items-center justify-between"
          style={{ height: "calc(100vh - 128px)" }}
        >
          <div className="text-6xl font-extrabold leading-snug">
            <h1>Reach goals.</h1>
            <h1>Get more done.</h1>
            <Link href="/app">
              <button className="text-base font-medium text-white bg-blue-600 py-3 px-8 rounded-md">
                Get Started
              </button>
            </Link>
          </div>
          <div>
            <img src="https://via.placeholder.com/300x500?text=Goalr+demo+here" />
          </div>
        </div>
      </main>
    </div>
  );
}
