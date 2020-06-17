import React, { useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import Router from "next/router";

var sID = undefined;

export default function App({ Component, pageProps }) {
  const trackUrl = async (path) => {
    await fetch("/api/track", {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({ path: path, sID: sID }),
    });
  };

  const sendMsg = (key, value) => {
    localStorage.setItem(key, value);
    localStorage.removeItem(key);
  };

  useEffect(() => {
    Router.events.on("routeChangeComplete", trackUrl);

    window.addEventListener("storage", function (e) {
      if (e.key == "next_vercel_tracking: sId" && sID === undefined) {
        console.log("Got an id", e.newValue);
        sID = e.newValue;
        trackUrl(Router.pathname);
      }

      if (e.key == "next_vercel_tracking: send_sId" && sID !== undefined) {
        sendMsg("next_vercel_tracking: sId", sID);
      }
    });

    console.log("Asked for the id");
    sendMsg("next_vercel_tracking: send_sId", sID);

    setTimeout(() => {
      if (sID === undefined) {
        sID = uuidv4();
        console.log("create id", sID);

        trackUrl(Router.pathname);
      }
    }, 50);
  }, []);

  return <Component {...pageProps} />;
}
