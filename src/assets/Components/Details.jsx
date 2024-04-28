import { useContext } from "react";
import { AnswersContext } from "../Context/AnswerContext";
import QuestionsPortfolio from "./QuestionsPortfolio";
import Navbar from "../Components/Navbar";
import QuestionsProduct from "./QuestionsProduct";
import QuestionsServices from "./QuestionsServices";
export default function Details() {
  const { answers } = useContext(AnswersContext);
  const type = answers["Type"];
  return (
    <div>
      <Navbar home="home" />
      <div className="text-heading lora center">
        <h3>We would like to have some more details!</h3>
        <p>To give you a more precise Website </p>
      </div>
      {type == "Portfolio" && <QuestionsPortfolio />}
      {type == "Product" && <QuestionsProduct />}
      {type == "Service" && <QuestionsServices />}
    </div>
  );
}
