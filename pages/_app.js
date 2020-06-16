import React, { useEffect } from "react";

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
      body: JSON.stringify({ path: path }),
    });
  };

  const sendMsg = (key, value) => {
    localStorage.setItem(key, value);
    localStorage.removeItem(key);
  };

  useEffect(() => {
    // trackUrl(Router.pathname);

    Router.events.on("routeChangeComplete", trackUrl);

    window.addEventListener("storage", function (e) {
      if (e.key == "next_vercel_tracking: sId" && sID === undefined) {
        console.log("got the id sent!");

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
        sID = Math.floor(Math.random() * 100).toString();
        trackUrl(Router.pathname);
      }
    }, 1000);
  }, []);

  return <Component {...pageProps} />;
}
