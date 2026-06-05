import { NavLink } from "react-router-dom";

/**
 * Nav — Fixed top navigation bar with route links.
 */
export default function Nav({ name, links }) {
  return (
    <nav className="nav" id="nav-bar">
      <NavLink to="/" className="nav__name">{name}</NavLink>
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
