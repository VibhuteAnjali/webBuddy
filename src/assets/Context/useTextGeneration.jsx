/* eslint-disable react-hooks/rules-of-hooks */
import { useContext, useState } from "react";
import { AnswersContext } from "./AnswerContext";
import { useEffect } from "react";
const API_KEY =
  "gAAAAABlwjiLSMWnL_EQWJ2e7_qNLXUV4FXGeYy1bIfrHMgDqAv9JR_NgO2kPJ1AzP2ifQHxiklKSE0kqadjV-IQrjFVe0YnbDnHRgW6rVWOI1ZEnu80D-l6rYkAn06kEoGSRqZ7NLWi";
export async function usegenerateTagline(len) {
  const { answers } = useContext(AnswersContext);
  const about = answers["About"];
  const logo = answers["logo"];
  const type = answers["Type"];
  const domain = answers["domain"];

  const endpoint = "https://api.textcortex.com/v1/texts/products/descriptions";

  const headers = {
    Authorization: `Bearer ${API_KEY}`,
    "Content-Type": "application/json",
  };
  const body = {
    brand: about, // brand
    category: "Taglines",
    description: about, //  topic
    formality: "prefer_more",
    keywords: [domain, type], //keywords
    max_tokens: len,
    model: "chat-sophos-1",
    n: 1,
    name: logo,
    source_lang: "en",
    target_lang: "en",
    temperature: 0.7,
  };

  const [taglineGenerated, setTaglineGenerated] = useState(false);

  if (taglineGenerated) {
    return Promise.resolve({ status: "success" });
  }

  return fetch(endpoint, {
    method: "POST",
    headers: headers,
    body: JSON.stringify(body),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      setTaglineGenerated(true);
      return data;
    })
    .catch((error) => {
      console.log(error);
      throw error;
    });
}
export async function usegenerateTaglineforProducts(len) {
  const { answers } = useContext(AnswersContext);
  const about = answers["About"];
  const logo = answers["logo"];
  const product = answers["products"];
  // const type = answers["Type"];

  const endpoint = "https://api.textcortex.com/v1/texts/products/descriptions";

  const headers = {
    Authorization: `Bearer ${API_KEY}`,
    "Content-Type": "application/json",
  };
  const body = {
    brand: logo,
    category: "Taglines",
    description: about,
    formality: "prefer_more",
    keywords: [about],
    max_tokens: len,
    model: "chat-sophos-1",
    n: 1,
    name: product,
    source_lang: "en",
    target_lang: "en",
    temperature: 0.7,
  };

  const [taglineGenerated, setTaglineGenerated] = useState(false);

  if (taglineGenerated) {
    return Promise.resolve({ status: "success" });
  }

  return fetch(endpoint, {
    method: "POST",
    headers: headers,
    body: JSON.stringify(body),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      setTaglineGenerated(true);
      return data;
    })
    .catch((error) => {
      console.log(error);
      throw error;
    });
}
export async function usegenerateTaglineforServices(len, service) {
  const { answers } = useContext(AnswersContext);
  const about = answers["About"];
  const logo = answers["logo"];
  const services = answers["services"];
  const purpose = answers["purpose"];

  const endpoint = "https://api.textcortex.com/v1/texts/products/descriptions";

  const headers = {
    Authorization: `Bearer ${API_KEY}`,
    "Content-Type": "application/json",
  };
  const body = {
    brand: logo,
    category: "Taglines",
    description: purpose,
    formality: "prefer_more",
    keywords: [about, purpose, service],
    max_tokens: len,
    model: "chat-sophos-1",
    n: 1,
    name: services,
    source_lang: "en",
    target_lang: "en",
    temperature: 0.7,
  };

  const [taglineGenerated, setTaglineGenerated] = useState(false);

  if (taglineGenerated) {
    return Promise.resolve({ status: "success" });
  }

  return fetch(endpoint, {
    method: "POST",
    headers: headers,
    body: JSON.stringify(body),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      setTaglineGenerated(true);
      return data;
    })
    .catch((error) => {
      console.log(error);
      throw error;
    });
}
export async function useRewritetext(para, count) {
  const [rewrite, setRewrite] = useState(true);

  if (!rewrite) {
    return Promise.resolve({ status: "success" });
  }

  // Fetch new text if rewriting has not been done
  const endpoint = "https://api.textcortex.com/v1/texts/rewritings";
  const headers = {
    Authorization: `Bearer ${API_KEY}`,
    "Content-Type": "application/json",
  };
  const body = {
    formality: "default",
    max_tokens: count,
    mode: "tone_professional",
    model: "gpt-3.5-turbo-16k",
    n: 1,
    source_lang: "en",
    target_lang: "en",
    temperature: 0.65,
    text: para,
  };

  return fetch(endpoint, {
    method: "POST",
    headers: headers,
    body: JSON.stringify(body),
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      setRewrite(false);
      return data;
    })
    .catch((error) => {
      console.log(error);
      throw error;
    });
}

export function postProcessSentences(sentence) {
  if (!sentence.includes(".")) {
    return sentence;
  } else {
    let lastFullstopIndex = sentence.lastIndexOf(".");

    if (lastFullstopIndex === sentence.length - 1) {
      return sentence;
    } else {
      return sentence.slice(0, lastFullstopIndex + 1);
    }
  }
}

export function useGeneratePhoto(topic, no, size, page) {
  const [photos, setPhotos] = useState([]);
  const API_URL = "https://api.unsplash.com/search/photos";

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const response = await fetch(
          `${API_URL}?query=${topic}&page=${
            page || 1
          }&per_page=${no}&client_id=z9k8tXP5iJ0PiZbkRgjbf0GfxQQO1Vu9aJTiQG-9dk8&orientation=${size}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch photos");
        }
        const data = await response.json();
        setPhotos(data.results);
      } catch (error) {
        console.error("Error fetching photos:", error);
      }
    };

    fetchPhotos();
  }, [topic, no, size, page]);

  return photos;
}
