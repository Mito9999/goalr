import Head from "next/head";
import { LineChart, Line, YAxis, ResponsiveContainer } from "recharts";
import { MdRefresh, MdAdd, MdSettings } from "react-icons/md";
import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth } from "firebase/auth";
import { seedDb } from "../firebase/clientApp";
import { useEffect, useState } from "react";
import { doc, getDoc, getFirestore } from "firebase/firestore";

export default function Home() {
  const [user, loading] = useAuthState(getAuth());
  const [cards, setCards] = useState([]);
  const [isLoadingCards, setIsLoadingCards] = useState(false);
  const [userHasGoals, setUserHasGoals] = useState(true);

  useEffect(() => {
    if (user) {
      (async () => {
        setIsLoadingCards(true);
        const db = getFirestore();
        const docRef = doc(db, "userGoals", user.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const goals = docSnap.data().goals;
          setCards(goals);
          if (goals.length === 0) {
            setUserHasGoals(false);
          }
        } else {
          console.log("No document found!");
        }
        setIsLoadingCards(false);
      })();
    }
  }, [user]);

  return (
    <div className="flex flex-col w-cardContainer mx-auto px-3 font-inter">
      <Head>
        <title>Goalr App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className="my-4 pl-6">
          <h2 className="text-xl opacity-50">Welcome Back, Mito!</h2>
          <h1 className="text-3xl font-bold flex">
            Goals{" "}
            {isLoadingCards && (
              <svg
                class="animate-spin h-5 w-5 ml-4 my-auto text-black"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  class="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  stroke-width="4"
                ></circle>
                <path
                  class="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            )}
          </h1>
        </div>
        <div className="flex flex-col w-cardContainer mb-8">
          {!userHasGoals ? (
            <div className="bg-gray-50 my-3 rounded-md p-8 border border-gray-200 flex justify-center items-center text-2xl">
              You haven't set any goals yet. Click below to get started!
            </div>
          ) : (
            cards.map((card) => (
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
                      <YAxis
                        type="number"
                        domain={["dataMin", "dataMax"]}
                        hide
                      />
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
            ))
          )}
          {!isLoadingCards && user && (
            <div
              className="bg-gray-50 my-3 rounded-md p-8 border border-gray-200 flex justify-center items-center text-4xl cursor-pointer"
              onClick={() => {
                console.log("Feature coming soon...");
              }}
            >
              <MdAdd />
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
