import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoginPage = ({ setIsLoggedIn, setLoggedUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [registerUser, setRegisterUser] = useState(null);

  const navigate = useNavigate();

  
  function getDataFromLocalStorage() {
    const savedUser = JSON.parse(localStorage.getItem("b63User"));
    setRegisterUser(savedUser);
  }

   const inputRef11 = useRef(null)
  function handleFocus(){
     inputRef11.current.focus()
  }

  useEffect(() => {
    getDataFromLocalStorage();
      handleFocus()
  }, []);

  function handleLogin(e) {
    e.preventDefault();

    if (!registerUser) {
      toast.error("No registered user found. Please register first.");
      return;
    }

    if (email !== registerUser.email) {
      toast.error("Email not registered");
    } else if (password !== registerUser.password) {
      toast.error("Invalid password");
    } else {
      toast.success("Login successful!");
      setLoggedUser(registerUser);
      setIsLoggedIn(true);
      navigate("/");
    }
  }

  return (
    <section>
      <div className="container py-5 mt-5">
        <div className="row mx-auto">
          <div className="col-12 col-md-6 text-center">
            <div className="w-50 mx-auto bg-secondary rounded-circle" style={{ aspectRatio: "1" }}></div>
          </div>

          <div className="col-12 col-md-6">
            <form className="w-75 border rounded p-5 bg-warning mx-auto" onSubmit={handleLogin}>
              <h3 className="mb-4 text-center">Login Here</h3>

              <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">
                  Email address
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="exampleInputEmail1"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                   ref={inputRef11}
                />
              </div>

              <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="exampleInputPassword1"
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <button type="submit" className="btn btn-primary w-100">
                Login
              </button>

              <div className="text-center mt-3">
                <Link to="/register">If not registered, click here</Link>
              </div>
            </form>
          </div>
        </div>
      </div>

      <ToastContainer position="top-center" />
    </section>
  );
};

export default LoginPage;
