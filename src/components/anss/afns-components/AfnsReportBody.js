import React, { useState, useEffect } from "react";
// import Slider from "react-slick";
import tw from "twin.macro";
import styled from "styled-components";
import http from "../../../utils/utils";
import { PrimaryButton as PrimaryButtonBase } from "components/misc/Buttons";
import { PrimaryButton } from "components/misc/Buttons";
import SliderCard from "../../cards/AnssCardSlider";
const Container = tw.div`relative`;
const Content = tw.div`max-w-screen-xl mx-auto py-10 lg:py-12`;

const HeadingWithControl = tw.div`flex flex-col items-center sm:items-stretch sm:flex-row justify-end`;
const Heading =  tw.h4`text-2xl sm:text-3xl font-black tracking-wide text-center`;
const Controls = tw.div`flex justify-end mx-1 max-w-full`;


const ThreeColumn = tw.div`flex flex-col items-center lg:items-stretch lg:flex-row flex-wrap`;
const Column = tw.div`mt-5 lg:w-1/4`;
const Card = tw.div`lg:mx-2 xl:mx-4 max-w-sm flex flex-col h-full bg-white hover:bg-gray-300 shadow-lg`;
// const Image = styled.div(props => [
//   `background-image: url("${props.imageSrc}");`,
//   tw`bg-cover object-cover bg-center bg-no-repeat w-full h-80 sm:h-80 lg:h-80 rounded rounded-b-none`
// ]);
const Image = tw.img`object-none object-center object-fill w-auto h-56 sm:h-48 lg:h-80 transition border-2 duration-500 hover:scale-150 hover:bg-gray-300 hover:p-1`
const Details = tw.div`p-4 rounded flex-1 flex flex-col items-center text-center lg:block lg:text-left border-solid border-gray-300`;
const MetaContainer = tw.div`flex items-center`;
const Meta = styled.div`
  ${tw`text-secondary-100 font-medium text-sm flex items-center leading-none mr-6 last:mr-0`}
  svg {
    ${tw`w-4 h-4 mr-1`}
  }
`;
const Title = tw.h5`mt-4 leading-snug font-bold text-lg`;

const Description = tw.p`mt-2 text-sm text-secondary-100`;
const Link = styled(PrimaryButtonBase).attrs({as: "a"})`
  ${tw`inline-block mt-4 text-sm uppercase font-semibold w-full text-center`}
`


const ButtonContainer = tw.div`flex justify-center`;
const LoadMoreButton = tw(PrimaryButton)`mt-16 mx-auto`;

const Description2 = tw.p`mt-2 text-sm md:text-base lg:text-base font-medium leading-relaxed w-full text-left`;
const Heading2 = tw.h2`text-2xl sm:text-4xl text-white font-black tracking-wide`;

const HeaderContent = tw.div`mt-2 lg:mt-4 h-auto min-w-full -mx-8`;
const ContentDiv = tw.div`max-w-screen-xl p-4 sm:p-4 mx-auto`;
const DescriptionContent = tw.div`h-auto min-w-full -mx-8`;

const BodyContainer = tw.div`mb-5 w-full flex flex-col bg-gray-200 items-center lg:items-stretch  lg:flex-row flex-wrap py-2 px-2 lg:px-4  shadow`;
const ColumnLeft = tw.div` w-full md:w-3/4 lg:w-3/4 items-start`;
const ColumnRight = tw.div` w-full md:w-1/4 lg:w-1/4 items-end`;
const Select = tw.select`w-full border-2 border-gray-200 h-10 font-bold mt-3`;
const Option = tw.option`text-lg`;
const Input = tw.input`w-full border-2 px-4 border-gray-200 h-10 font-bold mt-3`;
export default ({ 
  heading = "ASEAN Food and Nutrition Security Reports",
  description = "The ASEAN Food and Nutrition Security Report aims to track progress on nutrition actions and key policy and programme accomplishments across the ASEAN region, and is intended to be updated and published every five years for continued progress tracking. The AFNS report is published in two volumes: volume 1 provides a snapshot of progress on nutrition in all ASEAN Member States while volume 2 presents data-driven food and nutrition security profiles for each of the 10 ASEAN Member States.",
}) => {
  const [afnsReports, setAfnsReports] = useState([]);
  const [visible, setVisible] = useState(6);
  const [featuredList, setFeaturedList] = useState([]);
  const getAllAfnsReportData = async () => {  
    const {data: {data, links}} = await http.get('reports/afns');
    setAfnsReports(data);
  }

  const getFeatures = async () => {
    const { data: {data, links, meta} } = await http.get('cms/pages/contents?content_type_id=2&page_option_id=3');
    setFeaturedList(data.sort((a, b) => { return a?.attributes?.sort_order - b?.attributes?.sort_order }));
  }

  useEffect(() => {
    getAllAfnsReportData()
    getFeatures();
  }, []);


  const onLoadMoreClick = () => {
    setVisible(v => v + 6);
  };

  const textShadow = {
    textShadow: '2px 2px 0 hsl(200 50% 30%)'
  }
  // var volumes = [];
  // for (let index = 0; index < afnsReports.length; index++) {
  //   volumes.push((afnsReports[index]?.attributes?.title).split("-")[1])
  // }

  const searchAFNSReportData = async (search_key) => {
    const {data: {data, links}} = await http.get(`reports/afns/content/search?search_key=${search_key}`);
    setAfnsReports(data);
  }

  return (
    <Container>
      <HeaderContent style={{backgroundColor:"#4da1de"}}>
        <ContentDiv>
          <Heading2>{heading}</Heading2>
        </ContentDiv>
      </HeaderContent>
      <DescriptionContent style={{backgroundColor:"#0c53a1"}}>
        <ContentDiv >
            {description && <Description2 style={{color:"#fefefe"}}>{description}</Description2>}
        </ContentDiv>  
      </DescriptionContent>
      <Content>
        <BodyContainer>
          <ColumnLeft>
          </ColumnLeft>
          <ColumnRight>
            {/* <Select onChange={() => alert('Sorry, no API available yet.')}>
              <Option value={0} hidden>Select volume</Option>
              {
                [...new Set(volumes)].map((item, index) => {
                  return <Option value={item}>{item}</Option>
                })
              }
            </Select> */}
            <Input placeholder="Search AFNS Report" onKeyUp={(e) => {searchAFNSReportData(e.target.value)}}/>
          </ColumnRight>
        </BodyContainer>
        <ThreeColumn>
          {afnsReports.slice(0, visible).map((post, index) => (
            <Column key={index}>
              <Card>
                <Image src={post?.attributes?.thumbnail} />
                <Details>
                  <Title>{post?.attributes?.title}</Title>
                  <Description><b>Year: </b>{post?.attributes?.year}</Description>
                  <Link href={post?.attributes?.file} target="_blank">Download</Link>
                </Details>
              </Card>
            </Column>
          ))}
        </ThreeColumn>
        {
          afnsReports.length > 6 ? 
          (
            <ButtonContainer>
              <LoadMoreButton onClick={onLoadMoreClick}>Load More</LoadMoreButton>
            </ButtonContainer>
          ) : ""
        }
      </Content>
      <SliderCard thumbnailList={featuredList} viewTitle={true} title={"Related Topics"} pageRoute={'/afns-report/topics'}/>
    </Container>
  );
};
