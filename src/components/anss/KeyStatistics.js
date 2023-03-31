import React from "react";
import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro"; //eslint-disable-line
import { SectionHeading, Subheading as SubheadingBase } from "components/misc/Headings.js";
import { PrimaryButton as PrimaryButtonBase } from "components/misc/Buttons.js";
import StatsIllustrationSrc from "images/stats-illustration.svg";
import { ReactComponent as SvgDotPattern } from "images/dot-pattern.svg";
import image1 from "../../images/anss/viber_image_2022-05-12_13-36-39-077.jpg"
const Container = tw.div`relative py-5`;
const Content = tw.div`max-w-screen-xl mx-auto py-8 lg:py-10`;
const TwoColumn = tw.div`flex flex-col md:flex-row justify-between bg-gray-100  max-w-full shadow-md`;
const Column = tw.div`w-full max-w-md  mx-auto md:max-w-none md:mx-0`;
const ImageColumn = tw(Column)`md:w-5/12 flex-shrink-0 h-80 shadow-lg md:h-auto relative`;
const TextColumn = styled(Column)(props => [
  tw`md:w-7/12 mt-16 mb-10 sm:mt-8`,
  props.textOnLeft ? tw`md:mr-2 lg:mr-2 md:order-first` : tw`md:ml-2 lg:ml-2 md:order-last`
]);

const Image = styled.div(props => [
  `background-image: url("${props.imageSrc}");`,
  tw`bg-contain bg-no-repeat bg-center h-80 w-full`
]);
const TextContent = tw.div`px-10  lg:py-8 text-center md:text-left`;

const Subheading = tw(SubheadingBase)`text-center md:text-left`;
const Heading = tw(
  SectionHeading
)`mt-4 font-black text-left text-3xl text-orange-500 sm:text-3xl lg:text-3xl text-center md:text-left leading-tight`;
const Description = tw.p`mt-4 text-center md:text-left text-sm md:text-base lg:text-lg font-medium leading-relaxed text-secondary-100`;

const Statistics = tw.div`flex flex-col items-center sm:block text-center md:text-left mt-4`;
const Statistic = tw.div`text-left sm:inline-block sm:mr-12 last:mr-0 mt-4`;
const Value = tw.div`font-bold text-lg sm:text-xl lg:text-2xl text-secondary-500 tracking-wide`;
const Key = tw.div`font-medium text-primary-700`;

const PrimaryButton = tw(PrimaryButtonBase)`mt-4 md:mt-5 text-sm inline-block mx-auto md:mx-0`;

const DecoratorBlob = styled(SvgDotPattern)(props => [
  tw`w-20 h-20 absolute right-0 bottom-0 transform translate-x-1/2 translate-y-1/2 fill-current text-primary-500 -z-10`
]);

export default ({
  heading = (
    <>
      We have been doing this <wbr /> since <span tw="text-primary-500">1999.</span>
    </>
  ),
  description = "Brunei Darussalam has one of the highest rates of GDP per vapid and of Dietary Energy Supply (DES) per person in the region. For decades, food availability has been stable and undernourishment has remained low.",
  primaryButtonText = "Read More",
  primaryButtonUrl = "https://timerse.com",
  imageSrc = image1,
  imageCss = null,
  imageContainerCss = null,
  imageInsideDiv = true,
  textOnLeft = false
}) => {
  const textShadow = {
    textShadow: '2px 2px 0 hsl(200 50% 30%)'
  } 
  return (
    <Container>
      <Content>
      <TwoColumn>
        <ImageColumn css={imageContainerCss}>
          {imageInsideDiv ? <Image imageSrc={imageSrc} css={imageCss} /> : <img src={imageSrc} css={imageCss} alt="" />}
          {/* {imageDecoratorBlob && <DecoratorBlob css={imageDecoratorBlobCss} />} */}
        </ImageColumn>
        <TextColumn textOnLeft={textOnLeft}>
          <TextContent>
            <Heading >{heading}</Heading>
            <Description>{description}</Description>
            <PrimaryButton as="a" href={primaryButtonUrl}>
              {primaryButtonText}
            </PrimaryButton>
          </TextContent>
        </TextColumn>
      </TwoColumn>
      </Content>
    </Container>
  );
};
