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

function File({ file }: { file: IFile }) {
  return (
    <tr>
      <td className="font-bold col-span-1">{file.name}</td>
      <td className="col-span-1">{file.size}</td>
    </tr>
  );
}
