import { FormEvent, useState } from "react";
async function login(email: string, password: string) {
  const response = await fetch("http://localhost:3000/signup", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });
  if (response.status !== 200) {
    throw new Error("Failed to login");
  }
  return response.json();
}
const INPUT_WRAPPER_CLASS = "flex flex-col gap-4";
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    console.log("form submitted");
    const res = await login(email, password);
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
