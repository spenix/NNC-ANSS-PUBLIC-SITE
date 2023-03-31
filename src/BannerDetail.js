import React, { useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import tw from "twin.macro";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";

import BannerDetail from "components/anss/BannerDetail/index";
import Footer from "components/footers/AnssFooter2";
import HeaderBase from "./components/headers/light";
const Header = tw(HeaderBase)`max-w-none`;
export default () => {
  const {id} = useParams();
  return (
    <AnimationRevealPage>
       <Header  />
       <BannerDetail id={id} />
       <Footer />
    </AnimationRevealPage>
  );
}
