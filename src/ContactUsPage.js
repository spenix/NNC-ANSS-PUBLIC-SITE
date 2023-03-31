import React, {useEffect, useState} from "react";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import tw from "twin.macro";
import { css } from "styled-components/macro"; //eslint-disable-line
import HeaderBase, { NavLinks, NavLink, PrimaryLink } from "components/headers/light.js";
import Footer from "components/footers/AnssFooter2";
import ContactUsForm from "components/anss/Contact-us/index";
import ContactDetails from "components/cards/ThreeColContactDetails.js";
import http from './utils/utils';
const Address = tw.span`leading-relaxed`;
const AddressLine = tw.span`block`;
const Email = tw.span`text-sm mt-6 block text-gray-500`;
const Phone = tw.span`text-sm mt-0 block text-gray-500`;

const Header = tw(HeaderBase)`max-w-none`;
export default () => {

  return (
    <AnimationRevealPage>
      <Header />
      <ContactUsForm />
      <Footer viewDiv={false}/>
    </AnimationRevealPage>
  );
};
