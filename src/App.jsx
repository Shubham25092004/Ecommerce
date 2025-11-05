import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Dashboard from './pages/Dashboard'
import LoginPage from './pages/LoginPage'
import RigesterPage from './pages/RigesterPage'
import Cart from './pages/Cart'
import ThemeProvider from './hook/ThemProvider'
import ProductDetails from './components/ProductDetails'

function App() {

  // ✅ Load from LocalStorage on first render
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    return localStorage.getItem("isLoggedIn") === "true";
  });

  const [loggedUser, setLoggedUser] = useState(() => {
    const storedUser = localStorage.getItem("loggedUser");
    return storedUser ? JSON.parse(storedUser) : null;
  });

  // ✅ Save to LocalStorage when isLoggedIn changes
  useEffect(() => {
    localStorage.setItem("isLoggedIn", isLoggedIn);
  }, [isLoggedIn]);

  // ✅ Save to LocalStorage when loggedUser changes
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

        <Navbar
          setIsLoggedIn={setIsLoggedIn}
          loggedUser={loggedUser}
          setLoggedUser={setLoggedUser}
        />

        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/login" element={<LoginPage setIsLoggedIn={setIsLoggedIn} setLoggedUser={setLoggedUser} />} />
          <Route path="/register" element={<RigesterPage />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/productdetails/:id" element={<ProductDetails />} />
        </Routes>

      </ThemeProvider>
    </BrowserRouter>
  )
}

export default App;
