/* eslint-disable semi */
/* eslint-disable quotes */
import React, { useEffect, useState } from "react";

// const CAT_ENDPOINT_IMAGE_URL = `https://cataas.com/cat/says/${firstWord}?size=50&color=red&json=true`;
const CAT_ENDPOINT_IMAGE_URL = `https://catfact.ninja/fact`;

export const App = () => {
  const [fact, setFact] = useState("lorem ipsum cat fact whatever");
  const [imageUrl, setImageUrl] = useState();

  useEffect(() => {
    fetch(CAT_ENDPOINT_IMAGE_URL)
      .then((res) => res.json())
      .then((data) => {
        const { fact } = data;
        setFact(data.fact);
        const firstWord = fact.split(" ", 3).join(" ");
        console.log(firstWord);

        fetch(
          `https://cataas.com/cat/says/${firstWord}?size=50&color=red&json=true`
        )
          .then((res) => res.json())
          .then((response) => {
            const { url } = response;
            console.log(url);
            setImageUrl(url);
          });
      });
  }, []);

  return (
    <main
      style={{
        margin: "1rem auto",
        maxWidth: "600px",
        padding: "1rem",
        boxShadow: "4px 6px 4px rgba(0,0,0,0.1",
        borderRadius: "15px",
        border: "1px solid #f0f0f0"
      }}
    >
      <h1>App de gatitos</h1>
      <section
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "center",
          placeItems: "center",
          gap: "1rem"
        }}
      >
        {fact && <p>{fact}</p>}
        {imageUrl && (
          <img
            src={`https://cataas.com${imageUrl}`}
            alt={`Image extracted using the first three words from ${fact}`}
            style={{
              maxHeight: "200px"
            }}
          />
        )}
      </section>
    </main>
  );
};
