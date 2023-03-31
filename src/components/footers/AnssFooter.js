import React from "react";
import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro"; //eslint-disable-line
import { PrimaryButton as PrimaryButtonBase } from "components/misc/Buttons.js";

import LogoImage from "images/logo.svg";
import logo from "images/anss/Logos/cropped-logo-asean-home-4.png";
import { ReactComponent as FacebookIcon } from "images/facebook-icon.svg";
import { ReactComponent as TwitterIcon } from "images/twitter-icon.svg";
import { ReactComponent as YoutubeIcon } from "images/youtube-icon.svg";

const Container = tw.div`relative bg-blue-800 text-gray-200 -mb-8 -mx-8 px-8 py-20 lg:py-24`;
const Content = tw.div`max-w-screen-xl mx-auto relative z-10`;
const SixColumns = tw.div`flex flex-wrap text-center sm:text-left justify-center sm:justify-start md:justify-between -mt-12`;

const Column = tw.div`px-4 sm:px-0 sm:w-1/4 md:w-auto mt-12`;

const ColumnHeading = tw.h5`uppercase font-bold`;

const LinkList = tw.ul`mt-6 text-sm font-medium`;
const LinkListItem = tw.li`mt-3`;
const Link = tw.a`border-b-2 border-transparent hocus:border-gray-700 pb-1 transition duration-300`;

const SubscribeNewsletterColumn = tw(Column)`text-center lg:text-left w-full! lg:w-auto! mt-20 lg:mt-12`;
const SubscribeNewsletterContainer = tw.div`max-w-sm mx-auto lg:mx-0 `;
const SubscribeText = tw.p`mt-2 lg:mt-6 text-sm font-medium text-gray-600`;
const SubscribeForm = tw.form`mt-4 lg:mt-6 text-sm sm:flex max-w-xs sm:max-w-none mx-auto sm:mx-0`;
const Input = tw.input`bg-gray-300 px-6 py-3 rounded sm:rounded-r-none border-2 sm:border-r-0 border-gray-400 hover:border-primary-500 focus:outline-none transition duration-300 w-full`;
const SubscribeButton = tw(PrimaryButtonBase)`mt-4 sm:mt-0 w-full sm:w-auto rounded sm:rounded-l-none px-8 py-3`;

const Divider = tw.div`my-16 border-b-2 border-gray-300 w-full`;

const ThreeColRow = tw.div`flex flex-col md:flex-row items-center justify-between`;

const LogoContainer = tw.div`flex items-start justify-start`;
const LogoImg = tw.img`w-auto bg-white`;
const LogoText = tw.h5`ml-2 text-xl font-black tracking-wider text-gray-800`;

const CopywrightNotice = tw.p`text-center text-sm sm:text-base mt-8 md:mt-0 font-medium text-gray-500`;

const SocialLinksContainer = tw.div`mt-8 md:mt-0 flex`;
const SocialLink = styled.a`
  ${tw`cursor-pointer p-2`}
`;

export default () => {
  return (
    <Container>
      <Content>
        <ThreeColRow>
          <LogoContainer>
            <ul>
              <li>
                <LogoContainer>
                  <LogoImg src={logo} />
                  {/* <LogoText>ASEAN</LogoText> */}
                </LogoContainer>
              </li>
              <li>
                 {/* <CopywrightNotice>&copy; {new Date().getFullYear()} NNC Philippines.</CopywrightNotice> */}
                 &copy;{new Date().getFullYear()} ASEAN Secretariat. <span className="capitalize">All Rights Reserved</span>.
              </li>
              <li>All Content is in the public domain unless otherwise stated.</li>
            </ul>
           
          </LogoContainer>
         
          <SocialLinksContainer>
            <ul>
              <li>Links:</li>
              <li><SocialLink href="https://asean.org/" target="_blank">ASEAN Secretariat asean.org</SocialLink></li>
              <li><SocialLink href="https://nnc.gov.ph/" target="_blank">National Nutrition Council of the Philippines nnc.gov.ph</SocialLink></li>
            </ul>
            
          </SocialLinksContainer>
        </ThreeColRow>
      </Content>
    </Container>
  );
};
