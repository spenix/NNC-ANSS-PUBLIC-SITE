import React, {useState, useEffect} from 'react'
import tw from "twin.macro";
import styled from "styled-components";
import country_specific from "../../../images/dashboard_nav/viber_image_2022-07-20_16-46-54-970.png";
import http from "../../../utils/utils";
import Tableau  from "../tableauComponents/tableau";
import DatePicker from "react-datepicker";
import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";
import "../../../styles/custom_datepicker.css";


const Container = tw.div`relative`;
const Content = tw.div`max-w-screen-xl mx-auto py-4 lg:py-6`;



const CardReport = tw.div`flex justify-center border bg-white h-128 hover:bg-gray-100 overflow-hidden rounded-lg shadow hover:shadow-lg`;

const HeaderContainer = tw.div`max-w-screen-xl w-full flex flex-col lg:flex-row flex-wrap mx-auto`;
const HeaderColumnDiv = tw.div`lg:w-2/4 sm:w-full`;
const HeaderColumnRightDiv = tw.div`lg:w-1/4 sm:w-full px-4 md:p-0 lg:p-0 flex justify-end`;
const Description2 = tw.p`mt-2 text-sm md:text-base lg:text-lg font-medium leading-relaxed text-secondary-200 max-w-xl w-full text-left hover:text-gray-600`;
const Heading2 = tw.h2`text-2xl sm:text-3xl text-white mx-2 font-black tracking-wide`;
const ContentTitle = tw.div`w-full bg-gray-100 shadow text-black rounded py-2  mb-4 text-center`;
const NoDataMsg = tw.h1`text-center text-3xl text-black`;

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
const Select = tw.select`w-full h-10 p-2 font-bold mt-3 border border-gray-400 ml-5`;
const Option = tw.option`text-lg`;
const Input = tw.input`w-full text-lg h-10`

const HeaderContent = tw.div`py-4 lg:py-6 sm:py-3 sm:px-4 h-auto min-w-full -mx-8`;
const ContentDiv = tw.div`max-w-screen-xl p-4 sm:p-4 mx-auto`;

function Index(
    { 
        contentCharts = [],
        heading = "Country Specific",
        description = "",
        height= "100%",
        width="100%",
        columnNumber = 3
    }) {
        const [memberStates, setMemberStates] = useState([]);
        const [selectedMemberState, setSelectedMemberState] = useState(2);
        const defaultDate = new Date('2000-1-1');
        const currentDate = new Date();
        const [dateRange, setDateRange] = useState([defaultDate, currentDate]);
        const [startDate, setStartDate] = useState(new Date());
        const ColumnReport = columnNumber >= 3 ? tw.div`mt-10 px-1 h-auto w-full lg:w-1/3` :  tw.div`mt-10 px-1 h-auto w-full lg:w-1/2`;
        const ColumnsDivReport = columnNumber && contentCharts.length ? tw.div`flex flex-col justify-start -mx-8 items-center lg:items-stretch lg:flex-row flex-wrap` : tw.div`flex flex-col justify-center -mx-8 items-center lg:items-stretch lg:flex-row flex-wrap`;

        const MemberState = async () => {
            const {data : {data}} = await http.get(`member-states`);
            setMemberStates(data);
        }

        useEffect(() => {
            MemberState();
        }, [])
        var stateName = memberStates.filter(item => { return item.id ==  selectedMemberState });
        
  return (
    <Container>
        <HeaderContent style={{backgroundColor:"#4da1de"}}>
            <HeaderContainer>
                <HeaderColumnDiv>
                    <Heading2>{heading}</Heading2>
                    {description && <Description2>{description}</Description2>}
                </HeaderColumnDiv>
                <HeaderColumnRightDiv>
                   <DatePicker
                    selected={startDate}
                    onChange={(date) => setStartDate(date)}
                    showYearPicker
                    dateFormat="yyyy"
                    />
                </HeaderColumnRightDiv>
                <HeaderColumnRightDiv>
                <Select placeholder="Select Member State" onChange={(e) => setSelectedMemberState(e.target.value)}>
                            <Option value="" hidden>Select Member State</Option>
                            {
                                memberStates.map(item => {
                                    return (<Option key={item.id} value={item.id} selected={item.id == selectedMemberState}>{item.attributes.name}</Option>)
                                })
                            }
                        </Select>
                </HeaderColumnRightDiv>
            </HeaderContainer>
        </HeaderContent>
        <Content>
            
            <ColumnsDivReport>
                {
                    contentCharts.map((item, index) => {
                        return (
                            <ColumnReport key={index}>
                                <ContentTitle>{item.title}</ContentTitle>
                                <CardReport>
                                    {
                                        item?.url ? ( <Tableau {...item} startDate={moment(startDate).format("Y")} selectedMemberState={stateName.length ? stateName[0]?.attributes?.name : ""}/>) : ""
                                    }
                                   
                                </CardReport>
                            </ColumnReport>
                        )
                    })
                }
                
                {
                    !contentCharts.length ? (
                        <ColumnReport>
                            <NoDataMsg>No indicators available</NoDataMsg>
                        </ColumnReport>
                    ) : ""
                }
                
            </ColumnsDivReport>
        </Content>
    </Container>
  )
}

export default Index;