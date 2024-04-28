import "./App.css";
import Home from "./assets/Components/Home";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Questions from "./assets/Components/Questions";
import { AnswersContextProvider } from "./assets/Context/AnswerContext";
import Template from "./assets/Components/Template";
import Details from "./assets/Components/Details";
import WorkingArea from "./assets/Components/WorkingArea";

function App() {
  return (
    <AnswersContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/getStarted" element={<Questions />} />
          <Route path="/details" element={<Details />} />
          <Route path="/template" element={<Template />} />
          <Route path="/WorkingArea" element={<WorkingArea />} />
        </Routes>
      </BrowserRouter>
    </AnswersContextProvider>
  );
}

export default App;
