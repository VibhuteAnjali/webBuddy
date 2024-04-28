import { useContext, useEffect, useState } from "react";
import "../Styles/Product.css";
import "../Styles/Services.css";
import { AnswersContext } from "../Context/AnswerContext";
import { postProcessSentences } from "../Context/useTextGeneration";
import {
  useRewritetext,
  usegenerateTaglineforServices,
  useGeneratePhoto,
} from "../Context/useTextGeneration";
export default function Services() {
  const { answers } = useContext(AnswersContext);
  const [text, setText] = useState("Tagline");
  const [subtext, setSubText] = useState("Tagline");
  const [aboutinfo, setaboutinfo] = useState("about");
  const [service1, setService1] = useState("service");
  const [servicetagline1, setServiceTagline1] = useState("service");
  const [photosrc, setphotosrc] = useState("");
  const [aboutpicsrc, setaboutpicsrc] = useState("");
  const [servicepicsrc, setservicepicsrc] = useState("");
  const [url1, seturls] = useState([]);
  const [url2, seturl2] = useState([]);
  const logo = answers["logo"];
  const about = answers["About"];
  const topic = answers["prompt"];
  const service = answers["services"];
  const serviceimgp = answers["features"];
  const taglinePromise = usegenerateTaglineforServices(30, about);
  const taglinePromise2 = usegenerateTaglineforServices(50, about);
  const ServicetaglinePromise1 = usegenerateTaglineforServices(10, service);
  const infoaboutPromise = useRewritetext(about, 82);
  const service1Promise = useRewritetext(service, 82);
  const src = useGeneratePhoto(topic, 1, "landscape");
  const Servicesrc = useGeneratePhoto(serviceimgp, 1, "landscape");
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
    if (Servicesrc && Servicesrc.length > 0 && Servicesrc[0].urls) {
      const aboutUrl = Servicesrc[0].urls.regular;

      setservicepicsrc(aboutUrl);
    }
  }, [src, aboutsrc, Servicesrc]);
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
    service1Promise
      .then((result) => {
        if (
          result.status === "success" &&
          result.data &&
          result.data.outputs &&
          result.data.outputs[0]
        ) {
          setService1(postProcessSentences(result.data.outputs[0].text));
        }
      })
      .catch((error) => {
        console.error("Error fetching about:", error);
      });
    ServicetaglinePromise1.then((result) => {
      if (
        result.status === "success" &&
        result.data &&
        result.data.outputs &&
        result.data.outputs[0]
      ) {
        setServiceTagline1(postProcessSentences(result.data.outputs[0].text));
      }
    }).catch((error) => {
      console.error("Error fetching about:", error);
    });
  }, [
    taglinePromise,
    taglinePromise2,
    infoaboutPromise,
    service1Promise,
    ServicetaglinePromise1,
  ]);
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
          <div className="background-black">
            <h2 className="width-50-p h2-header">
              {postProcessSentences(text)}
            </h2>
            <p>{postProcessSentences(subtext)}</p>
            <button className="btn">Explore</button>
          </div>
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

      <div className="services">
        <h2 className="title">Services</h2>
        <div className="service1">
          <div className="info-service">
            <h1 className="headline1">{servicetagline1}</h1>
            <p>{service1}</p>
            <p className="more">
              Learn More
              <img
                src="https://uploads-ssl.webflow.com/63a00f6fbf9aaf0df70d7557/63a1baa1c8ea8823c03168ee_Group%20697.svg"
                loading="lazy"
                data-w-id="fbc77e5c-40be-e16d-04c7-2ffe4cb51a4a"
                alt=""
                className="image-17"
                style={{
                  transform:
                    "translate3d(0px, 0px, 0px) scale3d(1, 1, 1) rotateX(0deg) rotateY(0deg) rotateZ(0deg) skew(0deg, 0deg)",
                  transformStyle: "preserve-3d",
                }}
              />
            </p>
          </div>
          <div className="serive1-img">
            <img className="image-9" src={servicepicsrc} width="672" />
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
      <div className="review">
        <div className="r1">
          <img
            loading="lazy"
            src="https://uploads-ssl.webflow.com/63a00f6fbf9aaf0df70d7557/63a1dc80b183767c47854ca3_Group%20698.svg"
            alt=""
            className="image-15"
          />
          <p className="review1">
            It&apos;s a great tool for communication at work, especially with my
            team that doesn&apos;t work in the same location, with remote
            members in different cities across the country.
          </p>
          <div className="servicer1name">
            <div className="pic">
              <img
                width="60"
                loading="lazy"
                src="https://uploads-ssl.webflow.com/63a00f6fbf9aaf0df70d7557/63a1e4ef2b68ba1e4ef222d8_Group_700-removebg-preview.png"
                alt=""
                className="image-12"
              />
            </div>
            <div className="name">
              <p>SAINA SEAWORTH</p>
              <p className="white">CEO OF FASTER</p>
            </div>
          </div>
        </div>
        <div className="r1">
          <img
            loading="lazy"
            src="https://uploads-ssl.webflow.com/63a00f6fbf9aaf0df70d7557/63a1dc80b183767c47854ca3_Group%20698.svg"
            alt=""
            className="image-15"
          />
          <p className="review1">
            It&apos;s a great tool for communication at work, especially with my
            team that doesn&apos;t work in the same location, with remote
            members in different cities across the country.
          </p>
          <div className="servicer1name">
            <div className="pic">
              <img
                width="60"
                loading="lazy"
                src="https://uploads-ssl.webflow.com/63a00f6fbf9aaf0df70d7557/63a1e4ef2b68ba1e4ef222d8_Group_700-removebg-preview.png"
                alt=""
                className="image-12"
              />
            </div>
            <div className="name">
              <p>SAINA SEAWORTH</p>
              <p className="white">CEO OF FASTER</p>
            </div>
          </div>
        </div>
        <div className="r1">
          <img
            loading="lazy"
            src="https://uploads-ssl.webflow.com/63a00f6fbf9aaf0df70d7557/63a1dc80b183767c47854ca3_Group%20698.svg"
            alt=""
            className="image-15"
          />
          <p className="review1">
            It&apos;s a great tool for communication at work, especially with my
            team that doesn&apos;t work in the same location, with remote
            members in different cities across the country.
          </p>
          <div className="servicer1name">
            <div className="pic">
              <img
                width="60"
                loading="lazy"
                src="https://uploads-ssl.webflow.com/63a00f6fbf9aaf0df70d7557/63a1e4ef2b68ba1e4ef222d8_Group_700-removebg-preview.png"
                alt=""
                className="image-12"
              />
            </div>
            <div className="name">
              <p>SAINA SEAWORTH</p>
              <p className="white">CEO OF FASTER</p>
            </div>
          </div>
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
