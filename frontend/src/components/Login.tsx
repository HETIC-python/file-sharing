import { FormEvent, useState } from "react";
import { API_URL } from "../utils/api";
import { useNavigate } from "react-router";
import Layout from "./Layout";
async function login(email: string, password: string) {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  });
  if (!response.ok) {
    throw new Error("Failed to login");
  }
  return response.json();
}
const INPUT_WRAPPER_CLASS = "flex flex-col gap-4";
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    console.log("form submitted");
    try {
      setError("");
      const res = await login(email, password);
      if (res?.token) {
        console.log("Success");
        localStorage.setItem("token", res.token);
        navigate("/");
      }
    } catch (error: any) {
      setError(error.message || "Failed to login");
    }
  };
  return (
    <Layout>
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
    </Layout>
  );
}
