import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro";
import { Container } from "components/misc/Layouts.js";
import {SectionDescription} from "components/misc/Typography";
import http from "../../../utils/utils";
import Slider from "react-slick";
import { PrimaryButton as PrimaryButtonBase } from "components/misc/Buttons";
import { ReactComponent as ChevronLeftIcon } from "feather-icons/dist/icons/chevron-left.svg";
import { ReactComponent as ChevronRightIcon } from "feather-icons/dist/icons/chevron-right.svg";

import NoImage from "../../../images/anss/Logos/istockphoto-922962354-612x612.jpg"
const SubheadingBase = tw.h5`font-bold text-blue-800`
const HeadingContainer = tw.div``
const Heading = tw.h4`text-2xl sm:text-3xl text-orange-500 font-black tracking-wide`
const Subheading = tw(SubheadingBase)`text-center mb-3`
const Description = tw(SectionDescription)`mx-auto text-center`
const ContentWithPaddingXl = tw.div`max-w-screen-xl mx-auto py-4 lg:py-6`;
const Cards = tw.div`flex flex-wrap flex-row justify-center w-full sm:max-w-2xl  lg:max-w-full mx-auto`
const Card = tw.div`mt-8 w-full sm:w-1/2 md:w-1/3 lg:w-1/5 flex flex-col items-center px-6`
const NavLink = tw(Link)``;
const DataSourceDiv = tw.div`mt-10`;

const CardImage = styled.div`
  ${props => css`background-image: url("${props.imageSrc}"); object-fit: fit;`}
  ${tw`w-64 h-32 bg-no-repeat bg-contain bg-center shadow-md bg-cover`}
`
const CustodianCard = tw.div`h-auto flex! flex-col justify-center shadow-xl rounded-lg  relative focus:outline-none transform bg-gray-200 transition duration-500 hover:scale-125 hover:bg-gray-300`;
const CustodianCardImage = styled.div(props => [
  `background-image: url("${props.imageSrc}");`,
  tw`w-full h-64 sm:h-64 bg-cover bg-center rounded-t-lg sm:rounded-t-lg`
]);

const FlagImage = tw.img`object-none object-fill w-64 h-32  sm:h-32  lg:h-32   shadow-xl transition duration-500 hover:scale-150 hover:bg-gray-lightest hover:p-1`
const Image = tw.img`object-none object-center object-fill  h-32 sm:w-32 sm:h-48 lg:w-56 lg:h-48  shadow-xl transition duration-500 hover:scale-150 hover:bg-gray-lightest hover:p-1`
const CardContent = styled.div`
  ${tw`flex flex-col items-center mt-2`}
  .position {
    ${tw`uppercase font-bold tracking-widest text-xs text-blue-800`}
  }
  .name {
    ${tw`mt-1 text-sm font-medium text-gray-900`}
  9
`

const CardLinks = styled.div`
  ${tw`mt-6 flex`}
  .link {
    ${tw`mr-8 last:mr-0 text-gray-400 hocus:text-blue-800 transition duration-300`}
    .icon {
      ${tw`fill-current w-6 h-6`}
    }
  }
`

const CardSlider = styled(Slider)`
  ${tw`mt-6`}
  .slick-track { 
    ${tw`flex`}
  }
  .slick-slide {
    ${tw`h-auto flex justify-center mb-1`}
  }
`;

