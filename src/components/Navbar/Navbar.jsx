import {Link } from "react-router-dom";
import "./Navbar.css";
const Navbar = () => {
  return (
    <nav className="navbar">
      <h1 className="title">Jeu de Mémoire</h1>
      <div className="nav-links">
        <Link to="/" className="nav-link">
          Jeu
        </Link>
        <Link to="/settings" className="nav-link">
          Paramètres
        </Link>
        <Link to="/history" className="nav-link">
          Historique
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
