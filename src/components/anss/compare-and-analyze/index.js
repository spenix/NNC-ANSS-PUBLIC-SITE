import React, {useState, useEffect} from 'react'
import tw from "twin.macro";
import styled from "styled-components";
import http from "../../../utils/utils";
import compare_and_analyze from "../../../images/dashboard_nav/viber_image_2022-07-20_16-46-56-758.png";
import Tableau from "../tableauComponents/tableau";
const Container = tw.div`relative`;
const Content = tw.div`max-w-screen-xl  mx-auto py-2 lg:py-4`;
const HeaderContainer = tw.div`mb-5 w-full flex flex-col`;
const Description2 = tw.p`mt-2 text-sm md:text-base lg:text-lg font-medium leading-relaxed text-secondary-200 max-w-xl w-full text-left hover:text-gray-600`;
const Heading2 = tw.h2`text-2xl sm:text-3xl text-white font-black tracking-wide`;

const CardReport = tw.div`flex justify-center bg-white -mx-8 border h-144 hover:bg-gray-100 overflow-hidden shadow`;

const BodyContainer = tw.div`mb-5 w-full flex flex-col bg-gray-200 items-center lg:items-stretch  lg:flex-row flex-wrap py-2 px-6 lg:px-8  rounded shadow`;
const Column = styled.div`
${tw`p-2 w-full lg:w-1/4`}
.imageContainer {
    ${tw`text-center flex-shrink-0 relative`}
    img {
      ${tw`w-20 h-20 rounded-full `}
    }
  }
`;
const ColumnRight = tw.div`p-2 w-full lg:w-1/4 items-end rounded`;
const Label = tw.label`w-full`;
const Select = tw.select`w-full h-10 `;
const Option = tw.option`text-lg`;
const Input = tw.input`w-full text-lg h-10`

const HeaderContent = tw.div`mt-2 lg:mt-4 py-2 h-auto min-w-full -mx-8`;
const ContentDiv = tw.div`max-w-screen-xl p-4 sm:p-4 mx-auto`;

function Index(
    { 
        heading = "Analyze Data",
        description = "",
    }) {
        const [indicatorTypes, setIndicatorTypes] = useState([]);
        const [indicatorCategories, setIndicatorCategories] = useState([]);
        const getIndicatorTypes = async () => {
            const { data } = await http.get('indicators/types');
            setIndicatorTypes(data.data);
          }
          const getIndicatorCategories = async () => {
            const { data } = await http.get('indicators/categories');
            setIndicatorCategories(data.data);
          }
          
        useEffect(() => {
            getIndicatorTypes();
            getIndicatorCategories();
        }, [])

        console.log('indicatorTypes', indicatorTypes);
        console.log('indicatorCategories', indicatorCategories);

  return (
    <Container>
        <HeaderContent style={{backgroundColor:"#4da1de"}}>
            <ContentDiv>
                <HeaderContainer>
                    <Heading2>{heading}</Heading2>
                    {description && <Description2>{description}</Description2>}
                </HeaderContainer>
            </ContentDiv>
        </HeaderContent>
        <CardReport>
            <Tableau url={`https://public.tableau.com/views/ANSS-MAP-001/Dashboard1?:language=en-US&publish=yes&:display_count=n&:origin=viz_share_link`} height="100%" width="100%"/>
        </CardReport>
    </Container>
  )
}

export default Index