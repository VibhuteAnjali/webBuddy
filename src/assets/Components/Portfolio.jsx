/* eslint-disable react/prop-types */
import { useContext, useEffect, useState } from "react";
import "../Styles/Portfolio.css";

import { postProcessSentences } from "../Context/useTextGeneration";
import { AddAnswers, AnswersContext } from "../Context/AnswerContext";
import {
  useRewritetext,
  usegenerateTagline,
} from "../Context/useTextGeneration";
export default function Portfolio() {
  const { setAnswers } = AddAnswers();
  const { answers } = useContext(AnswersContext);
  const [text, setText] = useState("Tagline");
  const [aboutInfo, setAboutInfo] = useState("");
  const logo = answers["logo"];
  const info = answers["info"];
  const about = answers["About"];
  const skills = answers["skills"];
  const projects = answers["projects"];
  const taglinePromise = usegenerateTagline(40);
  const infoaboutPromise = useRewritetext(info, 82);

  console.log(answers);
  useEffect(() => {
    taglinePromise
      .then((result) => {
        if (
          result.status === "success" &&
          result.data &&
          result.data.outputs &&
          result.data.outputs[0]
        ) {
          setText(postProcessSentences(result.data.outputs[0].text));
        }
      })
      .catch((error) => {
        console.error("Error fetching tagline:", error);
      });

    infoaboutPromise
      .then((result) => {
        if (
          result.status === "success" &&
          result.data &&
          result.data.outputs &&
          result.data.outputs[0]
        ) {
          setAboutInfo(postProcessSentences(result.data.outputs[0].text));
        }
      })
      .catch((error) => {
        console.error("Error fetching about:", error);
      });
  }, [infoaboutPromise, taglinePromise]);

  useEffect(() => {
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      ["aboutInfo"]: aboutInfo,
      ["tagline"]: text,
    }));
  }, [aboutInfo, text, setAnswers]);
  return (
    <div>
      <section className="top">
        <nav>
          <i>
            <a href="#about" className="n-link">
              ABOUT
            </a>
          </i>
          <p className="logo">
            <i className="and">
              <span className="cursive logo-cursive and">
                {logo && logo[0]}
              </span>
            </i>
            <span className="plain">{logo && logo.slice(1)}</span>
            <span className="green dot">.</span>
          </p>
          <i>
            <a href="#work" className="n-link">
              WORK
            </a>
          </i>
        </nav>
        <div className="header-portfolio">
          <p className="sub">
            <span className="cursive">Hey,</span> I Am {logo} A
          </p>
          <h1 className="head">
            <span className="cursive">{about && about[0]}</span>
            {about && about.slice(1)}
          </h1>
          <p className="heading-sub">{postProcessSentences(text)}</p>
        </div>
      </section>
      <section id="about">
        <div className="heading">
          <h2 className="h2">
            <i>
              <span className="cursive logo-cursive">a</span>
            </i>
            <span className="plain">BOUT</span>
          </h2>
        </div>
        <div className="main" id="about">
          <div className="text">
            <i>{aboutInfo}</i>
          </div>
          <div className="img">
            <img
              src="https://i.ibb.co/12rVWT2/Avatar.jpg"
              alt="Avatar"
              border="0"
            />
          </div>
        </div>
      </section>
      <section className="scroll">
        <div className="box">
          {skills.map((skill, index) => (
            <div key={index}>
              <span className="cursive">{skill[0]}</span>
              <span key={index}>{skill.slice(1)}</span>
            </div>
          ))}
        </div>
      </section>
      <section className="work">
        <div className="heading head2">
          <h2 className="h2">
            <i>
              <span className="cursive logo-cursive">W</span>
            </i>{" "}
            <span className="plain">ORK</span>
          </h2>
        </div>
        {projects.map((project, index) => (
          <div className="work1" id="work" key={index}>
            <div className="left">
              <div className="border">
                <h1 id="l1">{project[0]}</h1>
                <InfoText project={project} index={index} />
              </div>
            </div>
            <div className="image1">
              <img src={project[2]} alt="" className="ss1" />
            </div>
          </div>
        ))}
      </section>
      <section className="contact">
        <div className="c1">
          <h2>
            <span className="cursive">H</span> ave a Project In Mind!
          </h2>
          <form action="/">
            <input type="text" name="" id="" placeholder=" Name" />
            <input type="text" name="" id="" placeholder="Email" />
            <input type="text" name="" id="" placeholder="Your Idea in brief" />
            <button className="submit">Email Me</button>
            <div className="icons">
              <button className="b1">
                <i className="fab fa-linkedin" style={{ color: "#ffffff" }}></i>
              </button>
              <button className="b1">
                <i className="fab fa-twitter" style={{ color: "#ffffff" }}></i>
              </button>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
}
function InfoText({ project, index }) {
  const [rewrittenText, setRewrittenText] = useState("");
  const projectInfoPromise = useRewritetext(project[1], 30);
  const { setAnswers } = AddAnswers();
  useEffect(() => {
    projectInfoPromise
      .then((result) => {
        if (
          result.status === "success" &&
          result.data &&
          result.data.outputs &&
          result.data.outputs[0]
        ) {
          const newText = postProcessSentences(result.data.outputs[0].text);
          // Update the state only if the newText is different from the current rewrittenText
          if (newText !== rewrittenText) {
            setRewrittenText(newText);
            // Add setAnswers if needed
            setAnswers((prevAnswers) => ({
              ...prevAnswers,
              [`projectInfo${index}`]: newText,
            }));
          }
        }
      })
      .catch((error) => {
        console.error("Error fetching rewritten text:", error);
      });
  }, [projectInfoPromise, setAnswers, rewrittenText, index]);

  return <p className="info">{postProcessSentences(rewrittenText)}</p>;
}
