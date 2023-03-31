import React, { useState, useEffect } from "react";
import 'react-notifications/lib/notifications.css';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import tw from "twin.macro";
import styled from "styled-components";
import { sanitize } from 'dompurify';
import { css } from "styled-components/macro"; //eslint-disable-line
import http from "../../../utils/utils";
import { SectionHeading, Subheading as SubheadingBase } from "components/misc/Headings.js";
// import {AddressMap} from './../anss/embededGoogleMap/google_map'
import {AddressMap} from '../embededGoogleMap/google_map'
// import { PrimaryButton as PrimaryButtonBase } from "components/misc/Buttons.js";
const Container = tw.div`relative`;
const TwoColumn = tw.div`flex flex-col md:flex-row justify-start max-w-screen-xl mx-auto py-3 md:py-4 `;
const Column = tw.div`w-full max-w-full mx-auto md:max-w-none md:mx-0`;
const RightColumn = tw(Column)`md:w-5/12 mt-2 min-h-full  md:h-auto`;
const TextColumn = styled(Column)(props => [
  tw`md:w-6/12 mt-8 md:mt-0 border py-6 rounded shadow-lg`,
  props.textOnLeft ? tw`md:mr-3 lg:mr-4 md:order-first` : tw`md:ml-3 lg:ml-4 md:order-last`
]);
const PrimaryButtonBase = tw.button`px-8 py-3 w-2/5 font-bold rounded bg-blue-800 text-gray-100 hocus:bg-blue-600 hocus:text-gray-200 focus:shadow-outline focus:outline-none transition duration-300`;
const Image = styled.div(props => [
  `background-image: url("${props.imageSrc}");`,
  tw`rounded bg-contain bg-no-repeat bg-center h-full`,
]);

const GridDiv = tw.div`grid md:gap-x-2 md:gap-y-2 grid-cols-1`;

const TextContent = tw.div`lg:py-8 px-4 md:ml-12 text-center md:text-left`;

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
  ${tw`flex flex-col sm:flex-row items-start sm:items-start text-left sm:text-left h-full w-full md:mx-4 px-2`}
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
    ${tw`mt-2 text-orange-500 tracking-wide font-bold text-xl md:text-2xl lg:text-2xl leading-none`}
  }
  .description {
    ${tw`mt-1 sm:mt-4 font-normal text-secondary-300 leading-loose`}
  }
`;

const Address = tw.span`leading-relaxed`;
const AddressLine = tw.span`block`;
const Phone = tw.span`text-sm mt-2 block text-gray-700`;
const FoxNumber = tw.span`text-sm mt-0 block text-gray-700`;
const Email = tw.span`text-sm mt-0 block text-gray-700`;

const Description2 = tw.p`mt-2 text-sm md:text-base lg:text-base font-medium leading-relaxed w-full text-left`;
const Heading2 = tw.h2`text-2xl sm:text-4xl text-white font-black tracking-wide`;


const HeaderContent = tw.div`mt-2 lg:mt-4 py-2 h-auto min-w-full -mx-8`;
const ContentDiv = tw.div`max-w-screen-xl p-4 sm:p-4 mx-auto`;
const DescriptionContent = tw.div`py-2 h-auto min-w-full -mx-8`;

const SubmitButton = tw(PrimaryButtonBase)`inline-block mt-8 self-end`

const renderHTML = (escapedHTML) => {
  if(escapedHTML.includes("<ul>")){
    escapedHTML += "<style>ul > li {list-style-type: square;} ul { margin-left: 10%; }</style>" 
  }
 return React.createElement("div", {
  dangerouslySetInnerHTML: { __html: sanitize(escapedHTML) },
}); 
}



export default ({
  subheading = "",
  heading = <>Contact Us</>,
  description = "Have a general question or comment for our team?",
  submitButtonText = "Send",
  formAction = "#",
  formMethod = "get",
  textOnLeft = true,
}) => {
  const [loading, setLoading] = useState(false);
  const [featuredList, setFeaturedList] = useState([]);
  const getFeatures = async () => {
    const { data: {data, links, meta} } = await http.get('cms/pages/contents?content_type_id=4&page_option_id=6');
    if(data.length){
      setFeaturedList(data.sort((a, b) => { return a?.attributes?.sort_order - b?.attributes?.sort_order }));
    }
  }
  useEffect(() => {
    getFeatures();
  }, []);

  var cards =[];
  for (let index = 0; index < featuredList.length; index++) {
    console.log(featuredList[index]);
    console.log(
     
    );
    cards.push({
      title: featuredList[index]?.attributes?.title,
      mapSize: window.screen.width > 800 ? '500' : '100%',
      mapSrc: `https://www.google.com/maps?q=${featuredList[index]?.attributes?.summary}&output=embed`,
      description: (
              <>
                <Address>
                  
                  <AddressLine>{featuredList[index]?.attributes?.summary}</AddressLine>
                  {/* <AddressLine>Endicott, NY 13760</AddressLine> */}
                </Address>
                {renderHTML(featuredList[index]?.attributes?.body)}
               
              </>
            )
    });
  }

  const textShadow = {
    textShadow: '1px 1px 0 hsl(200 50% 30%)'
  } 
  const submitForm = (e) => {
    e.preventDefault();
    setLoading(true);
    var params = {
        "data": {
            "type": "inquiries",
            "attributes": {
                "email": document.getElementById("email").value,
                "fullname": document.getElementById("name").value,
                "subject": document.getElementById("subject").value,
                "message": document.getElementById("message").value                        
            }
        }
    }

    http.post("contact-us/inquire", params).then(({data}) => {
      setLoading(false);
      document.getElementById("email").value = '';
      document.getElementById("name").value = '';
      document.getElementById("subject").value = '';
      document.getElementById("message").value = '';
      NotificationManager.success('Your inquiry has been sent to us,', 'Inquiry sent successfully');
    }).catch(e => {
      const {message} = e
      setLoading(false);
    })
  }
  return (
    <Container>
        <HeaderContent style={{backgroundColor:"#4da1de"}}>
        <ContentDiv>
          <Heading2>{heading}</Heading2>
        </ContentDiv>
      </HeaderContent>
      {/* <DescriptionContent style={{backgroundColor:"#0c53a1"}}>
        <ContentDiv >
            {description && <Description2 style={{color:"#fefefe"}}>{description}</Description2>}
        </ContentDiv>  
      </DescriptionContent> */}
      <TwoColumn>
      <NotificationContainer/>
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
            {/* {subheading && <Subheading>{subheading}</Subheading>}
            <Heading>{heading}</Heading> */}
            {description && <Description>{description}</Description>}
            <Form onSubmit={(e) => submitForm(e)}>
              <Input type="email" name="email"  id="email" placeholder="Your Email Address" required />
              <Input type="text" name="name" id="name" placeholder="Full Name" required />
              <Input type="text" name="subject" id="subject" placeholder="Subject" />
              <Textarea name="message" id="message" placeholder="Your Message Here" />
              <SubmitButton type="submit" disabled={loading}>{submitButtonText}</SubmitButton>
            </Form>
          </TextContent>
        </TextColumn>
      </TwoColumn>
    </Container>
  );
};
