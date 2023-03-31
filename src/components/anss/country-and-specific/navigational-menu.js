import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'; 
import Slider from "react-slick";
import tw from "twin.macro";
import styled from "styled-components";
import http from "../../../utils/utils";
const Container = tw.div`relative`;
const Menu = tw.ul`flex flex-wrap -mx-8 mt-2`;
const MenuList = tw.ul`flex-1 flex-row`;
const MenuLink = styled(Link)`
${tw``}
.Inactive {
    ${tw`text-center text-xs uppercase h-16 block font-black border border-solid border-gray-400 shadow py-2 px-2 bg-gray-100 hover:text-blue-800 hover:shadow-lg text-gray-600`}
}
.Active {
  ${tw`text-center text-xs uppercase h-16 block font-black border border-solid border-gray-400 py-2 px-2 bg-gray-300 shadow-lg text-blue-800`}
}
`;
export default function NavigationalMenu({currentActive, setCurrentActive}) {
    const [indicatorCategories, setIndicatorCategories] = useState([]);
    function array_move(arr, old_index, new_index) {
        if (new_index >= arr.length) {
            var k = new_index - arr.length + 1;
            while (k--) {
                arr.push(undefined);
            }
        }
        arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
        return arr;
    };

    const getIndicatorCategories = async () => {
        const { data: {data} } = await http.get('indicators/categories');
        setIndicatorCategories(array_move(data, 5, 4));
      }
      useEffect(() => {
        getIndicatorCategories();
    }, [])
  return (
    <Container>
        <Menu>
            {
                indicatorCategories.map((category, index) =>{
                    return (
                        <MenuList key={index}>
                            <MenuLink  to="#">
                                <span className={currentActive == category?.attributes?.name ? "Active" : "Inactive"} onClick={() => {setCurrentActive(category?.attributes?.name)}}> {category?.attributes?.name}</span>
                            </MenuLink>
                        </MenuList>
                    )
                })
            }
        </Menu>
    </Container>
  )
}
