import { Link } from "react-router-dom";

const links = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Signup", href: "/signup" },
  { label: "Signin", href: "/login" },
  { label: "File upload", href: "/fileupload" },
];

export default function Navbar() {
  return (
    <nav>
      <ul className="flex gap-4">
        {links.map(({ label, href }) => (
          <li key={href}>
            <Link to={href}>{label}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
