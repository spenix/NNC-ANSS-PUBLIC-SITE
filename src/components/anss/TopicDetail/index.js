import React, {useState, useEffect} from 'react'
import http from "../../../utils/utils";
import { sanitize } from 'dompurify';
import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro";
import he from "he";
import { Container, ContentWithPaddingXl } from "components/misc/Layouts.js";
import { Subheading as SubheadingBase } from "components/misc/Headings";
import {SectionDescription} from "components/misc/Typography";
import SliderCard from "../../cards/AnssCardSlider";
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
export const SectionHeading = tw.h4`w-full text-xl sm:text-3xl font-black tracking-wide ml-10 text-center mb-4`
const HeadingContainer = tw.div`items-center my-4`
const Heading = tw(SectionHeading)`text-orange-500 leading-snug transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:text-orange-400 duration-300`
const TopicContainer = tw.div`w-full bg-white shadow-lg rounded-lg py-4`
// const CardImage = styled.div(props => [
//   `background-image: url("${props.imageSrc}");`,
//   tw`w-1/2 h-80 sm:h-80 bg-cover mx-10 bg-center rounded-lg sm:rounded-t-lg`
// ]);
const ImageContainer = tw.div`w-3/4 mx-10 `
const DivDesc = tw.div`flex md:mx-10`;
const Image = tw.img`float-left  md:mr-10 h-80 sm:h-80 `
const Description = tw.p`text-sm md:mx-10 text-justify`;

function Index({id}) {
  const [topics, setTopics] = useState([]);
  const getTopics = async () => {
    const { data: {data, links, meta} } = await http.get('cms/pages/contents?content_type_id=2&page_option_id=3');
    setTopics(data);
  }
  useEffect(() => {
    getTopics();
  }, [id])
  
  var selectedTopics = topics.filter((item) => {
    return item.id == id
  });

  const renderHTML = (escapedHTML) => {
    if(escapedHTML.includes("<ul>")){
      escapedHTML += "<style>ul > li {list-style-type: square;} ul { margin-left: 10%; }</style>" 
    }
    return React.createElement("section", {
        dangerouslySetInnerHTML: { __html: sanitize(escapedHTML) },
      });
  }
      
  return (
    <Container>
      <ContentWithPaddingXl>
        {
          selectedTopics.map((item, index) => {
            return (
            <TopicContainer key={index}>
              <HeadingContainer>
                    <Heading>{item?.attributes?.title}</Heading>
                    {/* <ImageContainer>
                        <Image src={item?.attributes?.image_url ?? item?.attributes?.video_url} />
                    </ImageContainer>
                    */}
              </HeadingContainer>
              {/* <Description>{ he.decode(item?.attributes?.body ? ReactHtmlParser(item?.attributes?.body) : ReactHtmlParser(item?.attributes?.summary)) }</Description> */}
              <DivDesc>
                <Description>
                  <Image src={item?.attributes?.image_url ?? item?.attributes?.video_url} />
                  { 
                  (item?.attributes?.body ? renderHTML(item?.attributes?.body) : renderHTML(item?.attributes?.summary)) 
                  }
                </Description>
              </DivDesc>
              
            </TopicContainer>)
          })
        }
        {
          topics.length ? (<SliderCard title={`Other ${topics.length > 1 ? "Topics" : "Topic"}`} thumbnailList={topics} idNotInclude={id} pageRoute={'/afns-report/topics'}/>) : ""
        }
        
      </ContentWithPaddingXl>
    </Container>
  )
}

export default Index