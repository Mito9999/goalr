import Head from "next/head";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import firebaseApp, { logOut } from "../firebase/clientApp";

export default function Account() {
  const [user, loading] = useAuthState(getAuth(firebaseApp));

  return (
    <div className="flex flex-col w-container mx-auto px-3 font-inter">
      <Head>
        <title>Account - Goalr</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div className="flex flex-col">
          <h2
            className={`text-xl w-max ${
              user
                ? "text-red-500  cursor-pointer"
                : "text-gray-300 cursor-not-allowed"
            }`}
            onClick={() => {
              if (user) logOut();
            }}
          >
            Log out
          </h2>
          <h1 className="text-3xl font-bold mb-4">Account</h1>
          {loading ? (
            "Loading..."
          ) : user ? (
            <>
              <h4 className="text-md opacity-50">Nickname</h4>
              <p className="text-lg font-medium mb-4">{user.displayName}</p>
              <h4 className="text-md opacity-50">Email</h4>
              <p className="text-lg font-medium mb-4">{user.email}</p>
              <h4 className="text-md opacity-50">Last Login</h4>
              <p className="text-lg font-medium mb-4">
                {new Date(user.metadata.lastSignInTime).toLocaleString(
                  undefined,
                  {
                    year: "2-digit",
                    month: "numeric",
                    day: "numeric",
                    hour: "numeric",
                    minute: "numeric",
                  }
                )}
              </p>
              <h4 className="text-md opacity-50">Account Created</h4>
              <p className="text-lg font-medium mb-4">
                {new Date(user.metadata.creationTime).toLocaleString(
                  undefined,
                  {
                    year: "2-digit",
                    month: "numeric",
                    day: "numeric",
                    hour: "numeric",
                    minute: "numeric",
                  }
                )}
              </p>
            </>
          ) : (
            <>Sign up or log in to view account.</>
          )}
        </div>
      </main>
    </div>
  );
}
