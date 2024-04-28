import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import fashion from "../images/fashion.png";
import portfolio from "../images/portfolio.png";
import tourism from "../images/tourism.png";
import "../Styles/Template.css";
export default function Template() {
  const [template, setTemplate] = useState(""); // State to track the selected template
  const navigate = useNavigate();

  // Function to handle template selection and navigation
  const handleTemplateSelect = (selectedTemplate) => {
    setTemplate(selectedTemplate);
  };

  // Function to handle form submission and navigation
  const handleNavigate = () => {
    if (template) {
      navigate("/WorkingArea");
    } else {
      // Handle case where no template is selected
      console.error("No template selected!");
    }
  };

  return (
    <div>
      <Navbar home="home" />
      <div className="templateBox">
        <div
          className={`${template == "Fashion" ? "chosen temp1" : "temp1"}`}
          onClick={() => handleTemplateSelect("Fashion")}
        >
          <img src={fashion} alt="Fashion Template" />
          <div className="desc quicksand">
            Stylish fashion, product and branding website.
          </div>
        </div>
        <div
          className={`${template == "Portfolio" ? "chosen temp2" : "temp2"}`}
          onClick={() => handleTemplateSelect("Portfolio")}
        >
          <img src={portfolio} alt="Portfolio Template" />
          <div className="desc quicksand">Simple, impactful portfolio.</div>
        </div>
        <div
          className={`${template == "Services" ? "chosen temp3" : "temp3"}`}
          onClick={() => handleTemplateSelect("Services")}
        >
          <img src={tourism} alt="Tourism Template" />
          <div className="desc quicksand">Elegant website for services</div>
        </div>
      </div>
      <button className="temp-btn" onClick={handleNavigate}>
        Submit
      </button>
    </div>
  );
}
