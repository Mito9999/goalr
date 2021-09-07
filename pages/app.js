import Head from "next/head";
import { LineChart, Line, YAxis, ResponsiveContainer } from "recharts";
import { MdRefresh, MdAdd, MdSettings } from "react-icons/md";
import { useAuthState } from "react-firebase-hooks/auth";
import { getAuth } from "firebase/auth";
import { seedDb } from "../firebase/clientApp";
import { useEffect, useState } from "react";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import Modal from "../components/Modal";

export default function Home() {
  const [user, isUserLoading] = useAuthState(getAuth());
  const [cards, setCards] = useState([]);
  const [isLoadingCards, setIsLoadingCards] = useState(false);
  const [userHasGoals, setUserHasGoals] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [cardInModal, setCardInModal] = useState({});

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
          setUserHasGoals(false);
        }
        setIsLoadingCards(false);
      })();
    }
    console.log(user);
  }, [user]);

  return (
    <div className="flex flex-col max-w-cardContainer mx-auto px-3 font-inter">
      <Head>
        <title>Goalr App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className="my-4 pl-6">
          {user ? (
            <h2 className="text-xl opacity-50">
              Welcome Back, {user.displayName}!
            </h2>
          ) : (
            <h2 className="text-xl opacity-50">Log in to save your goals!</h2>
          )}

          <h1 className="text-3xl font-bold flex">
            Goals{" "}
            {isLoadingCards && (
              <svg
                className="animate-spin h-5 w-5 ml-4 my-auto text-black"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            )}
          </h1>
        </div>
        <div className="flex flex-col max-w-cardContainer mb-8">
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
                <div className="flex-1 h-32">
                  <div className="m-auto w-min">
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
                  </div>
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
                    <button
                      className="text-lg text-white bg-blue-600 rounded-md ml-2 p-3.5"
                      onClick={() => {
                        setCardInModal(card);
                        setShowModal(true);
                      }}
                    >
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
                seedDb(user.uid);
              }}
            >
              <MdAdd />
            </div>
          )}
        </div>
      </main>
      {cardInModal && (
        <Modal
          onClose={() => setShowModal(false)}
          show={showModal}
          title={cardInModal.title}
        >
          <div
            onChange={(e) =>
              setCardInModal((prev) => ({
                ...prev,
                isManualEntry: e.target.value === "manual" ? true : false,
              }))
            }
            className="my-4"
          >
            <h3 className="font-bold mb-2">Type</h3>

            <input
              type="radio"
              id="card-type-manual"
              name="card-type"
              value="manual"
              className="mr-1.5"
              defaultChecked={cardInModal.isManualEntry}
            />
            <label htmlFor="card-type-manual">Manual</label>

            <input
              type="radio"
              id="card-type-auto"
              name="card-type"
              value="auto"
              className="ml-4 mr-1.5"
              defaultChecked={!cardInModal.isManualEntry}
            />
            <label htmlFor="card-type-auto">Auto</label>
          </div>
          <div className="mb-4">
            <h3 className="font-bold mb-2">Goal</h3>

            <input
              type="number"
              value={cardInModal.goal}
              className="border-2 border-gray-200 rounded-md p-2 w-60"
              onChange={(e) =>
                setCardInModal((prev) => ({
                  ...prev,
                  goal: Number(e.target.value),
                }))
              }
            />
          </div>
          <div className="mb-4">
            <h3 className="font-bold mb-2">Units</h3>

            <input
              type="text"
              value={cardInModal.units}
              className="border-2 border-gray-200 rounded-md p-2 w-60"
              onChange={(e) =>
                setCardInModal((prev) => ({ ...prev, units: e.target.value }))
              }
            />
          </div>
          <div className="mb-4">
            <h3 className="font-bold mb-2">Inspiration</h3>
            <textarea
              value={cardInModal.inspiration}
              onChange={(e) =>
                setCardInModal((prev) => ({
                  ...prev,
                  inspiration: e.target.value,
                }))
              }
              className="w-60 p-2 border-2 border-gray-200 rounded-md"
            />
          </div>
          <button
            className="text-lg text-white bg-blue-600 px-8 py-3 rounded-md w-full"
            onClick={() => {
              const newCards = [...cards];
              const oldCardIndex = newCards.findIndex(
                (card) => card.id === cardInModal.id
              );
              newCards[oldCardIndex] = { ...cardInModal };
              setCards(newCards);
              setShowModal(false);
            }}
          >
            Done
          </button>
        </Modal>
      )}
    </div>
  );
}
