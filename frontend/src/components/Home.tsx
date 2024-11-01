import React, { useEffect } from "react";
import { API_URL } from "../utils/api";
import Layout from "./Layout";
import { token_decoded } from "../utils/auth";
import { useNavigate } from "react-router";

export default function Home() {
  return (
    <Layout>
      <div className="grid gap-10">
        <Header />
        <SharedLinks />
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
  const [files, setFiles] = React.useState<IFile[]>([]);
  const navigate = useNavigate();

  const getFiles = async (userId: number) => {
    try {
      const res = await fetch(`${API_URL}/files/${userId}`, {
        headers: {
          Authorization: `Bearer ${localStorage?.getItem("token")}`,
          "Content-Type": "application/json",
        },
      });
      console.log({ res });
      if (res.status === 403) {
        localStorage.removeItem("token");
        navigate("/login");
      }
      if (!res.ok) {
        throw new Error("Failed to fetch files");
      }
      const data = await res.json();
      setFiles(data);
    } catch (error) {
      console.error(error.message);
    }
  };
  useEffect(() => {
    const token = token_decoded();
    console.log({token});
    if (!token) {
      navigate("/login");
      return
    };
    getFiles(token.id);
  }, []);

  return (
    <div className="flex flex-col gap-5 w-full items-center justify-center">
      <h2 className="font-bolb text-2xl">Your shared links</h2>
      <div className="overflow-x-auto w-full">
        <table className="min-w-full bg-white shadow-md rounded-xl">
          <thead>
            <tr className="bg-blue-gray-100 text-gray-700">
              <th className="py-3 px-4 text-left">name</th>
              <th className="py-3 px-4 text-left">size</th>
            </tr>
          </thead>
          <tbody>
            {files.map((file) => (
              <File key={file.id} file={file} />
            ))}
          </tbody>
        </table>
      </div>
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

const shareFileLink = async (userId: number, fileId: number) => {
  // /sharing_link/:user_id/:file_id
  const res = await fetch(`${API_URL}/sharing_link/${userId}/${fileId}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
      "Content-Type": "application/json",
    },
  });
  if (!res.ok) {
    throw new Error("Failed to share file");
  }
  return res.json();
};

function File({ file }: { file: IFile }) {
  const [copied, setCopied] = React.useState(false);
  // const handleCopyFile = async () => {
  //   try {
  //     setCopied(false);
  //     // const res = await copyFile(file.id);
  //     await copyContent("opopopop");
  //     setCopied(true);
  //   } catch (error: any) {
  //     console.error(error.message);
  //   }
  // };

  const handleShareFile = async () => {
    const token = token_decoded();
    if (!token) return;
    try {
      const res = await shareFileLink(token?.id, file?.id);
      if (res?.link) {
        await copyContent(`${API_URL}${res.link?.link}`);
        setCopied(true);
      }
    } catch (error: any) {
      console.error(error.message);
    }
  };
  return (
    <tr className="border-b border-blue-gray-200">
      <td className="py-3 px-4">{file.name}</td>
      <td className="py-3 px-4">{Math.round((Number(file.size) * (Math.pow(10, 6))))} ko</td>
      <td className="py-3 px-4">
        {copied ? (
          <span onClick={() => setCopied(false)} className="text-green-500">
            Copied
          </span>
        ) : (
          <button
            onClick={handleShareFile}
            className="bg-blue-500 text-white px-2 rounded-xl"
          >
            Share
          </button>
        )}
      </td>
    </tr>
  );
}

const fetchLinks = async (userId: number) => {
  const res = await fetch(`${API_URL}/sharing_links/${userId}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
  if (!res.ok) {
    throw new Error("Failed to fetch links");
  }
  return res.json();
};

function SharedLinks() {
  const [links, setLinks] = React.useState([]);

  useEffect(() => {
    const token = token_decoded();
    if (!token) return;
    fetchLinks(token.id)
      .then((data) => {
        console.log(data);
        setLinks(data?.links);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  if (links?.length === 0) {
    return (
      <>
        <h1>No shared links, you can create by sharing your files</h1>
      </>
    );
  }
  return (
    <div className="flex flex-col gap-5 w-full items-center justify-center">
      <h2 className="font-bolb text-2xl">Your shared links</h2>
      <div className="overflow-x-auto w-full">
        <table className="min-w-full bg-white shadow-md rounded-xl">
          <thead>
            <tr className="bg-blue-gray-100 text-gray-700">
              <th className="py-3 px-4 text-left">Name</th>
              <th className="py-3 px-4 text-left">link</th>
            </tr>
          </thead>
          <tbody className="text-blue-gray-900">
            {links?.map((link: any) => (
              <Link key={link?.id} link={link} />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

const Link = ({ link }: { link: any }) => {
  const [copied, setCopied] = React.useState(false);

  const handleShareFile = async () => {
    const token = token_decoded();
    if (!token) return;
    try {
      await copyContent(`${API_URL}${link.link}`);
      setCopied(true);
    } catch (error: any) {
      console.error(error.message);
    }
  };

  return (
    <tr className="border-b border-blue-gray-200">
      <td className="py-3 px-4">{link?.name || "file"}</td>
      <td className="py-3 px-4">
        {copied ? (
          <span onClick={() => setCopied(false)} className="text-green-500">
            Copied
          </span>
        ) : (
          <button
            onClick={handleShareFile}
            className="bg-blue-500 text-white px-2 rounded-xl"
          >
            Share
          </button>
        )}
      </td>
    </tr>
  );
};
