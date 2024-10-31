import { Link } from "react-router-dom";
import { isAuthenticated } from "../utils/auth";

const normal_links = [
  { label: "Home", href: "/" },
  { label: "Signup", href: "/signup" },
  { label: "Signin", href: "/login" },
];

const authLinks = [
  { label: "Home", href: "/" },
  { label: "File upload", href: "/fileupload" },
];
export default function Navbar() {
  const authenticated = isAuthenticated();
  const links = authenticated ? authLinks : normal_links;
  return (
    <nav className="flex justify-between items-center">
      <p className="text-white bg-teal-500 rounded-xl px-4 py-2 w-1/5 select-none">
        SHAREPOINT
      </p>
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
