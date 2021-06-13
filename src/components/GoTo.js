import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

export default function GoTo() {
  const { shortUrl } = useParams();

  useEffect(() => {
    const requestOptions = {
      method: "GET",
    };
    fetch("/api/" + shortUrl, requestOptions)
      .then((res) => res.json())
      .then((data) => (window.location.href = data.longUrl));
  }, []);

  return <h2>Redirecting you to your link ...</h2>;
}
