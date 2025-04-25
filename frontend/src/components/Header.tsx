import { Link } from "react-router-dom";
import { ModeToggle } from "./ModeToggle";

export default function Header() {
  return (
    <nav className="container">
      <ul className="centered-row">
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/favorites">Favorites</Link>
        </li>

        <li className="group gap-5">
          <ModeToggle />
          <Link to="/login">Login</Link>
        </li>
      </ul>
    </nav>
  );
}
