import { useState, useEffect } from "react";
import "../Styles/Questions.css";

import Navbar from "./Navbar";
import { Progress } from "reactstrap";
import Question1 from "./Question1";
import Question2 from "./Question2";
import Question3 from "./Question3";
import Question4 from "./Question4";

import { useNavigate } from "react-router";
export default function Questions() {
  const [step, setStep] = useState(1);
  const [style, setStyle] = useState("");
  const navigate = useNavigate();
  const progress = Math.round(((step - 1) * 100) / 4);
  useEffect(() => {
    if (step === 5) {
      navigate("/details");
    }
  }, [step, navigate]);
  return (
    <div>
      <Navbar home="home" />
      <div className="mainQ">
        <div className="numbering">
          <div>0</div>
          <div>1</div>
          <div>2</div>
          <div>3</div>
          <div>4</div>
        </div>
        <Progress animated color="#da6a68 !important" value={progress} />
      </div>
      <div className="boxes">
        {step == 1 && <Question1 style={style} setStyle={setStyle} />}
        {step == 2 && <Question2 />}
        {step == 3 && <Question3 />}
        {step == 4 && <Question4 />}
        <div className="btn-box">
          <button onClick={() => setStep(step - 1)}>Previous</button>
          <button
            onClick={(e) => {
              setStep(step + 1);
              console.log(e);
            }}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
