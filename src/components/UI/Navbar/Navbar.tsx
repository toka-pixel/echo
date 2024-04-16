import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav>
      <div className="navContainer">
        <div className="link">
          <NavLink
            to="/"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Home
          </NavLink>
        </div>
        <div className="link">
          <NavLink
            to="/about"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            About
          </NavLink>
        </div>
        <div className="link">
          <NavLink
            to="/echo"
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            Echo
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
