import React, {useState, useEffect} from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { sanitize } from 'dompurify';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
import { ReactComponent as SvgDotPatternIcon } from "../../../images/dot-pattern.svg"
import VideoPlayer from "../about-us/VideoPlayer";
const Container = tw.div`relative`;

const SingleColumn = tw.div`max-w-screen-2xl mx-auto py-2 lg:py-3`;

const Description2 = tw.p`mt-2 text-sm md:text-base lg:text-base font-medium leading-relaxed w-full text-left`;
const Heading2 = tw.h2`text-2xl sm:text-4xl text-white font-black tracking-wide`;

const HeadingInfoContainer = tw.div`flex flex-col items-start md:px-40`;
 const HeadingTitle = tw.h2`text-3xl sm:text-4xl text-orange-500 font-black tracking-wide`
const Content = tw.div`my-2`;

const Card = styled.div(props => [
  tw`mt-2 md:flex justify-center items-center  py-2`,
  props.reversed ? tw`flex-row-reverse` : "flex-row"
]);
const Image = styled.div(props => [
  `background-image: url("${props.imageSrc}");`,
  tw`md:w-1/2 lg:w-1/2 xl:w-1/3 flex-shrink-0 h-80 md:h-80 bg-cover bg-center mx-4 sm:mx-8 md:mx-4 lg:mx-8 shadow-xl`
]);
const VideoDiv = tw.div`flex justify-center md:w-8/12 lg:w-1/2 xl:w-1/3 flex-shrink-0 h-auto md:h-auto mx-4 sm:mx-8 md:mx-4 lg:mx-8 shadow-xl`
const Details = tw.div`mt-2 md:mt-0 md:max-w-xl mx-2 sm:mx-8 md:mx-2 lg:mx-4 p-4`;
const Title = tw.h4`text-xl md:text-2xl lg:text-3xl font-bold text-gray-900`;
const Description = tw.p`mt-2 text-sm  leading-loose`;
const Link = tw.a`inline-block mt-4 text-sm text-primary-500 font-bold cursor-pointer transition duration-300 border-b-2 border-transparent hover:border-primary-500`;

const HeaderContent = tw.div`mt-2 lg:mt-4 py-2 h-auto min-w-full -mx-8`;
const ContentDiv = tw.div`max-w-screen-xl p-4 mx-auto`;
const DescriptionContent = tw.div`py-2 h-auto min-w-full -mx-8`;

const SvgDotPattern1 = tw(
  SvgDotPatternIcon
)`absolute top-0 left-0 transform -translate-x-20 rotate-90 translate-y-8 -z-10 opacity-25 text-blue-500 fill-current w-24`;
const SvgDotPattern2 = tw(
  SvgDotPatternIcon
)`absolute top-0 right-0 transform translate-x-20 rotate-45 translate-y-24 -z-10 opacity-25 text-blue-500 fill-current w-24`;
const SvgDotPattern3 = tw(
  SvgDotPatternIcon
)`absolute bottom-0 left-0 transform -translate-x-20 rotate-45 -translate-y-8 -z-10 opacity-25 text-blue-500 fill-current w-24`;
const SvgDotPattern4 = tw(
  SvgDotPatternIcon
)`absolute bottom-0 right-0 transform translate-x-20 rotate-90 -translate-y-24 -z-10 opacity-25 text-blue-500 fill-current w-24`;

const renderHTML = (escapedHTML) => {
  if(escapedHTML.includes("<ul>")){
    escapedHTML += "<style>ul > li {list-style-type: square;} ul { margin-left: 10%; }</style>" 
  }
 return React.createElement("div", {
    dangerouslySetInnerHTML: { __html: sanitize(escapedHTML) },
  });
}
  

  const LabelSource = tw.div`mt-8`;

export default ({cards, heading = "About Us", description = ""}) => {
  const textShadow = {
    textShadow: '2px 2px 0 hsl(200 50% 30%)'
  } 
  const textShadow2 = {
    textShadow: '1px 1px 0 hsl(200 50% 30%)'
  } 
  return (
    <>
      <Container>
          <HeaderContent style={{backgroundColor:"#4da1de"}}>
            <ContentDiv>
              <Heading2>{heading}</Heading2>
            </ContentDiv>
          </HeaderContent>
          {description && (<DescriptionContent style={{backgroundColor:"#0c53a1"}}>
            <ContentDiv >
                <Description2 style={{color:"#fefefe"}}>{description}</Description2>
            </ContentDiv>  
          </DescriptionContent>)}
      </Container>
      <Container style={{marginTop:"4px"}}>
      <SingleColumn>
        <Content>
          {cards.map((card, i) => (
            <Card key={i} reversed={i % 2 === 1}>
              {
                card?.attributes?.image_url ? ( <Image imageSrc={card?.attributes?.image_url} />) : 
                (
                  <>
                  
                    <VideoDiv>
                        <VideoPlayer  videoSrc={card?.attributes?.video_url}/>
                        {/* {card?.attributes?.source ? (<label><b>Source: </b>{card?.attributes?.source}</label>) : ""} */}
                    </VideoDiv>
                   
                  </>
                  
                )
              }
             
              <Details>
                <Title >{card?.attributes?.title}</Title>
                <Description>{renderHTML(card?.attributes?.summary ?? card?.attributes?.body)}</Description>
                {card?.attributes?.source ? (<LabelSource><b>Source: </b>{card?.attributes?.source ?? "N/A"}</LabelSource>) : ""}
              </Details>
            </Card>
          ))}
        </Content>
      </SingleColumn>
    </Container>
    </>
  );
};
