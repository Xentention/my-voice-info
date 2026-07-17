import { ChakraProvider, Box } from "@chakra-ui/react";
import theme from "./theme";
import { LangProvider } from "./LangContext";
import { A11yProvider } from "./A11yContext";
import { SkipLink } from "./components/primitives";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { PromoCard } from "./components/PromoCard";
import { Landscape } from "./components/Landscape";
import { GrammarStages } from "./components/Grammar";
import { Capabilities } from "./components/Capabilities";
import { Research } from "./components/Research";
import { Footer } from "./components/Footer";

export default function Landing({ lang }) {
  return (
    <ChakraProvider theme={theme}>
      <LangProvider lang={lang}>
        <A11yProvider>
          <SkipLink />
          <Header />
          <Box as="main" id="main">
            <Hero />
            <PromoCard />
            <Landscape />
            <GrammarStages />
            <Capabilities />
            <Research />
          </Box>
          <Footer />
        </A11yProvider>
      </LangProvider>
    </ChakraProvider>
  );
}
