import logo from "./logo.svg";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./views/Home";
import SignIn from "./components/SignIn";
import DashBoard from "./views/Dashboard";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />         
        <Route path="/SignIn" element={<SignIn />} />
        {/* <Route path="/Register"/> */}
        <Route path='/dashboard' element={<DashBoard />} />
      </Routes>
    </Router>
  );
}

export default App;
