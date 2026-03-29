import "../styles/globals.css";
import "../components/ui/ShinyText.css";
import "../components/ui/MagicBento.css";
import type { AppProps } from "next/app";
import Script from "next/script";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Script src="https://w885653.yclients.com/widgetJS" strategy="afterInteractive" charSet="UTF-8" />
      <Component {...pageProps} />
    </>
  );
}
