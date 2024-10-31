import React from "react";
import { API_URL } from "../utils/api";
import Layout from "./Layout";

export default function Home() {
  return (
    <Layout>
      <div className="grid">
        <Header />
        <FilesList />
      </div>
    </Layout>
  );
}

function Header() {
  return (
    <header>
      <h1>Welcome</h1>
    </header>
  );
}

type IFile = {
  id: number;
  name: string;
  size: number;
};

function FilesList() {
  const [files, setFiles] = React.useState<IFile[]>([
    {
      id: 1,
      name: "file1111.txt",
      size: 1024,
    },
    {
      id: 2,
      name: "file1.txt",
      size: 1024,
    },
    {
      id: 3,
      name: "file100000.txt",
      size: 1024,
    },
  ]);

  return (
    <div>
      <table className="table-auto">
        <thead>
          <tr>
            <th>name</th>
            <th>size</th>
          </tr>
        </thead>
        <tbody>
          {files.map((file) => (
            <File key={file.id} file={file} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

const copyContent = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text);
    console.log("Content copied to clipboard");
  } catch (err) {
    console.error("Failed to copy: ", err);
  }
};

const copyFile = async (fileId: number) => {
  const res = await fetch(`${API_URL}/file/copy/${fileId}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) {
    throw new Error("Failed to copy file");
  }
  return res.json();
};
function File({ file }: { file: IFile }) {
  const [copied, setCopied] = React.useState(false);
  const handleCopyFile = async () => {
    try {
      setCopied(false);
      // const res = await copyFile(file.id);
      await copyContent("opopopop");
      setCopied(true);
    } catch (error: any) {
      console.error(error.message);
    }
  };
  return (
    <tr>
      <td className="font-bold col-span-1 mr-2">{file.name}</td>
      <td className="col-span-1">{file.size}</td>
      <td className="col-span-1">
        {copied ? (
          <span onClick={() => setCopied(false)} className="text-green-500">
            Copied
          </span>
        ) : (
          <button
            onClick={handleCopyFile}
            className="bg-blue-500 text-white px-2 rounded-xl"
          >
            Share
          </button>
        )}
      </td>
    </tr>
  );
}
