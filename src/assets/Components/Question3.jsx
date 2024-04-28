import { useContext, useState } from "react";
import { AddAnswers, AnswersContext } from "../Context/AnswerContext";

export default function Question3() {
  const { answers } = useContext(AnswersContext);
  const { setAnswers } = AddAnswers();
  const quesNo = "About";
  const Type = answers["Type"];
  function handleSubmit(e) {
    e.preventDefault();
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      [quesNo]: about,
    }));
  }

  const [about, setAbout] = useState(""); // Set initial state to an empty string
  return (
    <div>
      <div className="box1">
        <div className="text-heading lora">
          {Type == "Portfolio" ? (
            <>
              <h3>Your Job role</h3>
            </>
          ) : (
            <h3>What&apos;s your Website about?</h3>
          )}
          <p>To help us understand your website..</p>
        </div>
        <div className="ans quicksand">
          <form onSubmit={handleSubmit}>
            <textarea
              name="about"
              cols="80"
              rows="10"
              value={about}
              onChange={(e) => setAbout(e.target.value)}
            ></textarea>
            <button type="submit" className="btn">
              Done
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
