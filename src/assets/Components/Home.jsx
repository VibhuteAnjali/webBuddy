import "../Styles/Home.css";
import Navbar from "./Navbar";
import img from "../images/Saly-1.png";

export default function Home() {
  return (
    <div className="home glass">
      <Navbar main="main" />
      <div className="container1">
        <div className="w-m50">
          <div className=" text-container1">
            <div className="main-text quicksand ">
              Create Impressive website{" "}
              <span className="lora">Effortlessly!</span>
            </div>
            <p className="tagline">
              Instant Websites, Infinite Possibilities: Let AI Build Your Online
              Presence On the Fly!
            </p>
            <button className="btn1 quicksand">Explore</button>
          </div>
        </div>
        <div className="img-container">
          <img src={img} alt="home" />
        </div>
      </div>
    </div>
  );
}
