import { useState, useRef, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Dashboard from "./pages/Dashboard";
import LoginPage from "./pages/LoginPage";
import RigesterPage from "./pages/RigesterPage";
import Cart from "./pages/Cart";
import ThemeProvider from "./hook/ThemProvider";
import ProductDetails from "./components/ProductDetails";
import BestSeller from "./components/BestSeller";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem("isLoggedIn") === "true";
  });

  const [loggedUser, setLoggedUser] = useState(() => {
    const storedUser = localStorage.getItem("loggedUser");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const highestProdRef = useRef(null);
  const goToTopRef = useRef(null);

  function GotoHighestSProd() {
    highestProdRef.current.scrollIntoView({ behavior: "smooth" });
  }

  function GotoTopFunc() {
    goToTopRef.current.scrollIntoView({ behavior: "smooth" });
  }

  useEffect(() => {
    localStorage.setItem("isLoggedIn", isLoggedIn);
  }, [isLoggedIn]);

  useEffect(() => {
    if (loggedUser) {
      localStorage.setItem("loggedUser", JSON.stringify(loggedUser));
    } else {
      localStorage.removeItem("loggedUser");
    }
  }, [loggedUser]);

  return (
    <BrowserRouter>
      <ThemeProvider>
        <div ref={goToTopRef}></div>

        <Navbar
          setIsLoggedIn={setIsLoggedIn}
          loggedUser={loggedUser}
          setLoggedUser={setLoggedUser}
        />

        <Routes>
          <Route path="/" element={<Dashboard onApplyClick={GotoHighestSProd} />} />
          <Route path="/login" element={<LoginPage setIsLoggedIn={setIsLoggedIn} setLoggedUser={setLoggedUser} />} />
          <Route path="/register" element={<RigesterPage />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/productdetails/:id" element={<ProductDetails />} />
        </Routes>

        <div ref={highestProdRef}>
          <BestSeller />
        </div>

        <div
          style={{
            backgroundColor: "red",
            width: "70px",
            height: "70px",
            borderRadius: "50%",
            textAlign: "center",
            paddingTop: "20px",
            position: "fixed",
            bottom: "40px",
            right: "40px",
            cursor: "pointer",
            color: "white",
            fontWeight: "bold",
            zIndex: "100",
          }}
          onClick={GotoTopFunc}
        >
          Top
        </div>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
