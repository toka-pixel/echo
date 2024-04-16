import { Routes, Route, NavLink } from "react-router-dom";
import Home from "../pages/Home";
import About from "../pages/About";
import Echo from "../pages/Echo";

const RoutesApp = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<About />} />
      <Route path="/echo" element={<Echo />} />
    </Routes>
  );
};

export default RoutesApp;