const ControlButton = styled(PrimaryButtonBase)`
  ${tw`mt-4 sm:mt-0 first:ml-0 ml-6 rounded-full p-2`}
  svg {
    ${tw`w-6 h-6`}
  }
`;
const Controls = tw.div`flex justify-center mt-5`;
const PrevButton = tw(ControlButton)``;
const NextButton = tw(ControlButton)``;
export default ({heading = "Resources", description = null, intl_flag = true }) => {
    const [custodians, setCustodians] = useState([]);
    const [countries, setCountries] = useState([]);
    const [sliderRef, setSliderRef] = useState(null);
    var isMobile = window.screen.width < 800 ? true : false;
    
    var settings = {
      autoplay: true,
      infinite: true,
      speed: 1000,
      slidesToShow: 5,
      responsive: [
        // {
        //   breakpoint: 1024,
        //   settings: {
        //     slidesToShow: 3,
        //     slidesToScroll: 3,
        //     infinite: true,
        //     dots: true
        //   }
        // },
        // {
        //   breakpoint: 600,
        //   settings: {
        //     slidesToShow: 2,
        //     slidesToScroll: 2,
        //     initialSlide: 2
        //   }
        // },
        // {
        //   breakpoint: 480,
        //   settings: {
        //     slidesToShow: 1,
        //     slidesToScroll: 1
        //   }
        // }
        {
          key: 1,
          breakpoint: 1280,
          settings: {
            slidesToShow: 2,
          }
        },
        {
          key: 2,
          breakpoint: 900,
          settings: {
            slidesToShow: 1,
          }
        },
      ]
    };
    const getAllCustodian = async () => {
        const {data} = await http.get(`indicators/datacustodians-all-intl?intl_flag=${intl_flag}`);
        setCustodians(data.data);
    }

    // const getAllConties = async () => {
    //     const {data} = await http.get(`member-states`);
    //     console.log(data);
    // }

    const getAllConties = async () => {
      const {data} = await http.get(`member-states`);
 
      setCountries(data?.data);
  }
    
    useEffect(() => {
        getAllCustodian();
        getAllConties();
    }, [])

  const MemberCountries = [];
  for (const countryDetails of countries) {
    MemberCountries.push({
      id: countryDetails.id,
      // flagImage: `https://countryflagsapi.com/svg/${countryDetails?.attributes?.iso_alpha}`,
      flagImage: `/CountriesFlag/${countryDetails?.attributes?.iso_alpha}.png`,
      country: countryDetails?.attributes?.name,
      unsd: countryDetails?.attributes?.unsd,
      ISOAlpha: countryDetails?.attributes?.iso_alpha
    });
  }
  var MemberCountryList = MemberCountries.sort((a, b) => { return (a?.country).localeCompare(b?.country)})
  return (
    <Container>
      <ContentWithPaddingXl>
        <DataSourceDiv>
        <HeadingContainer>
          {heading && <Heading>International Data Sources</Heading> }
          {description && <Description>{description}</Description> }
        </HeadingContainer>
          <CardSlider ref={setSliderRef} arrows={false} {...settings}>
              {
                custodians.map((item, i) => {
                  return (
                    
                      <CustodianCard  key={i}>
                        <NavLink  to={`/data-source/international/${item.id}`}>
                          <Image src={item?.attributes?.thumbnail ?? NoImage}/>
                        </NavLink>
                      </CustodianCard>
                  )
                })
              }
          </CardSlider>
          {
            custodians.length > 5 ? (
              <Controls>
                <PrevButton onClick={sliderRef?.slickPrev}><ChevronLeftIcon/></PrevButton>
                <NextButton onClick={sliderRef?.slickNext}><ChevronRightIcon/></NextButton>
              </Controls>
            ) : isMobile && custodians.length > 1 ?  (
              <Controls>
                <PrevButton onClick={sliderRef?.slickPrev}><ChevronLeftIcon/></PrevButton>
                <NextButton onClick={sliderRef?.slickNext}><ChevronRightIcon/></NextButton>
              </Controls>
            ) : ""
          } 
        </DataSourceDiv>
        <DataSourceDiv>
          <HeadingContainer>
            {heading && <Heading>National Data Sources</Heading> }
            {description && <Description>{description}</Description> }
          </HeadingContainer>
          <Cards>
            
            {MemberCountryList.map((country, index) => (
             
                <Card key={index} >
                   <NavLink  to={`/data-source/national/${country.id}`}>
                    <FlagImage src={country.flagImage} />
                    <CardContent>
                      <span className="position">{country.position}</span>
                      <span className="name">{country.country}</span>
                    </CardContent>
                  </NavLink>
                </Card>
              ))}
          </Cards>
        </DataSourceDiv>
      </ContentWithPaddingXl>
    </Container>
  );
};
