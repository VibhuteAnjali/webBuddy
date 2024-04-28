import { useContext, useState } from "react";
import JSZip from "jszip";
import { AnswersContext } from "../Context/AnswerContext";
import Portfolio from "./Portfolio";
import Product from "./Product";
import Services from "./Services";

export default function WorkingArea() {
  const { answers } = useContext(AnswersContext);
  const [show, setshow] = useState(true);
  const type = answers["Type"];

  function downloadSourceCode() {
    setshow(false);
    setTimeout(() => {
      var zip = JSZip();

      zip.file("source_code.html", document.documentElement.outerHTML);

      // Fetch Portfolio.css and add it to the zip file
      fetch("../Styles/Portfolio.css")
        .then((response) => response.text())
        .then((css) => zip.file("portfolio.css", css))
        .catch((error) => console.error("Error fetching CSS file:", error));

      // Generate the zip folder
      zip.generateAsync({ type: "blob" }).then(function (content) {
        // Create a download link for the zip file
        var downloadLink = document.createElement("a");
        downloadLink.href = window.URL.createObjectURL(content);
        downloadLink.download = "source_code_and_css.zip";
        downloadLink.click();
      });
    }, [1000]);
  }

  return (
    <div>
      {show && (
        <button className="btn w-a-btn" onClick={downloadSourceCode}>
          Download Code
        </button>
      )}
      {type === "Portfolio" && <Portfolio />}
      {type === "Product" && <Product />}
      {type === "Service" && <Services />}
    </div>
  );
}
