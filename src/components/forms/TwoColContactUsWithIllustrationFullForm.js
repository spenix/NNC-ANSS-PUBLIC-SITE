import React from "react";
import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro"; //eslint-disable-line
import { SectionHeading, Subheading as SubheadingBase } from "components/misc/Headings.js";
import {AddressMap} from './../anss/embededGoogleMap/google_map'
// import { PrimaryButton as PrimaryButtonBase } from "components/misc/Buttons.js";
import EmailIllustrationSrc from "images/email-illustration.svg";

const Container = tw.div`relative`;
const TwoColumn = tw.div`flex flex-col md:flex-row justify-start max-w-screen-xl mx-auto py-3 md:py-4 `;
const Column = tw.div`w-full max-w-full mx-auto md:max-w-none md:mx-0`;
const RightColumn = tw(Column)`md:w-5/12 mt-2 min-h-full  md:h-auto`;
const TextColumn = styled(Column)(props => [
  tw`md:w-6/12 mt-8 md:mt-0 shadow-lg`,
  props.textOnLeft ? tw`md:mr-3 lg:mr-4 md:order-first` : tw`md:ml-3 lg:ml-4 md:order-last`
]);
const PrimaryButtonBase = tw.button`px-8 py-3 w-2/5 font-bold rounded bg-blue-800 text-gray-100 hocus:bg-blue-600 hocus:text-gray-200 focus:shadow-outline focus:outline-none transition duration-300`;
const Image = styled.div(props => [
  `background-image: url("${props.imageSrc}");`,
  tw`rounded bg-contain bg-no-repeat bg-center h-full`,
]);

const GridDiv = tw.div`grid md:gap-x-2 md:gap-y-2 grid-cols-1`;

const TextContent = tw.div`lg:py-8 md:ml-12 text-center md:text-left`;

const Subheading = tw(SubheadingBase)`text-center md:text-left`;
const Heading = tw(SectionHeading)`mt-4 font-sans['Open Sans'] font-black text-left text-3xl sm:text-3xl lg:text-4xl text-orange-500 text-left md:text-left leading-tight`;
const Description = tw.p`mt-4 text-center md:text-left text-sm md:text-base lg:text-lg font-medium leading-relaxed text-secondary-200`

const Form = tw.form`mt-8 md:mt-10 text-sm flex flex-col max-w-sm mx-auto md:mx-0`
const Input = tw.input`mt-6 first:mt-0 border-b-2 py-3 focus:outline-none font-medium transition duration-300 hocus:border-primary-500`
const Textarea = styled(Input).attrs({as: "textarea"})`
  ${tw`h-24`}
`

const AddressMapDiv = tw.div`w-full shadow-lg my-4`;

const Card = styled.div`
  ${tw`flex flex-col sm:flex-row items-start sm:items-start text-left sm:text-left h-full w-full md:mx-4 px-2 py-4`}
  .imageContainer {
    ${tw`border text-left rounded-full p-5 flex-shrink-0`}
    img {
      ${tw`w-6 h-6`}
    }
  }

  .textContainer {
    ${tw`sm:ml-4 mt-4 sm:mt-2`}
  }
  .title {
    ${tw`mt-2 text-orange-500 tracking-wide font-bold text-2xl leading-none`}
  }
  .description {
    ${tw`mt-1 sm:mt-4 font-medium text-secondary-300 leading-loose`}
  }
`;

const Address = tw.span`leading-relaxed`;
const AddressLine = tw.span`block`;
const Phone = tw.span`text-sm mt-2 block text-gray-700`;
const FoxNumber = tw.span`text-sm mt-0 block text-gray-700`;
const Email = tw.span`text-sm mt-0 block text-gray-700`;

const Description2 = tw.p`mt-2 text-sm md:text-base lg:text-base font-medium leading-relaxed w-full text-left`;
const Heading2 = tw.h2`text-3xl sm:text-4xl text-white font-black tracking-wide`;

const HeaderContent = tw.div`mt-2 lg:mt-4 py-2 h-auto min-w-full -mx-8`;
const ContentDiv = tw.div`max-w-screen-xl p-4 sm:p-4 mx-auto`;
const DescriptionContent = tw.div`py-2 h-auto min-w-full -mx-8`;


