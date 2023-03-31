import React, {useState, useEffect} from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import tw from "twin.macro";
import Slider from "react-slick";
import { sanitize } from 'dompurify';
import ReactHtmlParser, { convertNodeToElement, processNodes } from "react-html-parser";
import HeaderBase, { NavLinks, NavLink, PrimaryLink } from "components/headers/light.js";
import { Container as ContainerBase } from "components/misc/Layouts.js";
import { PrimaryButton as PrimaryButtonBase } from "../misc/Buttons";
import { ReactComponent as ChevronLeftIcon } from "feather-icons/dist/icons/chevron-left.svg";
import { ReactComponent as ChevronRightIcon } from "feather-icons/dist/icons/chevron-right.svg";

import '../../styles/textCss.css'
const Header = tw(HeaderBase)`max-w-none`;
export const SectionDescription = tw.p`mt-4 text-sm md:text-base lg:text-lg font-medium leading-relaxed text-secondary-300 max-w-xl`;
const Description = tw(SectionDescription)`w-full lg:text-base text-gray-lightest max-w-lg`;
const Content2Xl= tw.div`max-w-full mx-auto`;

const Column = tw.div`w-full max-w-full mx-auto md:max-w-none md:mx-0`;
// const TextColumn = tw(Column)`mr-auto max-w-lg lg:max-w-xl xl:max-w-2xl py-10 px-12`;
// const RightColumn = tw(Column)`md:w-5/12 mt-8 min-h-full md:h-auto`;

const BtnLink = tw(Link)``;
const Image = tw.div`md:w-5/12 max-w-full min-h-full rounded shadow-xl`;
const Heading = tw.h2`text-xl mb-4 sm:text-xl font-black tracking-wide text-center text-left text-white  leading-snug xl:text-2xl`;
const Container = tw(ContainerBase)`mt-4 py-2 lg:my-2 -mx-8`;
const ControlsContainer = tw.div`flex justify-center -mt-20  items-center lg:pt-0 w-full mx-auto sm:px-4`
const ControlButton = styled.button`
  ${tw`font-bold  rounded bg-gray-700 text-gray-100 hocus:bg-gray-800 hocus:text-gray-200 opacity-50 focus:shadow-outline focus:outline-none transition duration-300 mt-2 sm:mt-0 first:ml-0 ml-6 rounded-full p-2`}
  svg {
        ${tw`w-6 h-6`}
      }
`;
const PrimaryButton = tw(PrimaryButtonBase)`mt-4 md:mt-5 text-sm inline-block bg-opacity-50 mx-auto md:mx-0`;
const HeroSlider = styled(Slider)`
  ${tw`flex max-w-full sm:max-w-full lg:max-w-full text-left  text-gray-900`}
  .slick-track {
    ${tw`flex!`}
  }
  .slick-slide {
    ${tw`h-auto`}
  }
  .slick-slide > div {
    ${tw`h-full`}
  }
`;





