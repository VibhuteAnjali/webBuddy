/* eslint-disable no-unused-vars */
import { useState } from "react";
import "../Styles/QuestionsPortfolio.css";
import { AddAnswers } from "../Context/AnswerContext";
import { useNavigate } from "react-router";
export default function QuestionsPortfolio() {
  const [domain, setDomain] = useState("");
  const [skills, setSkills] = useState("");
  const [info, setInfo] = useState("");
  const [no, setNo] = useState(1);
  const [files, setFiles] = useState(Array(1).fill(null));
  const [projectNames, setProjectNames] = useState(Array(1).fill(""));
  const [projectInfo, setProjectInfo] = useState(Array(1).fill(""));
  const navigate = useNavigate();
  const { setAnswers } = AddAnswers();

  function handleFileChange(index, e) {
    const selectedFile = e.target.files[0];

    const imageURL = URL.createObjectURL(selectedFile);
    const newImageURLs = [...files];
    newImageURLs[index] = imageURL;
    setFiles(newImageURLs);
  }

  function handleProjectNameChange(index, e) {
    const newProjectNames = [...projectNames];
    newProjectNames[index] = e.target.value;
    setProjectNames(newProjectNames);
  }

  function handleProjectInfoChange(index, e) {
    const newProjectInfo = [...projectInfo];
    newProjectInfo[index] = e.target.value;
    setProjectInfo(newProjectInfo);
  }
  function handleAdd() {
    setNo(no + 1);
    setFiles([...files, null]); // Add a null file placeholder for the new project
    setProjectInfo([...projectInfo, ""]); // Add a empty string  for the new project info
    setProjectNames([...projectNames, ""]); // Add an empty string for the new project name
  }

  function handleSubmit(e) {
    e.preventDefault();
    const skillsArray = skills.split(",").map((skill) => skill.trim());
    const projects = projectNames.map((name, index) => [
      name,
      projectInfo[index],
      files[index],
    ]);
    setAnswers((prevAnswers) => ({
      ...prevAnswers,
      domain,
      skills: skillsArray,
      info,
      projects: projects.filter(([name, info, file]) => name && file), // Filter out projects without names or files
    }));
    navigate("/template");
  }

  return (
    <div className="quicksand">
      <form onSubmit={handleSubmit}>
        <div className="flex-r">
          <div className="block">
            <p>Your domain:</p>
            <input
              className="inputT no-gap"
              type="text"
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
            />
          </div>

          <div className="block">
            <p>Skills you want to showcase in website:</p>
            <input
              className="inputT no-gap"
              type="text"
              value={skills}
              onChange={(e) => setSkills(e.target.value)}
            />
          </div>
        </div>

        <div className="flex-r">
          <div className="block">
            <p className="width-15">
              About yourself:(please be precise as we are adding it to the
              website)
            </p>
            <input
              className="inputT no-gap"
              type="text"
              value={info}
              onChange={(e) => setInfo(e.target.value)}
            />
          </div>
        </div>
        <div className="flex-c">
          {[...Array(no)].map((_, index) => (
            <div className="project" key={index}>
              <div className="flex-r">
                <div className="block">
                  <p className="width-15">
                    Any Project you wanna highlight?
                    <span>Name of project</span>
                  </p>
                  <input
                    className="inputT no-gap"
                    type="text"
                    value={projectNames[index]}
                    onChange={(e) => handleProjectNameChange(index, e)}
                  />
                </div>
                <div className="block">
                  <p>About the project</p>
                  <textarea
                    value={projectInfo[index]} // Bind value to projectInfo[index]
                    onChange={(e) => handleProjectInfoChange(index, e)} // Pass index parameter
                  />
                </div>
                <div className="block">
                  <p className="width-15">
                    <span>
                      Screenshot of your Project (Please ensure good quality)
                    </span>
                  </p>
                  <input
                    className="inputT no-gap"
                    type="file"
                    onChange={(e) => handleFileChange(index, e)}
                  />
                </div>
              </div>
            </div>
          ))}
          <div className="btn" onClick={handleAdd}>
            + Add Project
          </div>
        </div>
        <button type="submit" className="btn">
          Done
        </button>
      </form>
    </div>
  );
}
