import React, { useState, useEffect} from "react";
import tw from "twin.macro";
import { css } from "styled-components/macro"; //eslint-disable-line
import AnimationRevealPage from "helpers/AnimationRevealPage.js";

import http from "./utils/utils";
import MetadataBody from "components/anss/MetadataBody";
import Footer from "components/footers/AnssFooter2";
import HeaderBase from "./components/headers/light";
const Header = tw(HeaderBase)`max-w-none`;

export default () => {
  // const [pageContent, setPageContent] = useState([]);

  // const getIndicatoreRegistryFeatures = async () => {
  //  const {data: {data}} = await http.get('cms/pages/filter?content_type_id=2');
  //  console.log(data);
  // }

  // useEffect(() => {
  //   getIndicatoreRegistryFeatures();
  // }, [])
  return (
    <AnimationRevealPage>
       <Header  />
       <MetadataBody />
       <Footer />
    </AnimationRevealPage>
  );
}
