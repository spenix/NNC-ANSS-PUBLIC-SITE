
import React, {useState, useEffect} from "react";
import MainFeature1 from "./sub-components/MainFeatureComponent";
import http from '../../utils/utils';
import MemberCountryCardGrid from "./sub-components/AseanMembersProfile";
import PopularEvents from "./sub-components/PopularEvents";
export default (()=> {
  const [cards, setCards] = useState([]);
  const [organizations, setOrganizations] = useState([]);
  const getOrganizations = async() => {
    const {data} = await http.get('member-states');
    setOrganizations(data.data);
  }
  const getAboutUsList = async (page = 3) => {
    const { data : {data, links, meta} } = await http.get(`cms/pages/filter?content_type_id=${page}`);
    setCards(data);
  }
  useEffect(() => {
    getAboutUsList();
    getOrganizations();
  }, []);

  const asianCountries = [];
  for (let index = 0; index < organizations.length; index++) {
    const {attributes, id, links, type} = organizations[index];
    if(attributes.name != 'ANSS' && attributes.name != 'ASEAN Secretariat'){
      asianCountries.push(
        {
          id,
          name:attributes.name,
          unsd: attributes.unsd,
          iso_alpha:attributes.iso_alpha,
          is_host:attributes.is_host,
          is_cohost:attributes.is_cohost,
          position:"Member"
        }
      );
    }
   
  }
  const MemberCountries = [];
  for (const countryDetails of asianCountries) {
    MemberCountries.push({
      id: countryDetails.id,
      flagImage: `/CountriesFlag/${countryDetails.iso_alpha}.png`,
      country: countryDetails.name,
      unsd: countryDetails.unsd,
      ISOAlpha: countryDetails.iso_alpha,
      position: countryDetails.position,
      is_host: countryDetails.is_host,
      is_cohost: countryDetails.is_cohost,
    });
  }

  var MemberCountryList = MemberCountries.sort((a, b) => { return (a?.country).localeCompare(b?.country)})
  var newCards = cards.sort((a, b) => { return a?.attributes?.sort_order - b?.attributes?.sort_order })

    return (
        <>
        {
          cards.length ? (
            <PopularEvents cards={newCards} />
          ) : ""
        }
      <MemberCountryCardGrid 
        MemberCountries={MemberCountryList} 
        heading="ASEAN Members"
        description = ""
        />
        </>
    );
});
