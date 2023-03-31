import React from "react";
import tw from "twin.macro";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import MapSection from "components/sections/MapSection.js";
// import DashboardTableau from "components/anss/DashboardTableau";
import DashboardFeatures from "components/anss/DashboardFeatures";
import Footer from "components/footers/AnssFooter2";
import HeaderBase, { NavLinks, NavLink, PrimaryLink } from "components/headers/light.js";

const Header = tw(HeaderBase)`max-w-none`;
export default () => {
  return (
    <AnimationRevealPage>
      <Header />
      <MapSection mapMarginTop={true}/>
      <DashboardFeatures />
      {/* <DashboardTableau /> */}
      <Footer />
    </AnimationRevealPage>
  );
}
