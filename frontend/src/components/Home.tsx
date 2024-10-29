import React from "react";

export default function Home() {
  return (
    <div className="grid">
      <Header />
      <FilesList />
    </div>
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
      id: 1,
      name: "file1.txt",
      size: 1024,
    },
    {
      id: 1,
      name: "file1.txt",
      size: 1024,
    },
  ]);

  return (
    <div>
      <ul className="grid">
        {files.map((file) => (
          <li key={file.id}>
            <File file={file} />
          </li>
        ))}
      </ul>
    </div>
  );
}

function File({ file }: { file: IFile }) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <span className="font-bold col-span-1">{file.name}</span>
      <span className="col-span-1">{file.size}</span>
    </div>
  );
}
