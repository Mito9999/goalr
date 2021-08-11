import Head from "next/head";

// // For future use
// const cards = [
//   {
//       title: "Typing",
//       data: [105,94,102,103,100,105],
//       units: "WPM",
//       isManualEntry: false,
//   },
//   {
//       title: "Lifting",
//       data: [150, 150, 155, 160,160,160,165,165,170],
//       units: "LBs",
//       isManualEntry: true,
//   },
// ]

export default function Home() {
  return (
    <div className="flex flex-col w-container mx-auto px-3">
      <Head>
        <title>Goalr</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div
          className="flex items-center justify-between"
          style={{ height: "calc(100vh - 128px)" }}
        >
          <div className="text-6xl font-bold leading-snug">
            <h1>Reach goals.</h1>
            <h1>Get more done.</h1>
            <button className="text-lg font-medium text-white bg-purple-500 py-3 px-8 rounded-md">
              Get Started
            </button>
          </div>
          <div>
            <img src="https://via.placeholder.com/300x500?text=Goalr+demo+here" />
          </div>
        </div>
      </main>
    </div>
  );
}
