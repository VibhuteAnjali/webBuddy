import { useState } from "react";
import { AddAnswers } from "../Context/AnswerContext";
import { useNavigate } from "react-router";

export default function QuestionsServices() {
  const [services, setServices] = useState("");
  const [purpose, setPurpose] = useState("");
  const [features, setFeatures] = useState("");
  const [headerpic, setheaderpic] = useState("");
  const navigate = useNavigate();
  const { setAnswers } = AddAnswers();
  function handleSubmit() {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      services: services,
      purpose: purpose,
      features: features,
      prompt: headerpic,
    }));
    navigate("/template");
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <div className="block">
            <p>What kind of Services do you Provide?</p>
            <input
              className="inputT no-gap"
              type="text"
              onChange={(e) => setServices(e.target.value)}
            />
          </div>
          <div className="block">
            <p>What is the main purpose of your service?</p>
            <input
              className="inputT no-gap"
              type="text"
              onChange={(e) => setPurpose(e.target.value)}
            />
          </div>
          <div className="block">
            <p>
              What Image would best represent your sevice?(like &quot;fast
              delivery&quot;)
            </p>
            <input
              className="inputT no-gap"
              type="text"
              onChange={(e) => setFeatures(e.target.value)}
            />
          </div>
          <div className="block">
            <p>What kind of picture would you like on the main page</p>
            <input
              className="inputT no-gap"
              type="text"
              onChange={(e) => setheaderpic(e.target.value)}
            />
          </div>
        </div>
        <button className="btn">Submit</button>
      </form>
    </div>
  );
}
