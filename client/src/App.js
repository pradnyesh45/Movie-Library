import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./screens/Home";
import NavbarComponent from "./components/NavbarComponent";
import Register from "./screens/Register";
import Login from "./screens/Login";
import { Container } from "react-bootstrap";
import UserContext from "./context/userContext";
import AuthContext from "./context/authContext";
import { useState } from "react";

function App() {
  const [userData, setUserData] = useState({
    token: undefined,
    user: undefined,
  });

  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <div className="App">
      <Container>
        <UserContext.Provider value={{ userData, setUserData }}>
          <AuthContext.Provider value={{ loggedIn, setLoggedIn }}>
            <BrowserRouter>
              <NavbarComponent />
              <Routes>
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/" element={<Home />} />
              </Routes>
            </BrowserRouter>
          </AuthContext.Provider>
        </UserContext.Provider>
      </Container>
    </div>
  );
}

export default App;
