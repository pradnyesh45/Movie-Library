import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./screens/Home";
import NavbarComponent from "./components/NavbarComponent";
import Register from "./screens/Register";
import Login from "./screens/Login";
import { Container } from "react-bootstrap";

function App() {
  return (
    <div className="App">
      <Container>
        <BrowserRouter>
          <NavbarComponent />
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Home />} />
          </Routes>
        </BrowserRouter>
      </Container>
    </div>
  );
}

export default App;
