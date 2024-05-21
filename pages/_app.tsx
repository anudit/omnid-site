import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from 'next/app';
import Head from 'next/head';
import customTheme from '../styles/theme';

const App = ({ Component, pageProps }: AppProps) => {
  return (
    <ChakraProvider theme={customTheme} resetCSS>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default App
