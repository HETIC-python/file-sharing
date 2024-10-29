import { FormEvent, useState } from "react";
async function signup(
  email: string,
  password: string,
  fName: string,
  lName: string
) {
  const response = await fetch("http://localhost:3000/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
      fName,
      lName,
    }),
  });
  if (response.status !== 200) {
    throw new Error("Failed to sign up");
  }
  return response.json();
}
const INPUT_WRAPPER_CLASS = "flex flex-col gap-4";
export default function Signup() {
  const [email, setEmail] = useState("");
  const [lName, setLName] = useState("");
  const [fName, setFName] = useState("");
  const [password, setPassword] = useState("");
  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    console.log("form submitted");
    const res = await signup(email, password, fName, lName);
    if (res.success) {
      console.log("Success");
    }
  };
  return (
    <div className="flex justify-center items-center">
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
