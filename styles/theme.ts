import { extendTheme } from "@chakra-ui/react";
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

interface ColorMode {
  colorMode: "light" | "dark";
}

const theme = extendTheme({
  styles: {
    global: ({ colorMode }: ColorMode) => ({
      "html, body": {
        background: colorMode === "dark" ? "#000000" : "white",
        color: colorMode === "dark" ? "white" : "#000000",
        scrollBehavior: 'smooth',
        overflow: 'hidden',
      }
    }),
  },
  fonts: {
    heading: `${inter.style.fontFamily}, Segoe UI`,
    body: `Georgia, Serif`,
  },
  fontWeights: {
    normal: 200,
    medium: 500,
    bold: 900
  },
  config: {
    cssVarPrefix: "ch",
    initialColorMode: "dark",
    useSystemColorMode: false
  },
})

export default theme;
