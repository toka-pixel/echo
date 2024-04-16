import "./App.css";
import RoutesApp from "./router";
import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "./components/UI/Navbar/Navbar";

function App() {
  return (
    <Router>
      <Navbar />
      <RoutesApp />
    </Router>
  );
}

export default App;
