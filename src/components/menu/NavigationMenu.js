import React from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { css } from "styled-components/macro"; //eslint-disable-line
import {ReactComponent as SvgDotPatternIcon} from "../../images/dot-pattern.svg"


import logo from "images/asean-logo.png";
import { LogoLink } from "components/headers/light.js";

const Row = tw.div`flex`;
const NavRow = tw(Row)`flex flex-col lg:flex-row items-center justify-between`;
const NavLink = tw.a`mt-4 lg:mt-0 transition duration-300 font-medium pb-1 border-b-2 mr-12 text-gray-700 border-gray-400 hocus:border-gray-700`;
const PrimaryNavLink = tw(
  NavLink
)`text-gray-100 bg-primary-500 px-6 py-3 border-none rounded hocus:bg-primary-900 focus:shadow-outline mt-6 md:mt-4 lg:mt-0`;
export default () => {
  const loginUrl = process.env.REACT_APP_PORTAL_URL2 ? process.env.REACT_APP_PORTAL_URL2 : "https://anss.dev.asiagate.com";
  return (
    <NavRow>
      <LogoLink href="/">
        <img src={logo} alt="" />
        ASEAN Nutrition Surveillance System
      </LogoLink>
      <div tw="flex flex-wrap justify-center lg:justify-end items-center -mr-12">
        <NavLink target="_blank" href="/dashboard">
          Dashboard
        </NavLink>
        <NavLink target="_blank" href="/indicator-registry">
          Indicator Registry
        </NavLink>
        <NavLink target="_blank" href="/afns-report">
          AFNS Report
        </NavLink>
        <NavLink target="_blank" href="/about-us">
          About Us
        </NavLink>
        <NavLink target="_blank" href="/contact-us">
          Contact Us
        </NavLink>
        <div tw="md:hidden flex-100 h-0"></div>
        <PrimaryNavLink target="_blank" href={loginUrl}>
          Login
        </PrimaryNavLink>
      </div>
    </NavRow>
  );
};
