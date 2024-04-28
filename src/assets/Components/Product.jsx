import { useContext, useEffect, useState } from "react";
import "../Styles/Product.css";
import { AnswersContext } from "../Context/AnswerContext";
import { postProcessSentences } from "../Context/useTextGeneration";
import {
  useRewritetext,
  usegenerateTaglineforProducts,
  useGeneratePhoto,
} from "../Context/useTextGeneration";
export default function Product() {
  const { answers } = useContext(AnswersContext);
  const [text, setText] = useState("Tagline");
  const [subtext, setSubText] = useState("Tagline");
  const [aboutinfo, setaboutinfo] = useState("about");
  const [photosrc, setphotosrc] = useState("");
  const [aboutpicsrc, setaboutpicsrc] = useState("");
  const [url1, seturls] = useState([]);
  const [url2, seturl2] = useState([]);
  const logo = answers["logo"];
  const about = answers["About"];
  const topic = answers["prompt"];
  const taglinePromise = usegenerateTaglineforProducts(15);
  const taglinePromise2 = usegenerateTaglineforProducts(20);
  const infoaboutPromise = useRewritetext(about, 82);
  const src = useGeneratePhoto(topic, 1, "landscape");
  const aboutsrc = useGeneratePhoto(topic, 1, "portrait");
  const collection = useGeneratePhoto(topic, 3, "portrait");
  const collection1 = useGeneratePhoto(topic, 3, "portrait", 2);
  console.log(collection);

  useEffect(() => {
    if (src && src.length > 0 && src[0].urls) {
      const imageUrl = src[0].urls.regular;
      setphotosrc(imageUrl);
      console.log(src);
      console.log(imageUrl);
    }
    if (aboutsrc && aboutsrc.length > 0 && aboutsrc[0].urls) {
      const aboutUrl = aboutsrc[0].urls.regular;

      setaboutpicsrc(aboutUrl);
    }
  }, [src, aboutsrc]);
  useEffect(() => {
    if (
      collection &&
      collection.length > 0 &&
      collection1 &&
      collection1.length > 0
    ) {
      // Extracting image URLs from the collection
      const imageUrls = collection.map((image) => image.urls.regular);
      seturls(imageUrls);
      const imageUrls1 = collection1.map((image) => image.urls.regular);
      seturl2(imageUrls1);

      console.log("imgurl:", imageUrls);
    }
  }, [collection, collection1]);

  console.log(src);
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

    taglinePromise2
      .then((result) => {
        if (
          result.status === "success" &&
          result.data &&
          result.data.outputs &&
          result.data.outputs[0]
        ) {
          setSubText(postProcessSentences(result.data.outputs[0].text));
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
          setaboutinfo(postProcessSentences(result.data.outputs[0].text));
        }
      })
      .catch((error) => {
        console.error("Error fetching about:", error);
      });
  }, [taglinePromise, taglinePromise2, infoaboutPromise]);
  return (
    <div>
      <div className="nav">
        <h2 className="logo">{logo}</h2>
        <ul className="navbar">
          <li>
            <a href="">Home</a>
          </li>
          <li>
            <a href="">About</a>
          </li>
        </ul>
      </div>
      <div className="header">
        <div className="taglineP">
          <h2 className="width-50-p h2-header">{postProcessSentences(text)}</h2>
          <p>{postProcessSentences(subtext)}</p>
          <button className="btn">Explore</button>
        </div>
        <img src={photosrc} alt="Header Image" />
      </div>
      <div className="about">
        <h2>About</h2>
        <div className="flex">
          <div className="text">{aboutinfo}</div>
          <div className="image">
            <img src={aboutpicsrc} alt="About Image" />
          </div>
        </div>
      </div>
      <div className="gallery">
        <h2>Gallery</h2>
        <div className="flex">
          {url1.map((url, index) => (
            <img key={index} src={url} alt="Gallery Image" />
          ))}
        </div>
        <div className="flex">
          {url2.map((url, index) => (
            <img key={index} src={url} alt="Gallery Image" />
          ))}
        </div>
      </div>
      <div className="footer">
        <div className="Alllinks">
          <h2 className="logo">{logo}</h2>
          <ul className="footer-links">
            <li>About</li>
            <li>Services</li>
            <li>Shops</li>
          </ul>
          <ul className="footer-links">
            <li>Contact</li>
            <li>Brand</li>
            <li>Shops</li>
          </ul>
        </div>
        <div className="icons"></div>
      </div>
    </div>
  );
}
