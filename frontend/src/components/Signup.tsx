import { FormEvent, useState } from "react";
import { API_URL } from "../utils/api";
async function signup(
  email: string,
  password: string,
  fName: string,
  lName: string
) {
  const response = await fetch(`${API_URL}/auth/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
      firstName: fName,
      lastName: lName,
    }),
  });
  if (!response.ok) {
    throw new Error("Failed to sign up");
  }
  return response.json();
}

const INPUT_WRAPPER_CLASS = "flex flex-col gap-4";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [lName, setLName] = useState("");
  const [fName, setFName] = useState("");
  const [error, setError] = useState("");

  const [password, setPassword] = useState("");
  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");
    console.log("form submitted");
    try {
      const res = await signup(email, password, fName, lName);
      if (res?.token) {
        localStorage.setItem("token", res.token);
      }
      if (res.success) {
        console.log("Success");
      }
    } catch (error: any) {
      setError(error.message || "Failed to login");
    }
  };
  return (
    <div className="flex flex-col gap-5 justify-center items-center">
      {error && <div className="text-red-500">{error}</div>}
      <form onSubmit={onSubmit} className="grid gap-6 w-2/4">
        <div className={INPUT_WRAPPER_CLASS}>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className={INPUT_WRAPPER_CLASS}>
          <label htmlFor="fname">Last name</label>
          <input
            type="text"
            id="fname"
            onChange={(e) => setFName(e.target.value)}
          />
        </div>
        <div className={INPUT_WRAPPER_CLASS}>
          <label htmlFor="lname">First name</label>
          <input
            type="text"
            id="lname"
            onChange={(e) => setLName(e.target.value)}
          />
        </div>
        <div className={INPUT_WRAPPER_CLASS}>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className={INPUT_WRAPPER_CLASS}>
          <button
            className="bg-slate-900 rounded-xl p-2 text-white"
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
