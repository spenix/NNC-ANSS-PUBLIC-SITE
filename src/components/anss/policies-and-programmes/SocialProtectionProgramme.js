import React, {useState, useEffect} from 'react'
import styled from "styled-components";
import tw from "twin.macro";
import http from "../../../utils/utils";
import policies_and_programmes from "../../../images/dashboard_nav/viber_image_2022-07-20_16-46-52-451.png";
import DataTable from './DataTableListSocials';
const Container = tw.div`relative`;
const Content = tw.div`max-w-screen-xl mx-auto py-10 lg:py-12`;
const HeaderContainer = tw.div`mb-5 w-full flex flex-col`;
const Description2 = tw.p`mt-2 text-sm md:text-base lg:text-lg font-medium leading-relaxed text-secondary-200 max-w-xl w-full text-left hover:text-gray-600`;
const Heading2 = tw.h2`text-xl sm:text-2xl text-orange-500 font-black tracking-wide`;

const BodyContainer = tw.div`mb-5 w-full flex flex-col bg-gray-200 items-center lg:items-stretch  lg:flex-row flex-wrap py-2 px-6 lg:px-8  rounded shadow`;
const Column = styled.div`
${tw`w-full lg:w-3/4`}
.imageContainer {
    ${tw`text-center flex-shrink-0 relative`}
    img {
      ${tw`w-16 w-16 rounded-full `}
    }
  }
`;
const ColumnRight = tw.div`w-full lg:w-1/4 items-end rounded`;
const Label = tw.label`w-full`;
const Select = tw.select`w-full h-10 font-bold mt-3`;
const Option = tw.option`text-lg`;

const DataListUl = tw.ul`w-full mt-10 `;
const DataListLi = tw.li`w-full flex flex-col my-1 items-center lg:items-stretch border lg:flex-row flex-wrap py-3 lg:px-8 hover:bg-gray-200  rounded shadow`;
const ListLabel = tw.div`w-1/4 px-10 h-full py-2 text-right`
const ListLabelData = tw.div`w-3/4 px-5 h-full py-2  bg-gray-100`
export default function SocialProtectionProgramme({ 
    heading = "Social Protection Programmes",
    description = "",
    countries = []
}) {
        const [rows, setRows] = useState([]);
        const [organizations, setOrganizations] = useState(0);
        const getAllFilteredData = async () => {
            var params = {};
            if(organizations){
                params['organization_id'] = organizations;
            }
            const {data} = await http.get(`policy/socials/filter-all`, {params});
            setRows(data?.data);
        }

        useEffect(() => {
                    getAllFilteredData();
        }, [
            organizations
        ])

        useEffect(() => {
            getAllFilteredData();
        }, [])
        console.log('rows', rows);
  return (
    <Content>
            <BodyContainer>
                <Column>
                <Heading2>{heading}</Heading2>
                </Column>
                <ColumnRight>
                       <Select placeholder="Select Country" onChange={(e) => setOrganizations(e.target.value)}>
                            <Option value={0}>Select Country</Option>
                            {
                                countries.map(item => {
                                    return (<Option key={item.id} value={item.id}>{item.attributes.name}</Option>)
                                })
                            }
                        </Select>
                </ColumnRight>
            </BodyContainer>
            <DataTable rows={rows}/>
        </Content>
  )
}