const SubmitButton = tw(PrimaryButtonBase)`inline-block mt-8 self-end`

export default ({
  subheading = "",
  heading = <>Contact Us</>,
  description = "Have a general question or comment for our team?",
  submitButtonText = "Send",
  formAction = "#",
  formMethod = "get",
  textOnLeft = true,
}) => {
  // The textOnLeft boolean prop can be used to display either the text on left or right side of the image.
  var cards =[
    {
      title: "The ASEAN Secretariat",
      mapSize: window.screen.width > 800 ? '500' : '100%',
      mapSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3966.1879381513745!2d106.79912569999999!3d-6.238943099999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f16a0e59afdb%3A0x89f08eb1032a8895!2sJl.%20Sisingamangaraja%20No.70%20A%2C%20RT.2%2FRW.1%2C%20Selong%2C%20Kec.%20Kby.%20Baru%2C%20Kota%20Jakarta%20Selatan%2C%20Daerah%20Khusus%20Ibukota%20Jakarta%2012110%2C%20Indonesia!5e0!3m2!1sen!2sph!4v1658043466605!5m2!1sen!2sph",
      description: (
        <>
          <Address>
            
            <AddressLine>70A Jalan Sisingamangaraja Jakarta 12110</AddressLine>
            {/* <AddressLine>Endicott, NY 13760</AddressLine> */}
          </Address>
          <Phone>P: (+6221)7262991, 7243372</Phone>
          <FoxNumber>F: (+6221)7398234, 7243504</FoxNumber>
          <Email>M: public@asean.org</Email>
         
        </>
      )
    },
    {
      title: "National Nutrition Council of the Philippines",
      mapSize: window.screen.width > 800 ? '500' : '100%',
      mapSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3862.2136389172165!2d121.02290931381182!3d14.529768989847614!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397c92f064a8c13%3A0x21771f10cb3eed50!2sChief%20Administrative%20Division%20Office%20-%20National%20Nutrition%20Council!5e0!3m2!1sen!2sus!4v1658041370485!5m2!1sen!2sus",
      description: (
        <>
          <Address>
            <AddressLine>Nutrition Building, 
            2332 Chino Roces Avenue Extension, 
            Taguig City 
            Philippines 1630
            </AddressLine>
            {/* <AddressLine>Dekalb, IL 60115</AddressLine> */}
          </Address>
          <Phone>P: (+632) 8892.4271, 8843.0142</Phone>
          <FoxNumber>F: (632) 8843.5818</FoxNumber>
        </>
      )
    },
  ];
  const textShadow = {
    textShadow: '1px 1px 0 hsl(200 50% 30%)'
  } 
  return (
    <Container>
      <TwoColumn>
        <RightColumn>
          <GridDiv>
          {cards.map((card, i) => (
              <Card key={i}>
               
                <span className="textContainer">
                  <AddressMapDiv>
                      <AddressMap mapSrc={card.mapSrc} mapSize={card.mapSize}/>
                  </AddressMapDiv>
                  <span className="title" >{card.title || "Fully Secure"}</span>
                  <p className="description">
                    {card.description || "Lorem ipsum donor amet siti ceali ut enim ad minim veniam, quis nostrud."}
                  </p>
                </span>
              </Card>
          ))}
          </GridDiv>
            
        </RightColumn>
        <TextColumn textOnLeft={textOnLeft}>
          <TextContent>
            {subheading && <Subheading>{subheading}</Subheading>}
            <Heading>{heading}</Heading>
            {description && <Description>{description}</Description>}
            <Form action={formAction} method={formMethod}>
              <Input type="email" name="email" placeholder="Your Email Address" />
              <Input type="text" name="name" placeholder="Full Name" />
              <Input type="text" name="subject" placeholder="Subject" />
              <Textarea name="message" placeholder="Your Message Here" />
              <SubmitButton type="submit">{submitButtonText}</SubmitButton>
            </Form>
          </TextContent>
        </TextColumn>
      </TwoColumn>
    </Container>
  );
};
