import React from "react";
import tw from "twin.macro";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";

import HeaderBase, { NavLinks, NavLink, PrimaryLink } from "components/headers/light.js";
import Footer from "components/footers/AnssFooter2";
import AboutUsBody from "./components/anss/AboutUsBody";
const Header = tw(HeaderBase)`max-w-none`;
export default () => {
  return (
    <AnimationRevealPage>
      <Header />
        <AboutUsBody />
      <Footer />
    </AnimationRevealPage>
  );
};
