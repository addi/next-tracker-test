import useServerSideTracking from "next-backend-analytics/useServerSideTracking";

export default function App({ Component, pageProps }) {
  useServerSideTracking();

  return <Component {...pageProps} />;
}
