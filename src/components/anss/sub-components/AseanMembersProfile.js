import React, {useEffect, useState} from "react";
import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro";
import { Container, ContentWithPaddingXl } from "components/misc/Layouts.js";
import { Subheading as SubheadingBase } from "components/misc/Headings";
import {SectionDescription} from "components/misc/Typography";
export const SectionHeading = tw.h4`text-3xl sm:text-4xl font-black tracking-wide text-center`

const HeadingContainer = tw.div``

const Heading = tw(SectionHeading)`text-orange-500`
const Subheading = tw(SubheadingBase)`text-center mb-3`
const Description = tw(SectionDescription)`mx-auto text-center`


const FlagImage = tw.img`object-none object-fill w-56 h-32  sm:h-32  lg:h-32 shadow-xl transition duration-500 hover:scale-150 hover:bg-gray-lightest hover:p-1`

const Cards = tw.div`flex flex-wrap flex-row justify-center w-full sm:max-w-2xl lg:max-w-full mx-auto`
const CardsBetween = tw.div`flex flex-wrap flex-row justify-evenly w-full sm:max-w-2xl lg:max-w-full mx-auto`
const Card = tw.div`mt-8 w-full sm:w-1/2 lg:w-1/5 md:w-1/3 flex flex-col items-center px-6`
const CardImage = styled.div`
  ${props => css`background-image: url("${props.imageSrc}"); object-fit: cover;`}
  ${tw`w-64 h-32 bg-no-repeat bg-contain bg-center shadow-md bg-cover`}
`
const CardContent = styled.div`
  ${tw`flex flex-col items-center mt-6`}
  .position {
    ${tw`uppercase font-bold tracking-widest text-xs text-blue-800`}
  }
  .name {
    ${tw`mt-1 font-medium text-sm text-gray-900`}
  9
`

const CardLinks = styled.div`
  ${tw`mt-6 flex`}
  .link {
    ${tw`mr-8 last:mr-0 text-gray-400 hocus:text-blue-800 transition duration-300`}
    .icon {
      ${tw`fill-current w-6 h-6`}
    }
  }
`
const textShadow = {
  textShadow: '2px 2px 0 hsl(200 50% 30%)'
} 

export default (props) => {
    const {MemberCountries, description, heading} = props;
    var leadMembers = MemberCountries.filter(member => { return member?.is_host || member?.is_cohost  });
    var members = MemberCountries.filter(member => { return !member?.is_host && !member?.is_cohost  });
  return (
    <Container>
      <ContentWithPaddingXl>
        <HeadingContainer>
          {heading && <Heading>{heading}</Heading> }
          {/* {description && <Description>{description}</Description> } */}
        </HeadingContainer>
        <CardsBetween>
          {leadMembers.sort((a, b) => {return b.is_host - a.is_host}).map((country, index) => (
            <Card key={index}>
              <FlagImage src={country.flagImage} />
              <CardContent>
                <span className="position">{country.is_host ? "Host Country" : "Co-lead Country"}</span>
                <span className="name">{country.country}</span>
              </CardContent>
            </Card>
          ))}
        </CardsBetween>
        <Cards>
          {members.map((country, index) => (
            <Card key={index}>
              <FlagImage src={country.flagImage} />
              <CardContent>
                <span className="position">{country.position}</span>
                <span className="name">{country.country}</span>
              </CardContent>
            </Card>
          ))}
        </Cards>
      </ContentWithPaddingXl>
    </Container>
  );
};
