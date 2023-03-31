import React, {useEffect, useState} from 'react'
import tw from "twin.macro";
import styled from "styled-components";
import http from "../../../utils/utils";
import DataTable from "./DataTableList";
import DatePicker from "react-datepicker";
import moment from "moment";
import "react-datepicker/dist/react-datepicker.css";
import "../../../styles/custom_datepicker.css";


const Container = tw.div`relative`;
const Content = tw.div`max-w-screen-xl mx-auto py-10 lg:py-12`;

const HeaderContainer = tw.div`mb-5 w-full flex flex-col`;
const Description2 = tw.p`mt-2 text-sm md:text-base lg:text-lg font-medium leading-relaxed text-secondary-200 max-w-xl w-full text-left hover:text-gray-600`;
const Heading2 = tw.h2`text-2xl sm:text-3xl text-orange-500 font-black tracking-wide`;
const ContentHeading = tw.h2`text-lg sm:text-2xl lg:text-3xl pl-2 font-black tracking-wide`;
const BodyContainer = tw.div`mb-5 w-full flex flex-col bg-gray-200 items-center lg:items-stretch  lg:flex-row flex-wrap py-2 lg:py-4 shadow`;
const Column = styled.div`
${tw`w-full lg:w-1/4`}
.imageContainer {
    ${tw`text-center md:p-2 lg:p-2 flex-shrink-0 relative`}
    img {
      ${tw`w-32 h-20 `}
    }
  }
`;
const ColumnRight = tw.div`px-2  w-full lg:w-1/4 flex justify-end`;
const Select = tw.select`w-full h-10 p-2 font-bold mt-3`;
const Option = tw.option`text-lg`;
const Input = tw.input`w-3/4 h-10 p-2 font-bold mt-3`;
function Index(
    { 
        datatype = "", 
        id = 0,
        heading = "Data Source",
        description = "",
    }) {
        const [startDate, setStartDate] = useState(new Date());
        const [rows, setRows] = useState([]);
        const [dataSelection, setDataSelection] = useState([]);
        const [dataSelected, setDataSelected] = useState(id);
        const InternationalDataSource = async () => {
            const {data} = await http.get(`indicators/datacustodians-all-intl?intl_flag=${true}`);
            setDataSelection(data?.data);
        }

        const NationalDataSource = async () => {
            const {data} = await http.get(`member-states`);
            setDataSelection(data?.data);
        }

        var getAllFilteredData = async () => {
            var params = {}
            if(dataSelected){
                params[`${datatype == 'national' ? 'party_id' : 'custodian_id'}`] = dataSelected
            }
            if(moment(startDate).format("Y")){
                params[`year`] = moment(startDate).format("Y")
            }
            var url = datatype == 'national' ? 'indicators/datasources/filter-state' : 'indicators/datasources/filter-custodian-intl';
            const {data} = await http.get(url, {params});
            setRows(data?.data);
        }
        useEffect(() => {
            setRows([]);
            getAllFilteredData();
        }, [dataSelected, startDate])
        useEffect(() => {
            setRows([]);
            if(datatype == 'national'){
                NationalDataSource();
            }
            if(datatype == 'international'){
                InternationalDataSource();
            }
            getAllFilteredData();
        }, [datatype])

        var dataDetail = dataSelection.filter(item => {
            return item.id == dataSelected
        })
        const setDatePicker = () => {
            return (
                <>
                <DatePicker
                  selected={startDate}
                  onChange={(date) => setStartDate(date)}
                  showYearPicker
                  dateFormat="yyyy"
                />
                </>
                
              );
        }
        console.log(dataDetail);
  return (
    <Container>
        <Content>
            <HeaderContainer>
                <Heading2>{heading}</Heading2>
                {description && <Description2>{description}</Description2>}
            </HeaderContainer>
            <BodyContainer>
                <Column>
                {
                    dataDetail.length ? (
                    // <span className="imageContainer">
                    //     <img src={datatype == 'national' ? `https://countryflagsapi.com/svg/${dataDetail[0]?.attributes?.iso_alpha}`: dataDetail[0]?.attributes?.thumbnail} alt={`${datatype == 'national' ? "National" : "International"} Data Source`}/>
                    // </span>
                    <ContentHeading>{dataDetail[0]?.attributes?.name}</ContentHeading>
                    ) : ""
                }
                    
                </Column>
                <ColumnRight>
                        
                </ColumnRight>
                <ColumnRight>
                        {
                            setDatePicker()
                        }
                </ColumnRight>
                <ColumnRight>
                    <Select placeholder={`Select ${datatype == 'national' ? "Member State" : "International Custodian"}`} onChange={(e) => setDataSelected(e.target.value)}>
                            <Option value={0}>Select  {datatype == 'national' ? "Member State" : "International Custodian"}</Option>
                            {
                                dataSelection.map(item => {
                                    return (<Option key={item.id} value={item.id} selected={item.id == dataSelected}>{item.attributes.name}</Option>)
                                })
                            }
                        </Select>
                </ColumnRight>
            </BodyContainer>
            <DataTable rows={rows}/>
        </Content>
    </Container>
  )
}

export default Index