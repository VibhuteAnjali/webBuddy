import { useState } from "react";
import { AddAnswers } from "../Context/AnswerContext";
import "../Styles/Questions.css";
export default function Question4() {
  const { setAnswers } = AddAnswers();
  const [logo, setLogo] = useState("Logo");
  const quesNo = "logo";

  function handleSubmit(e) {
    e.preventDefault();

    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [quesNo]: logo,
    }));
  }
  return (
    <div>
      <div className="box1">
        <div className="text-heading lora">
          <h3>What&apos;s your Website Logo?</h3>
          <p>To help us understand your website..</p>
        </div>
        <div className="ans quicksand">
          <form onSubmit={handleSubmit}>
            <input
              className="inputT"
              type="text"
              value={logo}
              onChange={(e) => setLogo(e.target.value)}
            />
            <button className="btn">Done</button>
          </form>
        </div>
      </div>
    </div>
  );
}
