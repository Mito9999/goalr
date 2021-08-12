import { createUserWithEmail } from "../firebase/clientApp";
import { useState } from "react";

export default function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  return (
    <div className="w-container mx-auto flex flex-col items-center justify-center font-inter">
      <h1 className="text-3xl font-bold my-6">Sign Up</h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (password === passwordConfirmation && password.length >= 8) {
            createUserWithEmail(email, password);
          }
        }}
        className="flex flex-col"
      >
        <span className="mb-2 text-xl font-medium">Email</span>
        <input
          className="w-96 h-12 text-base p-2 border-2 border-gray-400 rounded-md mb-4"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <span className="mb-2 text-xl font-medium">Password</span>
        <input
          className="w-96 h-12 text-base p-2 border-2 border-gray-400 rounded-md mb-4"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <span className="mb-2 text-xl font-medium">Confirm Password</span>
        <input
          className="w-96 h-12 text-base p-2 border-2 border-gray-400 rounded-md mb-4"
          type="password"
          value={passwordConfirmation}
          onChange={(e) => setPasswordConfirmation(e.target.value)}
        />
        <button
          type="submit"
          className="text-base font-medium text-white bg-blue-600 py-3 px-8 rounded-md mt-6"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}
