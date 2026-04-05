import "../styles/globals.css";
import "../components/ui/ShinyText.css";
import "../components/ui/MagicBento.css";
import type { AppProps } from "next/app";
import Head from "next/head";
import Script from "next/script";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <link rel="icon" href="/noroot.png" />
        <link rel="shortcut icon" href="/noroot.png" />
        <link rel="apple-touch-icon" href="/noroot.png" />
      </Head>
      <Script src="https://w885653.yclients.com/widgetJS" strategy="afterInteractive" charSet="UTF-8" />
      <Component {...pageProps} />
    </>
  );
}
