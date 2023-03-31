import React, {useState, useEffect} from 'react'
import http from "../../../utils/utils";
import tw from "twin.macro";
import styled from "styled-components";
import { sanitize } from 'dompurify';
import { css } from "styled-components/macro";
import { Container, ContentWithPaddingXl } from "components/misc/Layouts.js";
import { Subheading as SubheadingBase } from "components/misc/Headings";
import {SectionDescription} from "components/misc/Typography";
import SliderCard from "../../cards/AnssCardSlider";
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';

export const SectionHeading = tw.h4`w-full text-xl sm:text-3xl font-black tracking-wide text-center mb-4`
const HeadingContainer = tw.div`justify-center my-4`
const Heading = tw(SectionHeading)`text-orange-500 leading-snug transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:text-orange-400 duration-300`
const BannerContainer = tw.div`w-full bg-white shadow-lg py-4`
const DivDesc = tw.div`flex md:mx-10`;
const CardImage = styled.div(props => [
  `background-image: url("${props.imageSrc}");`,
  tw`h-80 sm:h-80 bg-cover mx-10 bg-center`
]);
const Image = tw.img`float-left  md:mr-10 h-56 md:h-80 `
const Description = tw.p`text-sm mx-4 md:mx-10 text-justify`;

function Index({id}) {
  const [banners, setBanners] = useState([]);
  const getBanners = async () => {
    const { data: {data, links, meta} } = await http.get('cms/pages/contents?content_type_id=1&page_option_id=1');
    setBanners(data);
  }
  
  useEffect(() => {
    getBanners();
  }, [id])
  
  var selectedBanners = banners.filter((item) => {
    return item.id == id
  });
  const renderHTML = (escapedHTML) => {
    if(escapedHTML.includes("<ul>")){
      escapedHTML += "<style>ul > li {list-style-type: square;} ul { margin-left: 10%; }</style>" 
    }
    return React.createElement("div", {
      dangerouslySetInnerHTML: { __html: sanitize(escapedHTML) },
    });
  }
  
  
  return (
    <Container>
      <ContentWithPaddingXl>
        {
          selectedBanners.map((item, index) => {
            return (
            <BannerContainer key={index}>
              <HeadingContainer>
                    <Heading>{item?.attributes?.title}</Heading>
              </HeadingContainer>
              <DivDesc>
              <Description><Image src={item?.attributes?.image_url} /> {item?.attributes?.body ? renderHTML(item?.attributes?.body) : renderHTML(item?.attributes?.summary) }</Description>
              </DivDesc>
            </BannerContainer>)
          })
        }
        {
          banners.length ? (<SliderCard title={banners.length > 1 ? "Others" : "Other"} thumbnailList={banners} idNotInclude={id} pageRoute="/dashboard/banner"/>) : ""
        }
      </ContentWithPaddingXl>
    </Container>
  )
}

export default Index