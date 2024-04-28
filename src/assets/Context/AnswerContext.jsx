/* eslint-disable react/prop-types */
import { createContext, useState, useContext } from "react";
export const AnswersContext = createContext();

export const AnswersContextProvider = (props) => {
  const [answers, setAnswers] = useState([]);
  console.log(answers);
  return (
    <AnswersContext.Provider value={{ answers, setAnswers }}>
      {props.children}
    </AnswersContext.Provider>
  );
};
export function AddAnswers() {
  const { answers, setAnswers } = useContext(AnswersContext);
  return { answers, setAnswers };
}
