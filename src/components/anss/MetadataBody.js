import React, { useState, useEffect } from "react";
import tw from "twin.macro";
import http from "../../utils/utils";

import IndicatorsDataTable from "./IndicatorsRegistry/IndicatorsDataTable";
import DataResource from "./indicator-registry/dataResource.js"
const Container = tw.div`relative`;
const Content = tw.div`max-w-screen-xl mx-auto py-2 lg:py-4`;

const HeaderContainer = tw.div`mb-5 w-full flex flex-col`;
const Description2 = tw.p`mt-2 text-sm md:text-base lg:text-lg font-medium leading-relaxed text-secondary-200 w-full text-left hover:text-gray-600`;
const Heading2 = tw.h2`text-2xl sm:text-4xl text-white font-black  tracking-wide`;

const HeadingWithControl = tw.div`flex flex-col items-center sm:items-stretch sm:flex-row justify-end`;


const FilterDiv = tw.div`mb-5 w-full flex flex-col bg-gray-200 justify-end items-center lg:items-stretch  lg:flex-row flex-wrap py-2 px-2 lg:px-4  rounded shadow`;
const Column = tw.div`p-2 w-full lg:w-1/4 rounded`;
const Label = tw.label`w-full`;
const Select = tw.select`w-full font-bold h-10 `
const Option = tw.option`text-lg`;

const HeaderContent = tw.div`mt-2 lg:mt-4 py-2 h-auto min-w-full -mx-8`;
const ContentDiv = tw.div`max-w-screen-xl p-4 sm:p-4 mx-auto`;
const DescriptionContent = tw.div`py-2 h-auto min-w-full -mx-8`;

export default ({ 
  heading = "Indicator Registry",
  description = "The indicator registry provides a list of all indicators for which the ASEAN Nutrition Surveillance System contains data. It consists of the standard codes, definitions and classifications of each indicator.",
}) => {
  const [indicatorTypes, setIndicatorTypes] = useState([]);
  const [indicatorCategories, setIndicatorCategories] = useState([]);
  const [rows, setRows] = useState([]);
  const [indicatorType, setIndicatorType] = useState(0);
  const [indicatorCategory, setIndicatorCategory] = useState(0);
  const getIndicatorTypes = async () => {
    const { data } = await http.get('indicators/types');
    setIndicatorTypes(data.data);
  }
  const getIndicatorCategories = async () => {
    const { data } = await http.get('indicators/categories');
    setIndicatorCategories(data.data);
  }

  const setupRows = async (memberStates) => {
    const { data } = await http.get('indicators/repositories-all');
    setRows(data?.data ? data?.data : []);
  }

  const filterData = async (type, category) => {
     
    var params = {}
      if(type != 0){
        params['type_id'] = type
      }
      if(category != 0){
        params['category_id'] = category
      }
      const  { data } = await http.get('indicators/repositories/filter-site', {params});
      setRows(data?.data ? data?.data : []);
  }

  // useEffect(() => {
  //   setupRows();
  // }, [])

  useEffect(() => {
    getIndicatorTypes();
    getIndicatorCategories();
  },[]);

  useEffect(() => {
    setRows([]);
    // if(indicatorType ?? indicatorCategory){
      filterData(indicatorType, indicatorCategory);
    // }
  }, [indicatorType, indicatorCategory])
  


 
  const indicator_types = [];
  for (let index = 0; index < indicatorTypes.length; index++) {
    const {attributes, id, links, type} = indicatorTypes[index];
    indicator_types.push({id, name:attributes.name});
  }

  const indicator_categories = [];
  for (let index = 0; index < indicatorCategories.length; index++) {
    const {attributes, id, links, type} = indicatorCategories[index];
    indicator_categories.push({id, name:attributes.name});
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
        {/* <HeaderContainer>
            <Heading2>{heading}</Heading2>
            {description && <Description2>{description}</Description2>}
        </HeaderContainer> */}
        <HeadingWithControl>
          <FilterDiv style={{backgroundColor:"#e6eaeb"}}>
            <Column>
              {/* <Label>Indicator Type</Label> */}
              <Select onChange={(e) => setIndicatorType(e.target.value)}>
                <Option value={0}>Select Indicator Type</Option>
                {
                  indicator_types.map(item => {
                    return (<Option value={item.id}>{item.name}</Option>)
                  })
                }
                
              </Select>
            </Column>
            <Column>
              {/* <Label>Indicator Category</Label> */}
              <Select onChange={(e) => setIndicatorCategory(e.target.value)}>
              <Option value={0}>Select Indicator Category</Option>
                {
                  indicator_categories.map(item => {
                    return (<Option value={item.id}>{item.name}</Option>)
                  })
                }
                
              </Select>
            </Column>
          </FilterDiv>
        </HeadingWithControl>
        <IndicatorsDataTable rows={rows} />
      </Content>
      <DataResource />
    </Container>
  );
};
