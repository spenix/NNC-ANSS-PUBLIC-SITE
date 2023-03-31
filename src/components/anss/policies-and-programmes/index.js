import React, {useState, useEffect} from 'react'
import styled from "styled-components";
import tw from "twin.macro";
import http from "../../../utils/utils";
import policies_and_programmes from "../../../images/dashboard_nav/viber_image_2022-07-20_16-46-52-451.png";
import DataTable from './DataTableList';
import SocialProtection from './SocialProtectionProgramme';
const Container = tw.div`relative`;
const Content = tw.div`max-w-screen-xl mx-auto py-4 lg:py-6`;
const HeaderContainer = tw.div`mb-5 w-full flex flex-col`;
const Description2 = tw.p`mt-2 text-sm md:text-base lg:text-lg font-medium leading-relaxed text-secondary-200 max-w-xl w-full text-left hover:text-gray-600`;
const Heading2 = tw.h2`text-2xl sm:text-3xl text-white font-black tracking-wide`;

const BodyContainer = tw.div`mb-5 w-full flex flex-col bg-gray-200 items-center lg:items-stretch  lg:flex-row flex-wrap py-2 px-6 lg:px-8 shadow`;
const Column = styled.div`
${tw`w-full lg:w-1/4`}
.imageContainer {
    ${tw`text-center flex-shrink-0 relative`}
    img {
      ${tw`w-16 w-16 rounded-full `}
    }
  }
`;
const ColumnRight = tw.div`w-full lg:w-1/4 lg:pl-2 md:pl-2 items-end rounded`;
const Label = tw.label`w-full`;
const Select = tw.select`w-full h-10 font-bold mt-3`;
const Option = tw.option`text-lg`;



const HeaderContent = tw.div`mt-2 lg:mt-4 py-4  sm:py-4 h-auto min-w-full -mx-8`;
const ContentDiv = tw.div`max-w-screen-xl p-2 sm:p-4 mx-auto`;
const Heading3 = tw.h2`text-xl sm:text-2xl text-orange-500 font-black tracking-wide`;
function Index(
    { 
        heading = "Policies And Programmes",
        description = "",
    }) {
        const [rows, setRows] = useState([]);
        const [countries, setCountries] = useState([]);
        const [classifications, setClassifications] = useState([]);
        const [environments, setEnvironments] = useState([]);
        const [organizations, setOrganizations] = useState(0);
        const [policyIndicator, setPolicyIndicator] = useState(0);
        const [policyEnvironment, setPolicyEnvironment] = useState(0);
        const getAllConties = async () => {
            const {data} = await http.get(`member-states`);
            setCountries(data?.data);
        }

        const getAllClassifications = async () => {
            const {data} = await http.get(`policy/classifications-all`);
            setClassifications(data?.data);
        }

        const getAllEnvironments = async () => {
            const {data} = await http.get(`policy/environments-all`);
            setEnvironments(data?.data);
        }

        const getAllFilteredData = async () => {
            var params = {};
            if(organizations){
                params['organization_id'] = organizations;
            }
            if(policyIndicator){
                params['type_id'] = policyIndicator;
            }
            if(policyEnvironment){
                params['classification_id'] = policyEnvironment;
            }
            const {data} = await http.get(`policy/programs/filter-all`, {params});
            setRows(data?.data);
        }

        useEffect(() => {
                    getAllFilteredData();
        }, [
            organizations,
            policyIndicator,
            policyEnvironment
        ])

        useEffect(() => {
            getAllClassifications();
            getAllEnvironments();
            getAllConties();
            getAllFilteredData();
        }, [])
  return (
    <Container>
        <HeaderContent style={{backgroundColor:"#4da1de"}}>
            <ContentDiv>
                <Heading2>{heading}</Heading2>
                {description && <Description2>{description}</Description2>}
            </ContentDiv>
        </HeaderContent>
        <Content>
            <BodyContainer>
                <Column>
                    <Heading3>Food and Nutrition Policies & Programmes</Heading3>
                </Column>
                <ColumnRight>
                        {/* <Label>Country</Label> */}
                        <Select placeholder="Select Country" onChange={(e) => setOrganizations(e.target.value)}>
                            <Option value={0}>Select Country</Option>
                            {
                                countries.map(item => {
                                    return (<Option key={item.id} value={item.id}>{item.attributes.name}</Option>)
                                })
                            }
                        </Select>
                </ColumnRight>
                <ColumnRight>
                        {/* <Label>Policy Indicator</Label> */}
                        <Select placeholder="Select Policy Indicator" onChange={(e) => setPolicyIndicator(e.target.value)}>
                            <Option value={0}>Select Policy Indicator</Option>
                            {
                                classifications.map(item => {
                                    return (<Option key={item.id} value={item.id}>{item.attributes.section}</Option>)
                                })
                            }
                        </Select>
                </ColumnRight>
                <ColumnRight>
                        {/* <Label>Policy Environment</Label> */}
                    <Select placeholder="Select Policy Environment" onChange={(e) => setPolicyEnvironment(e.target.value)}>
                            <Option value={0}>Select  Policy Environment</Option>
                            {
                                environments.map(item => {
                                    return (<Option key={item.id} value={item.id}>{item.attributes.indicator}</Option>)
                                })
                            }
                        </Select>
                </ColumnRight>
            </BodyContainer>
            <DataTable rows={rows}/>
        </Content>
        <SocialProtection countries={countries}/>
    </Container>
  )
}

export default Index