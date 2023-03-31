import React, { useState, useEffect} from "react";
import { useParams } from "react-router-dom";
import tw from "twin.macro";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";

import NavigationalMenu from "components/anss/country-and-specific/navigational-menu";
import Body from "components/anss/country-and-specific/index";
import Footer from "components/footers/AnssFooter2";
import HeaderBase from "./components/headers/light";
const Header = tw(HeaderBase)`max-w-none`;
export default () => {
  const [currentActive, setCurrentActive] = useState("Anthropometry");
  // const {id} = useParams();
  var dataList = [
    {
      title: "Anthropometry",
      columnNumber: 2,
      charts: [
        {title: "Nutritional status of adolescent", url: 'https://public.tableau.com/views/ANSS-001-D-NODATA/ANSS-001-D?:language=en-US&publish=yes&:display_count=n&:origin=viz_share_link', height: "100%", width: "100%"},
        {title: "Nutritional Status of children under 5", url: 'https://public.tableau.com/views/ANSS-001-D-NODATA/ANSS-001-D?:language=en-US&publish=yes&:display_count=n&:origin=viz_share_link', height: "100%", width: "100%"}, 
        {title: "Undernourishment", url: 'https://public.tableau.com/views/ANSS-001-D-NODATA/ANSS-001-D?:language=en-US&publish=yes&:display_count=n&:origin=viz_share_link', height: "100%", width: "100%"}, 
        {title: "Co-existence of wasting, stunting and overweight in children under 5", url: 'https://public.tableau.com/views/ANSS-001-D-NODATA/ANSS-001-D?:language=en-US&publish=yes&:display_count=n&:origin=viz_share_link', height: "100%", width: "100%"}, 
        {title: "Nutritional status of adults", url: 'https://public.tableau.com/views/ANSS-001-D-NODATA/ANSS-001-D?:language=en-US&publish=yes&:display_count=n&:origin=viz_share_link', height: "100%", width: "100%"}, 
      ]
    },
    {
      title: "Dietary and lifestyle",
      columnNumber: 2,
      charts: [
        {title: "Total dietary energy supply", url: 'https://public.tableau.com/views/ANSS-001-D-NODATA/ANSS-001-D?:language=en-US&publish=yes&:display_count=n&:origin=viz_share_link', height: "100%", width: "100%"},
        {title: "National intake of protective dietary factors", url: 'https://public.tableau.com/views/ANSS-001-D-NODATA/ANSS-001-D?:language=en-US&publish=yes&:display_count=n&:origin=viz_share_link', height: "100%", width: "100%"},
        {title: "Salt intake per day", url: 'https://public.tableau.com/views/ANSS-001-D-NODATA/ANSS-001-D?:language=en-US&publish=yes&:display_count=n&:origin=viz_share_link', height: "100%", width: "100%"},
        {title: "Median Urinary Iodine Concentration", url: 'https://public.tableau.com/views/ANSS-001-D-NODATA/ANSS-001-D?:language=en-US&publish=yes&:display_count=n&:origin=viz_share_link', height: "100%", width: "100%"},
        {title: "Insufficient physical activity adult 18+", url: 'https://public.tableau.com/views/ANSS-001-D-NODATA/ANSS-001-D?:language=en-US&publish=yes&:display_count=n&:origin=viz_share_link', height: "100%", width: "100%"},
        {title: "Fruit & vegetable consumption < 5 total. servings", url: 'https://public.tableau.com/views/ANSS-001-D-NODATA/ANSS-001-D?:language=en-US&publish=yes&:display_count=n&:origin=viz_share_link', height: "100%", width: "100%"},       
        {title: "Consumption of fruits and vegetables", url: 'https://public.tableau.com/views/ANSS-001-D-NODATA/ANSS-001-D?:language=en-US&publish=yes&:display_count=n&:origin=viz_share_link', height: "100%", width: "100%"},       
      ]
    },
    {
      title: "Infant and Young Child Feeding (IYCF)",
      columnNumber: 2,
      charts: [
        {title: "Quality of Breasfeeding practices", url: 'https://public.tableau.com/views/ANSS-001-D-NODATA/ANSS-001-D?:language=en-US&publish=yes&:display_count=n&:origin=viz_share_link', height: "100%", width: "100%"},
        {title: "Quality of child diets", url: 'https://public.tableau.com/views/ANSS-001-D-NODATA/ANSS-001-D?:language=en-US&publish=yes&:display_count=n&:origin=viz_share_link', height: "100%", width: "100%"},
      ]
    },
    {
      title: "Micronutrient and Diseases",
      columnNumber: 2,
      charts: [
        {title: "Age-standardized prevalence of diabetes", url: 'https://public.tableau.com/views/ANSS-001-D-NODATA/ANSS-001-D?:language=en-US&publish=yes&:display_count=n&:origin=viz_share_link', height: "100%", width: "100%"},
      ]
    },
    {
      title: "Others",
      columnNumber: 2,
      charts: [
        {title: "Mortality Rate", url: 'https://public.tableau.com/views/ANSS-001-D-NODATA/ANSS-001-D?:language=en-US&publish=yes&:display_count=n&:origin=viz_share_link', height: "100%", width: "100%"},
        {title: "Population Size", url: 'https://public.tableau.com/views/ANSS-001-D-NODATA/ANSS-001-D?:language=en-US&publish=yes&:display_count=n&:origin=viz_share_link', height: "100%", width: "100%"},
        {title: "Population Growth", url: 'https://public.tableau.com/views/ANSS-001-D-NODATA/ANSS-001-D?:language=en-US&publish=yes&:display_count=n&:origin=viz_share_link', height: "100%", width: "100%"}, 
        {title: "Population Growth", url: 'https://public.tableau.com/views/ANSS-001-D-NODATA/ANSS-001-D?:language=en-US&publish=yes&:display_count=n&:origin=viz_share_link', height: "100%", width: "100%"},
        {title: "Life Expectancy", url: 'https://public.tableau.com/views/ANSS-001-D-NODATA/ANSS-001-D?:language=en-US&publish=yes&:display_count=n&:origin=viz_share_link', height: "100%", width: "100%"},
        {title: "Gender Related Determinants", url: 'https://public.tableau.com/views/ANSS-001-D-NODATA/ANSS-001-D?:language=en-US&publish=yes&:display_count=n&:origin=viz_share_link', height: "100%", width: "100%"},
        {title: "Income inequality", url: 'https://public.tableau.com/views/ANSS-001-D-NODATA/ANSS-001-D?:language=en-US&publish=yes&:display_count=n&:origin=viz_share_link', height: "100%", width: "100%"},
        {title: "Income share", url: 'https://public.tableau.com/views/ANSS-001-D-NODATA/ANSS-001-D?:language=en-US&publish=yes&:display_count=n&:origin=viz_share_link', height: "100%", width: "100%"},
        {title: "Economics and demography", url: 'https://public.tableau.com/views/ANSS-001-D-NODATA/ANSS-001-D?:language=en-US&publish=yes&:display_count=n&:origin=viz_share_link', height: "100%", width: "100%"},
        {title: "Economics and demography", url: 'https://public.tableau.com/views/ANSS-001-D-NODATA/ANSS-001-D?:language=en-US&publish=yes&:display_count=n&:origin=viz_share_link', height: "100%", width: "100%"},
      ]
    },
    {
      title: "Service and food access",
      columnNumber: 2,
      charts: [
        {title: "Food security", url: 'https://public.tableau.com/views/ANSS-001-D-NODATA/ANSS-001-D?:language=en-US&publish=yes&:display_count=n&:origin=viz_share_link', height: "100%", width: "100%"},
        {title: "Economic access to food", url: 'https://public.tableau.com/views/ANSS-001-D-NODATA/ANSS-001-D?:language=en-US&publish=yes&:display_count=n&:origin=viz_share_link', height: "100%", width: "100%"},
        {title: "Antenatal Care", url: 'https://public.tableau.com/views/ANSS-001-D-NODATA/ANSS-001-D?:language=en-US&publish=yes&:display_count=n&:origin=viz_share_link', height: "100%", width: "100%"}, 
        {title: "Water and Sanitation", url: 'https://public.tableau.com/views/ANSS-001-D-NODATA/ANSS-001-D?:language=en-US&publish=yes&:display_count=n&:origin=viz_share_link', height: "100%", width: "100%"}, 
        {title: "Essential services for children", url: 'https://public.tableau.com/views/ANSS-001-D-NODATA/ANSS-001-D?:language=en-US&publish=yes&:display_count=n&:origin=viz_share_link', height: "100%", width: "100%"}, 
        {title: "Essential interventions for other populations", url: 'https://public.tableau.com/views/ANSS-001-D-NODATA/ANSS-001-D?:language=en-US&publish=yes&:display_count=n&:origin=viz_share_link', height: "100%", width: "100%"}, 
      ]
    }
  ]
  var pageContent = dataList.filter(item => { return item.title ==  currentActive});
  return (
    <AnimationRevealPage>
       <Header  />
       <NavigationalMenu currentActive={currentActive} setCurrentActive={setCurrentActive}/>
       {
        pageContent.map((item, index) => {
          return (<Body key={index} contentCharts={item?.charts} heading={item?.title} columnNumber={item?.columnNumber}/>)
        })
       }
       
       <Footer />
    </AnimationRevealPage>
  );
}
