import React, {useEffect, useState} from "react";
import tw from "twin.macro";
import { css } from "styled-components/macro"; //eslint-disable-line
import AnimationRevealPage from "helpers/AnimationRevealPage.js";


import Hero from "components/anss/Homepage";
import MapSection from "components/sections/MapSection.js";
// import KeyStatistics from "components/anss/KeyStatistics";
import NavigationComponent from "components/anss/Dashboard/NavigationComponent";
import Footer from "components/footers/AnssFooter2";
import Loader from "components/pageLoader/loader";

import SliderCard from "components/cards/AnssCardSlider";
import http from "./utils/utils";
import './styles/textCss.css'
// const HighlightedText = tw.span`text-blue-800`
import HeaderBase, { NavLinks, NavLink, PrimaryLink } from "components/headers/light.js";
const Header = tw(HeaderBase)`max-w-none`;
const LoaderDiv = tw.div`flex justify-center items-center h-screen bg-gray-200  mt-4 py-2 lg:my-2 -mx-8`;


export default () => {
  const Subheading = tw.span`tracking-wider text-sm font-medium`;
  const HighlightedText = tw.span`bg-blue-800 text-gray-100 px-4 transform -skew-x-12 inline-block`;



  const imageCss = null;
  const [bannerList, setBannerList] = useState([]);
  const [featuredList, setFeaturedList] = useState([]);
  const [thumbnailList, setThumbnailList] = useState([]);
  const [loading, setLoading] = useState(true);

  const getHomePageFeatures = async () => {
    const { data: {data, links, meta} } = await http.get('cms/pages/contents?content_type_id=1&page_option_id=1');
    // var banner = [];
    // var featured = [];
    // var thumbnail = [];
    // for (let index = 0; index < data.length; index++) {
    //   const {attributes, id} = data[index];
    //   if(attributes?.banner_image){
    //     banner.push(data[index])
    //   }
    //   if(attributes?.featured_image){
    //     featured.push(data[index]);
    //   }
    //   if(attributes?.thumbnail_image){
    //     thumbnail.push(data[index]);
    //   }
      
    // }

    setBannerList(data.sort((a, b) => { return a?.attributes?.sort_order - b?.attributes?.sort_order }));
    // setFeaturedList(featured.sort((a, b) => { return a?.attributes?.featured_sort_order - b?.attributes?.featured_sort_order }));
    // setThumbnailList(thumbnail.sort((a, b) => { return a?.attributes?.thumbnail_sort_order - b?.attributes?.thumbnail_sort_order }));
  }

  const getHomePageThumbnail = async () => {
    const { data: {data, links, meta} } = await http.get('cms/pages/contents?content_type_id=1&page_option_id=2');
    setThumbnailList(data.sort((a, b) => { return a?.attributes?.sort_order - b?.attributes?.sort_order }));
  }
  
  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 750)
  }, [bannerList, featuredList, thumbnailList])
  useEffect(() => {
    getHomePageFeatures()
    getHomePageThumbnail()
  }, [])
  var theRandomNumber = Math.floor(Math.random() * featuredList.length) + 1;


  var newThumbnailList = thumbnailList.filter(item => { return item?.attributes?.content_type_id == 1 })
  return (
    <AnimationRevealPage>
      <Header />
      {
        loading ? 
        (
          <LoaderDiv>
             <Loader loadingType={3}/>
          </LoaderDiv>
          
        ) :
        (
          <>
              {
                bannerList.length ?  (<Hero bannerList={bannerList}/>) : ""
              }
              <NavigationComponent />
              {
                newThumbnailList.length ? (
                  <SliderCard thumbnailList={newThumbnailList} />
                ) : ""
              }
              <MapSection/>
              <Footer />
          </>
        )
      }

     
    </AnimationRevealPage>
  );
}
