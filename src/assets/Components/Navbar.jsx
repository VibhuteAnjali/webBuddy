/* eslint-disable react/prop-types */
import { useNavigate } from "react-router";
import "../Styles/Navbar.css";
export default function Navbar({ main, home }) {
  const navigate = useNavigate();
  return (
    <div id="navbar">
      <ul className="navbar-flex">
        <div className="logo">
          <span className="lora italic">Web</span>{" "}
          <span className="quicksand">buddy.</span>
        </div>
        {main && (
          <button className="gs lora" onClick={() => navigate("/getStarted")}>
            Get Started
          </button>
        )}
        {home && (
          <a href="/" className="link">
            Home
          </a>
        )}
      </ul>
    </div>
  );
}
