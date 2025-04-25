import { Link } from "react-router-dom";
import { ModeToggle } from "./ModeToggle";
import { Bookmark, Home, LogIn } from "lucide-react";

export default function Header() {
  return (
    <nav className="container">
      <ul className="centered-row">
        <li>
          <Link to="/">
            <div className="group gap-2">
              <p className="hidden sm:block">home</p>
              <Home size="20" />
            </div>
          </Link>
        </li>
        <li>
          <Link to="/favorites">
            <div className="group gap-2">
              <p className="hidden sm:block">favorites</p>
              <Bookmark size="20" />
            </div>
          </Link>
        </li>

        <li className="group gap-8">
          <ModeToggle />
          <Link to="/login">
            <div className="group gap-2">
              <p className="hidden sm:block">login</p>
              <LogIn size="20" />
            </div>
          </Link>
        </li>
      </ul>
    </nav>
  );
}
