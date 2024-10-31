import { FormEvent, useState } from "react";
import { API_URL } from "../utils/api";
import { token_decoded } from "../utils/auth";
import Layout from "./Layout";
async function fileupload(file: FormData) {
  const decoded_token = token_decoded() satisfies { userId: string };
  if (!decoded_token) return;
  const response = await fetch(
    `${API_URL}/upload/${decoded_token?.userId || 1}`,
    {
      method: "POST",
      headers: {
        // "Content-Type": "",
        Authorization: "Bearer " + localStorage?.getItem("token"),
      },
      body: file,
    }
  );
  if (response.status !== 200) {
    throw new Error("Failed to sign up");
  }
  return response.json();
}
const INPUT_WRAPPER_CLASS = "flex flex-col gap-4";
export default function Fileupload() {
  const [file, setFile] = useState<File | null>(null);
  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    console.log("form submitted");
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      console.log({ formData, file }, Object.fromEntries(formData.entries()));
      const res = await fileupload(formData);
      if (res.success) {
        console.log("Success");
      }
    }
  };
  return (
    <Layout>
      <div className="flex justify-center items-center">
        <form onSubmit={onSubmit} className="grid gap-6 w-2/4">
          <div className={INPUT_WRAPPER_CLASS}>
            <label htmlFor="email">Email</label>
            <input
              type="file"
              id="email"
              onChange={(e) => {
                if (e.target.files?.[0]) {
                  setFile(e.target.files?.[0]);
                }
              }}
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
