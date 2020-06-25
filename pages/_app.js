import useServerSideTracking from "../components/useServerSideTracking";

export default function App({ Component, pageProps }) {
  useServerSideTracking();

  return <Component {...pageProps} />;
}
