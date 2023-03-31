import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import tw from "twin.macro";
import styled from "styled-components";
import { sanitize } from 'dompurify';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
// import { SectionHeading } from "components/misc/Headings";
import { PrimaryButton as PrimaryButtonBase } from "components/misc/Buttons";
import { ReactComponent as ChevronLeftIcon } from "feather-icons/dist/icons/chevron-left.svg";
import { ReactComponent as ChevronRightIcon } from "feather-icons/dist/icons/chevron-right.svg";

import '../../styles/textCss.css'
const Container = tw.div`relative`;
const Content = tw.div`max-w-screen-xl mx-auto mb-2 py-6 lg:py-8`;
const SectionHeading = tw.h3`text-3xl sm:text-4xl text-orange-600 hover:text-orange-500 font-black tracking-wide text-center`;
const HeadingWithControl = tw.div`flex flex-col items-center sm:items-stretch sm:flex-row justify-between`;
const Heading = tw(SectionHeading)``;
const Controls = tw.div`flex justify-center mt-5`;
const ControlButton = styled(PrimaryButtonBase)`
  ${tw`mt-4 sm:mt-0 first:ml-0 ml-6 rounded-full p-2`}
  svg {
    ${tw`w-6 h-6`}
  }
`;
const PrevButton = tw(ControlButton)``;
const NextButton = tw(ControlButton)``;
const CardSlider = styled(Slider)`
  ${tw`mt-2`}
  .slick-track { 
    ${tw`flex`}
  }
  .slick-slide {
    ${tw`h-auto flex justify-start mb-1`}
  }
`;

// const CardImage = styled.div(props => [
//   `background-image: url("${props.imageSrc}");`,
//   tw`w-full h-56 sm:h-64 bg-cover bg-center bg-no-repeat rounded-t-lg sm:rounded-t-lg`
// ]);
const Image = tw.img`object-none object-left-top object-cover h-auto  sm:h-80  lg:h-96 lg:h-80`
const TextInfo = tw.div`py-6 px-2 sm:px-6 sm:py-6`;
const TitleReviewContainer = tw.div`flex flex-col sm:flex-row sm:justify-between sm:items-center`;
const Title = tw.h5`text-base text-orange-500 font-bold`;

const RatingsInfo = styled.div`
  ${tw`flex items-center sm:ml-4 mt-2 sm:mt-0`}
  svg {
    ${tw`w-6 h-6 text-yellow-500 fill-current`}
  }
`;
const Description = tw.p`text-sm leading-loose mt-2 sm:mt-4`;
const SecondaryInfoContainer = tw.div`flex flex-col sm:flex-row mt-2 sm:mt-4`;
const IconWithText = tw.div`flex items-center mr-6 my-2 sm:my-0`;
const IconContainer = styled.div`
  ${tw`inline-block rounded-full p-2 bg-gray-700 text-gray-100`}
  svg {
    ${tw`w-3 h-3`}
  }
`;
const ButtonDiv = tw.div`flex justify-center`;

export default ({title = "Highlights", viewTitle = false, thumbnailList, idNotInclude = 0, pageRoute = '/dashboard/highlight'}) => {
  // useState is used instead of useRef below because we want to re-render when sliderRef becomes available (not null)
  var isMobile = window.screen.width < 800 ? true : false;
  const [cards, setCards] = useState([]);
  const [sliderRef, setSliderRef] = useState(null);
  const [sliderSettings, setSliderSettings] = useState({
    arrows: false,
    slidesToShow: thumbnailList.length > 2 ? 3 : 2,
    responsive: [
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
  });
  useEffect(() => {
    if(idNotInclude)
      window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [idNotInclude])
  useEffect(() => {
      var selectedThumbnailList = thumbnailList.filter((item) => {
        return item.id != idNotInclude;
      })
      var cardList = selectedThumbnailList.map(item => {
        return {
          imageSrc: item?.attributes?.image_url ?? item?.attributes?.video_url,
          description: ReactHtmlParser(item?.attributes?.summary),
          ...item?.attributes,
          id: item?.id
        }
      });
      setSliderSettings((prevState) => ({ ...prevState, slidesToShow: cardList.length > 3 ? 3 :  cardList.length}));
      setCards(cardList);
  }, [thumbnailList])

  const textShadow = {
    textShadow: '2px 2px 0 #a1b2cc'
  } 
  const renderHTML = (escapedHTML) => {
    if(escapedHTML.includes("<ul>")){
      escapedHTML += "<style>ul > li {list-style-type: square;} ul { margin-left: 10%; }</style>" 
    }
    React.createElement("div", {
      dangerouslySetInnerHTML: { __html: sanitize(escapedHTML) },
    });
  }
 

  const Card = isMobile ? tw.div`h-full flex! flex-col shadow-xl md:mx-2 lg:mx-4 w-full relative focus:outline-none transform bg-white transition duration-500 hover:scale-125 hover:bg-gray-300`
  : tw.div`h-full flex! flex-col shadow-xl md:mx-2 lg:mx-4  relative focus:outline-none transform bg-white transition duration-500 hover:scale-125 hover:bg-gray-300`;
  return (
    <Container>
      <Content>
        {
          viewTitle ? (
            <HeadingWithControl>
              <Heading>{title}</Heading>
            </HeadingWithControl>
          ) : ""
        }
        
        <CardSlider ref={setSliderRef} {...sliderSettings}>
          {cards.map((card, index) => (
            <Link to={`${pageRoute}/${card.id}`} key={index}>
            <Card key={index} style={{ minHeight:`${isMobile ? "300px" : "420px"}`, minWidth:`${isMobile ? "100%" : "400px"}` }}>
              <Image src={card.imageSrc} />
              <TextInfo>
                <TitleReviewContainer>
                  <Title className="ellipse-paragraph2">{card.title}</Title>
                </TitleReviewContainer>
              </TextInfo>
            </Card>
            </Link>
          ))}
        </CardSlider>
         {
            cards.length > 3 ? (
              <Controls>
                <PrevButton onClick={sliderRef?.slickPrev}><ChevronLeftIcon/></PrevButton>
                <NextButton onClick={sliderRef?.slickNext}><ChevronRightIcon/></NextButton>
              </Controls>
            ) : isMobile && cards.length > 1 ? (<Controls>
              <PrevButton onClick={sliderRef?.slickPrev}><ChevronLeftIcon/></PrevButton>
              <NextButton onClick={sliderRef?.slickNext}><ChevronRightIcon/></NextButton>
            </Controls>) : ""
          } 
      </Content>
    </Container>
  );
};
