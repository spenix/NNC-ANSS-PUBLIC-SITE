import React from "react";
import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro"; //eslint-disable-line
import { PrimaryButton as PrimaryButtonBase } from "components/misc/Buttons.js";

import LogoImage from "images/anss/Logos/cropped-logo-asean-home-4.png";
import { ReactComponent as FacebookIcon } from "../../images/facebook-icon.svg";
import { ReactComponent as TwitterIcon } from "../../images/twitter-icon.svg";
import { ReactComponent as YoutubeIcon } from "../../images/youtube-icon.svg";

const Container = tw.div`relative bg-gray-100 text-gray-700 -mb-8 -mx-8  pt-20 lg:pt-24`;
const Content = tw.div`max-w-screen-xl mx-auto relative z-10`;
const SixColumns = tw.div`flex flex-wrap text-center sm:text-center md:text-left justify-center sm:justify-start md:justify-around -mt-32 py-8`;
const Column = tw.div`px-4  sm:p-4 sm:w-full md:w-1/3 mt-12`;
const ColumnHeading = tw.h6`text-base font-bold text-black`;
const LinkList = tw.ul`mt-4 text-sm list-none font-medium`;
const LinkListItem = tw.li`mt-1`;
const Link = tw.a`border-b-2 border-transparent underline pb-1`;
const SubscribeNewsletterColumn = tw(Column)`text-center lg:text-left w-full! lg:w-auto! mt-20 sm:mt-10 lg:mt-12`;
const SubscribeNewsletterContainer = tw.div`max-w-sm mx-auto lg:mx-0 `;
const SubscribeText = tw.p`mt-2 lg:mt-6 text-sm font-medium text-gray-600`;
const SubscribeForm = tw.form`mt-4 lg:mt-6 text-sm sm:flex max-w-xs sm:max-w-none mx-auto sm:mx-0`;
const Input = tw.input`bg-gray-300 px-6 py-3 rounded sm:rounded-r-none border-2 sm:border-r-0 border-gray-400 hover:border-blue-800 focus:outline-none transition duration-300 w-full`;
const SubscribeButton = tw(PrimaryButtonBase)`mt-4 sm:mt-0 w-full sm:w-auto rounded bg-blue-800 sm:rounded-l-none px-8 py-3`;
const Divider = tw.div`mt-16 border-b-2 border-gray-300 w-full`;
const ThreeColRow = tw.div`flex flex-col md:flex-row items-center justify-between`;
const LogoContainer = tw.div`flex items-center justify-center md:justify-start`;
const LogoImg = tw.img`w-auto bg-white`;
const LogoText = tw.h5`ml-2 text-xl font-bold tracking-wider text-gray-800`;
const ButtomFooter = tw.div`py-10 h-full w-full bg-white`;
const CopywrightNotice = tw.p`text-center text-sm text-base mt-8 md:mt-0 font-medium  font-bold text-black`;

const SocialLinksContainer = tw.div`mt-8 md:mt-0 flex`;
const SocialLink = styled.a`
  ${tw`cursor-pointer p-2 rounded-full bg-blue-800 text-gray-100 hover:bg-blue-500 transition duration-300 mr-4 last:mr-0`}
  svg {
    ${tw`w-4 h-4`}
  }
`;

const Address = tw.span`leading-relaxed`;
const AddressLine = tw.span`text-base block text-black`;
const Phone = tw.span`text-base text-sm mt-0 block text-black`;
const FoxNumber = tw.span`text-base text-sm mt-0 block text-black`;
const Email = tw.span`text-base text-sm mt-0 block text-black`;


export default ({ viewDiv = true }) => {
  return (
    <Container>
      <Content>
        {
          viewDiv ? 
          ( 
            <>
              <SixColumns>
          <Column>
            <ColumnHeading>The ASEAN Secretariat</ColumnHeading>
            <LinkList>
              <LinkListItem style={{ listStyleType: "none" }}>
                    <Address>
                        <AddressLine>
                            70A Jalan Sisingamangaraja <br/> Jakarta 12110
                        </AddressLine>
                    </Address>
                    
              </LinkListItem>
              <LinkListItem style={{ listStyleType: "none" }}>
                    <Phone>
                        P: (+6221)7262991, 7243372
                    </Phone>
              </LinkListItem>
              <LinkListItem style={{ listStyleType: "none" }}>
                    <FoxNumber>
                    F: (+6221)7398234, 7243504
                    </FoxNumber>
              </LinkListItem>
              <LinkListItem style={{ listStyleType: "none" }}>
                    <Email>M: <Link href="https://asean.org/" target="_blank" style={{ color:"#1f429d" }}>public@asean.org</Link> </Email>
              </LinkListItem>
            </LinkList>
          </Column>
          <Column>
            <ColumnHeading>National Nutrition Council of the Philippines</ColumnHeading>
            <LinkList>
              <LinkListItem style={{ listStyleType: "none" }}>
                    <Address>
                        <AddressLine>
                                Nutrition Building, <br/>
                                2332 Chino Roces Avenue Extension,<br/> 
                                Taguig City <br/>
                                Philippines 1630
                        </AddressLine>
                    </Address>
              </LinkListItem>
              <LinkListItem style={{ listStyleType: "none" }}>
                <Phone>P: (+632) 8892.4271, 8843.0142</Phone>
              </LinkListItem>
              <LinkListItem style={{ listStyleType: "none" }}>
                <FoxNumber>
                    F: (632) 8843.5818
                </FoxNumber>    
              </LinkListItem>
            </LinkList>
          </Column>
         
          <SubscribeNewsletterColumn>
            {/* <SubscribeNewsletterContainer>
              <ColumnHeading>Subscribe to our Newsletter</ColumnHeading>
              
              <SubscribeForm method="get" action="#">
                <Input type="email" placeholder="Your Email Address" />
                <SubscribeButton type="submit" >Subscribe</SubscribeButton>
              </SubscribeForm>
            </SubscribeNewsletterContainer> */}
          </SubscribeNewsletterColumn>
        </SixColumns>
        {/* <Divider /> */}
            </>
          ) : ""
        }
 
       
      </Content>
      <ButtomFooter>
        <Content>
        <ThreeColRow>
          <LogoContainer>
            <LogoImg src={LogoImage} />
            {/* <LogoText>Treact Inc.</LogoText> */}
          </LogoContainer>
          <CopywrightNotice>&copy; {new Date().getFullYear()} ASEAN Secretariat. <span className="capitalize">All Rights Reserved</span>.</CopywrightNotice>
          {/* <SocialLinksContainer>
            <SocialLink href="https://facebook.com">
              <FacebookIcon />
            </SocialLink>
            <SocialLink href="https://twitter.com">
              <TwitterIcon />
            </SocialLink>
            <SocialLink href="https://youtube.com">
              <YoutubeIcon />
            </SocialLink>
          </SocialLinksContainer> */}
        </ThreeColRow>
        </Content>
      </ButtomFooter>
    </Container>
  );
};
