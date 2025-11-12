import { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import ThemeContext from "../hook/ThemeContext";
import CardContext from "../hook/CardContext";
import { MdLightMode } from "react-icons/md";
import { BsCart4 } from "react-icons/bs";
import { IoMdArrowRoundBack } from "react-icons/io";

const Navbar = ({ setIsLoggedIn, loggedUser, setLoggedUser }) => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { card } = useContext(CardContext);
  const navigate = useNavigate();

  function handleLogout() {
    setIsLoggedIn(false);
    setLoggedUser(null);

    
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("loggedUser");

    navigate("/");
  }

  return (
    <nav
      className={`navbar ${
        theme === "light" ? "navbar-light bg-light" : "navbar-dark bg-dark"
      }`}
    >
      <div className="container-fluid">

        <div className="d-flex justify-content-between align-items-center">
        <Link className="nav-link" to="/">Home</Link>
        <button onClick={() => navigate(-1)} className="btn btn-success btn-sm ms-2">
          <IoMdArrowRoundBack /> Back
        </button>
        </div>
        <div className="d-flex align-items-center">
          {loggedUser ? (
            <>
              <span className="fw-bold text-warning me-3">{loggedUser.name}</span>

              <Link to="/cart" className="d-flex align-items-center me-3">
                <BsCart4 size={22} />
                <span className="badge bg-danger ms-1">{card.length}</span>
              </Link>

              <button className="btn btn-outline-danger" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link className="btn btn-outline-success me-2" to="/register">
                Register
              </Link>
              <Link className="btn btn-outline-success" to="/login">
                Login
              </Link>
            </>
          )}

          <button className="btn btn-dark ms-3" onClick={toggleTheme}>
            <MdLightMode />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
