/* eslint-disable react/prop-types */
import services from "../images/product.png";
import portfolio from "../images/portfolioQ.png";
import online from "../images/online.png";
import "../Styles/Questions.css";
import { AddAnswers } from "../Context/AnswerContext.jsx";

export default function Question1({ setStyle, style }) {
  const { setAnswers } = AddAnswers();
  const quesNo = "Type";
  return (
    <div>
      <div className="box1">
        <div className="text-heading lora">
          <h3>What&apos;s the purpose of the website?</h3>
          <p>We&apos;ll provide you with the right tools to get started </p>
        </div>
        <div className="ans quicksand">
          <div
            className={`${style == "one" ? "active" : "one"}`}
            onClick={() => {
              setStyle("one");
              setAnswers((prevAnswers) => ({
                ...prevAnswers,
                [quesNo]: "Service",
              }));
            }}
          >
            <img src={services} alt="services" />
            <p>To provide a service</p>
          </div>
          <div
            className={`${style == "two" ? "active" : "two"}`}
            onClick={() => {
              setStyle("two");
              setAnswers((prevAnswers) => ({
                ...prevAnswers,
                [quesNo]: "Portfolio",
              }));
            }}
          >
            <img src={portfolio} alt="portfolio" />
            <p>Portfolio</p>
          </div>
          <div
            className={`${style == "three" ? "active" : "three"}`}
            onClick={() => {
              setStyle("three");
              setAnswers((prevAnswers) => ({
                ...prevAnswers,
                [quesNo]: "Product",
              }));
            }}
          >
            <img src={online} alt="online" />
            <p>
              For creating an online presence of your Product like adverstising
              your product
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
