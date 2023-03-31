import React, { useState, useEffect } from "react";
import http from "../../../utils/utils";
import { Container, ContentWithPaddingXl } from "components/misc/Layouts";

import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro";
import { SectionHeading } from "components/misc/Headings";
import { PrimaryButton } from "components/misc/Buttons";
import IndicatorCategoryList from "./MetadataIndicatorCategories";
const Posts = tw.div`-mt-6 sm:-mr-8 flex flex-wrap`;
const PostHeader = tw.div`h-full p-4 text-gray-300 bg-blue-700 text-lg group-hover:text-gray-500 transition duration-300`;
const PostContainer = styled.div`
  ${tw`mt-6 w-full sm:w-1/2 lg:w-1/3 sm:pr-8`}
  ${props =>
    props.featured &&
    css`
      ${tw`w-full!`}
      ${Post} {
        ${tw`sm:flex-row! h-full sm:pr-4`}
      }
      ${Image} {
        ${tw`sm:h-96 sm:min-h-full sm:w-1/2 lg:w-2/3 sm:rounded-t-none sm:rounded-l-lg`}
      }
      ${Info} {
        ${tw`sm:-mr-4 sm:pl-8 sm:flex-1 sm:rounded-none sm:rounded-r-lg sm:border-t-2 sm:border-l-0`}
      }
      ${Description} {
        ${tw`text-sm mt-3 leading-loose text-gray-600 font-medium`}
      }
    `}
`;
const Post = tw.div`cursor-pointer flex flex-col bg-gray-100 rounded-lg`;
const Image = styled.div`
  ${props => css`background-image: url("${props.imageSrc}");`}
  ${tw`h-64 w-full bg-cover bg-center rounded-t-lg`}
`;
const PlanFeatures = styled.div`
  ${tw`flex flex-col mx-2 px-8 py-8 flex-1 text-sm`}
  .feature {
    ${tw`mt-2 first:mt-0 font-semibold text-gray-500`}
  }
`;
const Info = tw.div`p-8 border-2 border-t-0 rounded-lg rounded-t-none`;
const Category = tw.div`uppercase text-primary-500 text-xs font-bold tracking-widest leading-loose after:content after:block after:border-b-2 after:border-primary-500 after:w-8`;
const CreationDate = tw.div`mt-4 uppercase text-gray-600 italic font-semibold text-xs`;
const Title = tw.div`mt-1 font-black text-xl text-gray-900`;
const Description = tw.div``;

const ButtonContainer = tw.div`flex justify-center`;
const LoadMoreButton = tw(PrimaryButton)`mt-16 mx-auto`;

export default ({
  selectedType
}) => {
  const [repositories, setRepositories] = useState([]); 
  const [visible, setVisible] = useState(6);
  const onLoadMoreClick = () => {
    setVisible(v => v + 6);
  };

  const getRepositories = async () => {
    const { data } = await http.get('indicators/repositories?limit=1000');
    setRepositories(data.data);
  }

  console.log(repositories);
  
  useEffect(() => {
    getRepositories();
  }, [])

  var posts = [];
  for (let index = 0; index < repositories.length; index++) {
    posts.push(
          {
            name: repositories[index].attributes.name,
            category: repositories[index].attributes.category_name,
            code: repositories[index].attributes.code,
            description: repositories[index].attributes.description,
            type_name: repositories[index].attributes.type_name,
            datasources: repositories[index].attributes.datasources,
            featured: false
          }
    );
  }
  let indicators = posts.reduce((a, b) => {
    a[b.type_name] = [...a[b.type_name] || [], b];
    return a;
  }, {});
  // console.log(indicators);
  // console.log(posts);
  return (
        <ContentWithPaddingXl>
          <Posts>
            {Object.keys(indicators).slice(0, visible).map((indicator, index) => (
              <PostContainer key={index} featured={false}>
                <Post className="group" as="a" href={indicator}>
                  <PostHeader> {indicator}</PostHeader>
                  <PlanFeatures>
                    <IndicatorCategoryList indicatorsTypeDatas={indicators[indicator]}/>
                 </PlanFeatures>
                </Post>
              </PostContainer>
            ))}
          </Posts>
          {visible < Object.keys(indicators).length && (
            <ButtonContainer>
              <LoadMoreButton onClick={onLoadMoreClick}>Load More</LoadMoreButton>
            </ButtonContainer>
          )}
        </ContentWithPaddingXl>
  );
};
