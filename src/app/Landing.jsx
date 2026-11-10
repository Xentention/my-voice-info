import { LangProvider } from "./LangContext";
import { ThemeProvider } from "./ThemeContext";
import Header from "../components/layout/Header";
import Hero from "../components/sections/Hero";
import Features from "../components/sections/Features";
import Showcase from "../components/sections/Showcase";
import Look from "../components/sections/Look";
import ComingSoon from "../components/sections/ComingSoon";
import Manuals from "../components/sections/Manuals";
import Faq from "../components/sections/Faq";
import GetApp from "../components/layout/GetApp";
import Footer from "../components/layout/Footer";

export default function Landing({ lang }) {
  return (
    <LangProvider lang={lang}>
      <ThemeProvider>
        <Header>
          <Hero />
        </Header>
        <main id="main">
          <Features />
          <Showcase />
          <Look />
          <ComingSoon />
          <Manuals />
          <Faq />
        </main>
        <footer>
          <GetApp />
          <Footer />
        </footer>
      </ThemeProvider>
    </LangProvider>
  );
}
