import Head from "next/head";
import { LineChart, Line, YAxis, ResponsiveContainer } from "recharts";
import { MdRefresh, MdAdd, MdSettings } from "react-icons/md";
import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth } from "firebase/auth";

const cards = [
  {
    title: "Typing",
    data: [
      { value: 92 },
      { value: 105 },
      { value: 94 },
      { value: 102 },
      { value: 103 },
      { value: 100 },
      { value: 106 },
    ],
    goal: 110,
    units: "WPM",
    inspiration: `Don't be pushed around by the fears in your mind. Be led by the dreams in your heart.`,
    isManualEntry: false,
  },
  {
    title: "Lifting",
    data: [
      { value: 150 },
      { value: 150 },
      { value: 155 },
      { value: 160 },
      { value: 160 },
      { value: 160 },
      { value: 165 },
      { value: 165 },
      { value: 170 },
    ],
    goal: 180,
    units: "LBs",
    inspiration: `Live the Life of Your Dreams: Be brave enough to live the life of your dreams according to your vision and purpose instead of the expectations and opinions of others.`,
    isManualEntry: true,
  },
  {
    title: "Income",
    data: [
      { value: 100 },
      { value: 110 },
      { value: 120 },
      { value: 95 },
      { value: 140 },
    ],
    goal: 200,
    units: "$",
    inspiration: `Believe in yourself. You are braver than you think, more talented than you know, and capable of more than you imagine.`,
    isManualEntry: true,
  },
];

export default function Home() {
  const [user, loading, error] = useAuthState(getAuth());
  console.log("Loading: ", loading, " | ", "User: ", user);
  return (
    <div className="flex flex-col w-cardContainer mx-auto px-3 font-inter">
      <Head>
        <title>Goalr App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className="my-4 pl-6">
          <h2 className="text-xl opacity-50">Welcome Back, Mito!</h2>
          <h1 className="text-3xl font-bold">Goals</h1>
        </div>
        <div className="flex flex-col w-cardContainer">
          {cards.map((card) => (
            <div
              key={card.title}
              className="bg-gray-50 my-3 rounded-md p-8 border border-gray-200 flex justify-between items-center"
            >
              <div>
                <h3 className="text-xl font-semibold mb-2">{card.title}</h3>
                <h4 className="text-md opacity-50">Recent</h4>
                <p className="text-lg font-medium">
                  {card.units === "$" && card.units}
                  {card.data[card.data.length - 1].value}{" "}
                  {card.units !== "$" && card.units}
                </p>
                <h4 className="text-md opacity-50">Average</h4>
                <p className="text-lg font-medium">
                  {card.units === "$" && card.units}
                  {card.data
                    .slice(-5)
                    .reduce((acc, cur) => acc + cur.value, 0) /
                    (card.data.length >= 5 ? 5 : card.data.length)}{" "}
                  {card.units !== "$" && card.units}
                </p>
                <h4 className="text-md opacity-50">Goal</h4>
                <p className="text-lg font-medium">
                  {card.units === "$" && card.units}
                  {card.goal} {card.units !== "$" && card.units}
                </p>
              </div>
              <div className="w-96 h-32">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart width={300} height={100} data={card.data}>
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="#8884d8"
                      strokeWidth={2}
                    />
                    <YAxis type="number" domain={["dataMin", "dataMax"]} hide />
                  </LineChart>
                </ResponsiveContainer>
              </div>
              <div className="flex flex-col w-min">
                <div className="flex items-center">
                  {card.isManualEntry ? (
                    <button className="text-lg text-white bg-blue-600 px-8 py-3 rounded-md flex items-center w-max">
                      <MdAdd className="mr-2" />
                      Add Entry
                    </button>
                  ) : (
                    <button className="text-lg text-white bg-blue-600 px-8 py-3 rounded-md flex items-center">
                      <MdRefresh className="mr-2" />
                      Refresh
                    </button>
                  )}
                  <button className="text-lg text-white bg-blue-600 rounded-md ml-2 p-3.5">
                    <MdSettings className="h-6 w-6" />
                  </button>
                </div>
                <div className="mt-4">
                  <h4 className="text-md opacity-50">Remember</h4>
                  <p className="text-lg font-medium" title={card.inspiration}>
                    {card.inspiration.length > (card.isManualEntry ? 95 : 85)
                      ? card.inspiration.substring(
                          0,
                          card.isManualEntry ? 92 : 82
                        ) + "..."
                      : card.inspiration}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
