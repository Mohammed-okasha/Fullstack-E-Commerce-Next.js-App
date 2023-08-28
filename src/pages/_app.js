import { Provider } from "react-redux";
import { SessionProvider } from "next-auth/react";
import Head from "next/head";
import RootLayout from "@/components/global/Root";
import { store } from "../store/store";
import "@/styles/globals.css";

export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>D&E Store</title>
        <meta
          name="description"
          content="shop our amazing collection on D&E Store"
        />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        ></meta>
      </Head>
      <Provider store={store}>
        <SessionProvider session={pageProps.session}>
          <RootLayout>
            <Component {...pageProps} />
          </RootLayout>
        </SessionProvider>
      </Provider>
    </>
  );
}
