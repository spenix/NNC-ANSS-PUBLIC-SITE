import React from "react";
import tw from "twin.macro";
import { css } from "styled-components/macro"; //eslint-disable-line
import { SectionHeading, Subheading as SubheadingBase } from "components/misc/Headings.js";
import { Container as ContainerBase } from "components/misc/Layouts";
import { SectionDescription } from "components/misc/Typography";
import MapChart from 'components/charts/MapChart';
// import MapChart from 'components/tableauCharts/aseanCountryMap'

var Container = tw(ContainerBase)`my-0 lg:my-0 bg-gray-200 text-gray-100 -mx-8 `;
const ContentWithPaddingXl= tw.div`max-w-full mx-auto`;

const MapsContainer = tw.div` max-w-full relative`;

export default ({mapMarginTop}) => {
  if(typeof mapMarginTop == "boolean"){
    if(mapMarginTop){
       Container = tw(ContainerBase)`bg-gray-200 text-gray-100 -mx-8 `;
    }
  }
  return (
    <Container>
      <ContentWithPaddingXl>
        <MapsContainer>
          <MapChart />
        </MapsContainer>
      </ContentWithPaddingXl>
    </Container>
  );
};
