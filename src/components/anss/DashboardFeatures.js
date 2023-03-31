import React from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { Link } from "react-router-dom";
//eslint-disable-next-line
import { css } from "styled-components/macro";
import { SectionHeading } from "components/misc/Headings.js";

import defaultCardImage from "../../images/shield-icon.svg";

import { ReactComponent as SvgDecoratorBlob3 } from "../../images/svg-decorator-blob-3.svg";

import compare_and_analyze from "../../images/dashboard_nav/viber_image_2022-07-20_16-46-56-758.png";
import policies_and_programmes from "../../images/dashboard_nav/viber_image_2022-07-20_16-46-52-451.png";
import country_specific from "../../images/dashboard_nav/viber_image_2022-07-20_16-46-54-970.png";


const Container = tw.div`relative -mt-64 sm:-mt-32`;

const ThreeColumnContainer = styled.div`
  ${tw`flex flex-col items-center md:items-stretch md:flex-row flex-wrap md:justify-center max-w-screen-xl mx-auto py-4 md:py-6`}
`;
const Heading = tw(SectionHeading)`w-full`;

const Column = styled.div`
  ${tw`md:w-1/2 lg:w-1/3 px-6 flex`}
`;

const Card = styled.div`
  ${tw`flex flex-col mx-auto max-w-xl items-center px-6 py-6 border-2 shadow-lg rounded-xl mt-12 focus:outline-none transform bg-gray-100 transition duration-500 hover:scale-125 hover:bg-gray-300`}
  .imageContainer {
    ${tw`text-center p-2 flex-shrink-0 relative`}
    img {
      ${tw`w-80 h-64 rounded-full `}
    }
  }

  .textContainer {
    ${tw`mt-2 text-center`}
  }

  .title {
    ${tw`mt-2 font-bold text-xl leading-none text-gray-700 `}
  }

  .description {
    ${tw`mt-3 font-semibold text-secondary-100 text-sm leading-loose`}
  }
`;

const DecoratorBlob = styled(SvgDecoratorBlob3)`
  ${tw`pointer-events-none absolute right-0 bottom-0 w-64 opacity-25 transform translate-x-32 translate-y-48 `}
`;
const NavLink = tw(Link)``;

export default () => {
  const cards = [
    {
      imageSrc: compare_and_analyze,
      title: "Analyze",
      route: "compare-and-analyze"
    },
    { 
      imageSrc: country_specific, 
      title: "Country Specific",
      route: "country-specific" 
    },
    { 
      imageSrc: policies_and_programmes, 
      title: "Policies & Programmes", 
      route:"policies-and-programmes" 
    },
  ];

  return (
    <Container>
      <ThreeColumnContainer>
        {/* <Heading>Our Professional <span tw="text-gray-500">Services</span></Heading> */}
        {cards.map((card, i) => (
          <Column key={i}>
            <NavLink to={`/dashboard/${card?.route}`}>
            <Card>
              <span className="imageContainer">
                <img src={card.imageSrc || defaultCardImage} alt=""  />
              </span>
              <span className="textContainer">
                <span className="title">{card.title || "Fully Secure"}</span>
                {/* <p className="description">
                  {card.description || "Lorem ipsum donor amet siti ceali ut enim ad minim veniam, quis nostrud. Sic Semper Tyrannis. Neoas Calie artel."}
                </p> */}
              </span>
            </Card>
            </NavLink>
          </Column>
        ))}
      </ThreeColumnContainer>
    </Container>
  );
};
