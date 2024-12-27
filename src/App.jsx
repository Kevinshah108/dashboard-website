import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Form from "./pages/Form";
import Navbar from "./components/Navbar";

function App() {
  <Navigate to="/dashboard" />;
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/form" element={<Form/>} />
      </Routes>
    </Router>
  );
}

export default App;