export default ({
  bannerList
}) => {
  var isMobile = window.screen.width < 800 ? true : false;
  const [sliderRef, setSliderRef] = useState(null);
  const settings = {
      autoplay: true,
      speed: 2000,
      autoplaySpeed: 6000,
      slidesToShow: 1,
      slidesToScroll: 1
  };


  var textOnLeftStat = true;
  var newBannerList = bannerList.map(banner => {
    textOnLeftStat = !textOnLeftStat;
    return {
      banner_image:banner?.attributes?.image_url ?? banner?.attributes?.video_url,
      title: banner?.attributes?.title,
      summary: banner?.attributes?.summary,
      body:banner?.attributes?.body,
      textOnLeft: true,
      id: banner?.id
    }
  });

  const renderHTML = (escapedHTML) => {
    if(escapedHTML.includes("<ul>")){
      escapedHTML += "<style>ul > li {list-style-type: square;} ul { margin-left: 10%; }</style>" 
    } 
    return React.createElement("div", {
      dangerouslySetInnerHTML: { __html: sanitize(escapedHTML) },
    });
  }
 
 
  const Row = isMobile ? tw.div`static flex h-screen flex-nowrap lg:flex-row lg:h-4/6 bg-center bg-no-repeat bg-cover justify-between items-start h-auto max-w-full` 
    : tw.div`static flex h-screen flex-nowrap lg:flex-row lg:h-4/6 bg-left-top bg-no-repeat bg-cover justify-between items-start h-auto max-w-full`;

  const TextColumn = isMobile ? styled(Column)(props => [
    tw`md:w-5/12 lg:w-5/12 sm:w-full py-4 px-4 h-full bg-black bg-opacity-50 mt-48 mx-5 transition duration-500 ease-in-out hover:bg-black hover:bg-opacity-75 transform hover:-translate-y-1 `,
    props.textOnLeft ? tw`md:mr-3 lg:mr-4 md:order-first` : tw`md:ml-3 lg:ml-4 md:order-last`
  ]) : styled(Column)(props => [
    tw`md:w-5/12 lg:w-5/12 sm:w-full py-4 px-4 h-full bg-black bg-opacity-50 mt-80 mx-10 transition duration-500 ease-in-out hover:bg-black hover:bg-opacity-75 transform hover:-translate-y-1 `,
    props.textOnLeft ? tw`md:mr-3 lg:mr-4 md:order-first` : tw`md:ml-3 lg:ml-4 md:order-last`
  ]);
  // css

  function transform(node, index) {
    // return null to block certain elements
    // don't allow <span> elements
    if (node.type === "tag" && node.name === "span") {
      return null;
    }
  
    // Transform <ul> into <ol>
    // A node can be modified and passed to the convertNodeToElement function which will continue to render it and it's children
    if (node.type === "tag" && node.name === "ul") {
      node.name = "ol";
      return convertNodeToElement(node, index, transform);
    }
  
    // return an <i> element for every <b>
    // a key must be included for all elements
    if (node.type === "tag" && node.name === "b") {
      return <i key={index}>{processNodes(node.children, transform)}</i>;
    }
  
    // all links must open in a new window
    if (node.type === "tag" && node.name === "a") {
      node.attribs.target = "_blank";
      // console.log(node);
      // console.log(index);
      return convertNodeToElement(node, index, transform);
    }
  }

  const options = {
    decodeEntities: true,
    transform
  };

  const html = `<h1>Transform Example</h1>

<span>span elements are banned and won't be included in the output</span>

<ul>
  <li>This unordered list has been transformed</li>
  <li>into an ordered list</li>
</ul>

<p>
  React components can be returned directly.
  <b>This bold tag will be replaced directly with manually specified React element</b>
</p>

<button type="button">this is button</button>

<p>
  Attributes can also be modified.
  All links like <a href="https://facebook.github.io/react/">this one</a>
  and <a href="https://github.com/wrakky/react-html-parser">this one</a>
  will automatically have the <code>target="_blank"</code> attribute added to them.
</p>

`;

  return (
    <>
        <Container>
          <HeroSlider {...settings} arrows={false} ref={setSliderRef}>
            {
              newBannerList.map((item, index) =>{
                return (
                  <Content2Xl  key={index}>
                    <Row style={{ backgroundImage: `url(${item.banner_image})`, minHeight:`${isMobile ? "350px" : "650px" }`}}>
                      <TextColumn textOnLeft={item.textOnLeft}>
                        <Heading className="ellipse-paragraph2" style={{fontSize:"1.75rem !important"}}>{item.title}</Heading>
                        <Description className="ellipse-paragraph3">{ReactHtmlParser(html,options)}</Description>
                        {
                          item.body ? (
                            <BtnLink to={`/dashboard/banner/${item.id}`}>
                              <PrimaryButton>
                                  READ MORE
                              </PrimaryButton>
                            </BtnLink>
                          ) : ""  
                        }
                      </TextColumn>
                    </Row>
                  </Content2Xl>
                )
              })
            }
          </HeroSlider>
          {/* {
            Object.keys(newBannerList).length > 1 ?
            (
              <ControlsContainer >
              <ControlButton onClick={sliderRef?.slickPrev}>
                <ChevronLeftIcon />
              </ControlButton>
              <ControlButton onClick={sliderRef?.slickNext}>
                <ChevronRightIcon />
              </ControlButton>
            </ControlsContainer>
            ) :"" 
          } */}
        </Container>
    </>
  );
};
