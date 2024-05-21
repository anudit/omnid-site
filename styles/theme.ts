import { StyleFunctionProps, extendTheme } from "@chakra-ui/react";
import { Fira_Code } from 'next/font/google'

const fira = Fira_Code({ subsets: ['latin'] })

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
      }
    }),
  },
  fonts: {
    heading: `${fira.style.fontFamily}, Georgia, Serif`,
    body: `${fira.style.fontFamily}, Georgia, Serif`,
  },
  fontWeights: {
    normal: 200,
    medium: 500,
    bold: 900
  },
  config: {
    cssVarPrefix: "om",
    initialColorMode: "dark",
    useSystemColorMode: false
  },
  components: {
    Menu: {
      baseStyle: (props: StyleFunctionProps) => ({
        list: {
          bg: props.colorMode === "dark" ? "#111111db" : "white",
          backdropFilter: "blur(24px)",
          border: 'none'
        },
        item: {
          bg: props.colorMode === 'dark' ? 'hsl(0deg 0% 12% / 0%)' : "hsl(0deg 0% 12% / 0%)",
          _hover: {
            bg: props.colorMode === 'dark' ? 'hsl(0deg 0% 12%)' : "hsl(0deg 0% 12% / 9%)",
          },
          _focus: {
            bg: props.colorMode === 'dark' ? 'hsl(0deg 0% 12%)' : "hsl(0deg 0% 12% / 9%)",
          },
        },
      }),
    },
    Modal: {
      baseStyle: (props: StyleFunctionProps) => ({
        dialog: {
          bg: props.colorMode === "dark" ? "#111111db" : "white",
          backdropFilter: "blur(24px)"
        },
      }),
    },
    Drawer: {
      baseStyle: (props: StyleFunctionProps) => ({
        dialog: {
          bg: props.colorMode === "dark" ? "#111111db" : "white",
          backdropFilter: "blur(24px)"
        },
      }),
    },
  }
})

export default theme;
