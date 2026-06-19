import { NavLink, useNavigate, useLocation } from "react-router-dom";

/**
 * Nav — Fixed top navigation bar with route links.
 */
export default function Nav({ name, links }) {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNameClick = (e) => {
    // Always dispatch a reset event so pages clear inline reader state
    window.dispatchEvent(new Event("nav-home"));
    // If already on home, prevent default NavLink behavior and force scroll to top
    if (location.pathname === "/") {
      e.preventDefault();
      window.scrollTo(0, 0);
    }
  };

  return (
    <nav className="nav" id="nav-bar">
      <NavLink to="/" className="nav__name" onClick={handleNameClick}>{name}</NavLink>
      <div className="nav__links">
        {links.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            className={({ isActive }) =>
              `nav__link ${isActive ? "nav__link--active" : ""}`
            }
          >
            {link.label}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
