import React, { useState, useEffect} from "react";
import tw from "twin.macro";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";

import AfnsReportBody from "components/anss/afns-components/AfnsReportBody";
import Footer from "components/footers/AnssFooter2";
import HeaderBase from "./components/headers/light";
const Header = tw(HeaderBase)`max-w-none`;
export default () => {
  return (
    <AnimationRevealPage>
       <Header  />
       <AfnsReportBody />
       <Footer />
    </AnimationRevealPage>
  );
}
