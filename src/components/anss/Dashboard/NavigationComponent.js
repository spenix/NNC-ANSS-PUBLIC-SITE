import React from 'react'
import { Link } from 'react-router-dom'; 
import tw from "twin.macro";
import styled from "styled-components";
import compare_and_analyze from "../../../images/dashboard_nav/viber_image_2022-07-20_16-46-56-758.png";
import policies_and_programmes from "../../../images/dashboard_nav/viber_image_2022-07-20_16-46-52-451.png";
import country_specific from "../../../images/dashboard_nav/viber_image_2022-07-20_16-46-54-970.png";

const Container = tw.div`relative mt-10`;
const ImgContainer = tw.div`h-auto w-full flex justify-center`;

const ThreeColumnContainer = styled.div`
  ${tw`flex flex-col items-center md:items-stretch md:flex-row flex-wrap md:justify-center max-w-screen-xl mx-auto py-2 md:py-4`}
`;
const Column = styled.div`
  ${tw`w-1/3 -mx-20 md:-mx-10 lg:-mx-20 `}
`;

// const Image = styled.div(props => [
//   `background-image: url("${props.imageSrc}");`,
//   tw`bg-cover object-cover bg-center bg-no-repeat w-56 h-56 sm:h-56 lg:h-56  rounded-full`
// ]);
const Image = tw.img`object-none object-center object-fill w-auto h-32 sm:h-32 lg:h-48  rounded-full shadow-xl transition duration-500 hover:scale-150 hover:bg-gray-lightest hover:p-1`
const Label = tw.div`w-full text-base lg:text-base font-black text-center mt-5`;
const NavLink = tw(Link)``;
function NavigationComponent() {
  var isMobile = window.screen.width < 800 ? true : false;
  const cards = [
    {
      imageSrc: compare_and_analyze,
      title: "Analyze Data",
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
        {
          cards.map((item, i) => {
            return (
              <Column key={i} style={isMobile ? {marginBottom:"20px"}: {}}>
                <ImgContainer>
                  <NavLink to={`/dashboard/${item.route}`}>
                    <Image src={item.imageSrc} style={{ maxHeight:'9rem' }}/>
                  </NavLink>
                </ImgContainer>
                <Label>{item.title}</Label>
              </Column>
            )
          })
        }
      </ThreeColumnContainer>
    </Container>
  )
}

export default NavigationComponent