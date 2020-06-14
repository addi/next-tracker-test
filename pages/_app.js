import React, { useEffect } from "react";

import Router from "next/router";

const trackUrl = async (path) => {
  let response = await fetch("/api/track", {
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    method: "POST",
    body: JSON.stringify({ path: path }),
  });
};

const handleRouteChange = (url) => {
  console.log("App is changed to: ", url);
  trackUrl(Router.pathname);
};

Router.events.on("routeChangeComplete", handleRouteChange);

export default function App({ Component, pageProps }) {
  useEffect(() => {
    console.log("Start path", Router.pathname);
    trackUrl(Router.pathname);
  }, []);

  return <Component {...pageProps} />;
}
