import { useState } from "react";
import { AddAnswers } from "../Context/AnswerContext";
export default function Question2() {
  const [style, setStyle] = useState("");
  const { setAnswers } = AddAnswers();
  const quesNo = "Audience";
  return (
    <div>
      <div className="box1">
        <div className="text-heading lora">
          <h3>What&apos;s your target Audience?</h3>
          <p>
            We&apos;ll provide you with the right way to impress your audience
          </p>
        </div>
        <div className="ans quicksand">
          <div
            className={`${style === "one" ? "active" : "one"}`}
            onClick={() => {
              setStyle("one");
              setAnswers((prevAnswers) => ({
                ...prevAnswers,
                [quesNo]: "Yougsters",
              }));
            }}
          >
            <p>Yougsters</p>
          </div>
          <div
            className={`${style === "two" ? "active" : "two"}`}
            onClick={() => {
              setStyle("two");
              setAnswers((prevAnswers) => ({
                ...prevAnswers,
                [quesNo]: "Business Professionals",
              }));
            }}
          >
            <p>Business Professionals</p>
          </div>
          <div
            className={`${style === "three" ? "active" : "three"}`}
            onClick={() => {
              setStyle("three");
              setAnswers((prevAnswers) => ({
                ...prevAnswers,
                [quesNo]: "General Users",
              }));
            }}
          >
            <p>General Users</p>
          </div>
        </div>
      </div>
    </div>
  );
}
