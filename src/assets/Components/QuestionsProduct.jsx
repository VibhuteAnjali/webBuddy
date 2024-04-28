import { useState } from "react";
import { AddAnswers } from "../Context/AnswerContext";
import { useNavigate } from "react-router";

export default function QuestionsProduct() {
  const [products, setProducts] = useState("");
  const [prompt, setPrompt] = useState("");
  const navigate = useNavigate();
  const { setAnswers } = AddAnswers();
  function handleSubmit() {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      products: products,
      prompt: prompt,
    }));
    navigate("/template");
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <div className="block">
            <p>What kind of products do you sell?</p>
            <input
              className="inputT no-gap"
              type="text"
              onChange={(e) => setProducts(e.target.value)}
            />
          </div>
        </div>
        <div>
          <div className="block">
            <p>What picture would you like on your cover page?</p>
            <input
              className="inputT no-gap"
              type="text"
              onChange={(e) => setPrompt(e.target.value)}
            />
          </div>
        </div>
        <button className="btn">Submit</button>
      </form>
    </div>
  );
}
