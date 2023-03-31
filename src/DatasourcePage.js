import React, { useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import tw from "twin.macro";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";

import Datasources from "components/anss/Datasources/index";
import Footer from "components/footers/AnssFooter2";
import HeaderBase from "./components/headers/light";
const Header = tw(HeaderBase)`max-w-none`;
export default () => {
  const {datatype, id} = useParams();
  return (
    <AnimationRevealPage>
       <Header  />
       <Datasources id={id} datatype={datatype} heading={`${datatype == "national" ? "National" : "International"} Data Sources`}/>
       <Footer />
    </AnimationRevealPage>
  );
}
