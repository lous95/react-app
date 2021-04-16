import { Link, NavLink } from "react-router-dom";

const Navbar = ({ user }) => {
  return (
    <nav className="navbar navbar-expand-sm navbar-light bg-light shadow-sm">
      <div className="container">
        <Link className="navbar-brand" to="/">
          Event<i className="fas fa-crown"></i>App
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarsExample03"
          aria-controls="navbarsExample03"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarsExample03">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <NavLink to="/about" className="nav-link">
                About
              </NavLink>
            </li>
            {user &&
              <li>
                  <NavLink to="/events" className="nav-link">
                    Events
                  </NavLink>
              </li>
            }
          </ul>
          <ul className="navbar-nav ml-auto">
            {!user && (
              <>
                <li className="nav-item">
                  <NavLink to="/signin" className="nav-link">
                    Sign In
                  </NavLink>
                </li>
                <li className="nav-item">
                  <NavLink to="/signup" className="nav-link">
                    Sign Up
                  </NavLink>
                </li>
              </>
            )}
            {user && (
              <li className="nav-item">
                <NavLink to="/myprofile" className="nav-link">
                  My Profile
                </NavLink>
              </li>
            )}
            {user && (
              <li className="nav-item">
                <NavLink to="/logout" className="nav-link">
                  Log Out
                </NavLink>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
