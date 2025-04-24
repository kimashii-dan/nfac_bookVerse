import { ModeToggle } from "./ModeToggle";

export default function Header() {
  return (
    <nav className="container">
      <ul className="centered-row">
        <li>
          <a href="/">Home</a>
        </li>
        <li>
          <a href="/favorites">Favorites</a>
        </li>
        <li>
          <ModeToggle />
        </li>
        <li>
          <a href="/login">Login</a>
        </li>
      </ul>
    </nav>
  );
}
