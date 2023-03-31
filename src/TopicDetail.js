import React, { useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import tw from "twin.macro";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";

import TopicDetail from "components/anss/TopicDetail/index";
import Footer from "components/footers/AnssFooter2";
import HeaderBase from "./components/headers/light";
const Header = tw(HeaderBase)`max-w-none`;
export default () => {
  const {id} = useParams();
  return (
    <AnimationRevealPage>
       <Header  />
       <TopicDetail id={id} />
       <Footer />
    </AnimationRevealPage>
  );
}
