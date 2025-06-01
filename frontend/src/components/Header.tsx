import { Link } from "react-router-dom";
import { ModeToggle } from "./ModeToggle";
import { Bookmark, Home, LogIn, LogOut, User2 } from "lucide-react";
import { useAuth } from "../hooks/useAuth";
export default function Header() {
  const { isAuthenticated, getUsername, removeAuth } = useAuth();

  async function handleLogOut() {
    await removeAuth();
  }

  const username = getUsername();

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
          {isAuthenticated && (
            <Link to="/favorites">
              <div className="group gap-2">
                <p className="hidden sm:block">favorites</p>
                <Bookmark size="20" />
              </div>
            </Link>
          )}
        </li>

        <li className="group gap-8">
          <ModeToggle />
          {isAuthenticated ? (
            <>
              <div className="group gap-2">
                <p className="hidden sm:block">{username}</p>
                <User2 size="20" />
              </div>
              <div className="cursor-pointer" onClick={handleLogOut}>
                <LogOut size="20" color="red" />
              </div>
            </>
          ) : (
            <Link to="/login">
              <div className="group gap-2">
                <p className="hidden sm:block">login</p>
                <LogIn size="20" />
              </div>
            </Link>
          )}
        </li>
      </ul>
    </nav>
  );
}
