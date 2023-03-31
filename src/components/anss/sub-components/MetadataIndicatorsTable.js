import React, { useEffect, useState } from "react";
import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro";
import DataTable from 'react-data-table-component';
import http from "../../../utils/utils";
const Container = tw.div`relative`;
const SubContainer = tw.div`max-w-screen-xl mx-auto py-5 lg:py-10`;
const Content1 = tw.div`flex flex-row mb-1 sm:mb-0 justify-between w-full`;
const Content2 = tw.div`px-6 overflow-x-auto shadow-lg rounded`;
const Content1ToolFormInput =  tw.input`rounded-lg border-transparent flex-1 appearance-none border border-gray-300 w-full py-2 px-4 bg-white text-gray-700 placeholder-gray-400 shadow-sm text-base focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent`;
const MetadataIndicatorsTable = ({memberStates}) => {
        const [indicatorsList, setIndicatorsList] = useState([]);
        const [filterText, setFilterText] = useState('');
        const [resetPaginationToggle, setResetPaginationToggle] = useState(false);

        useEffect(() => {
            setupIndicatorsList(memberStates);
        }, [memberStates]);

        const setupIndicatorsList = async (memberStates) => {
                const { data } = await http.get('indicators/repositories-all');
            setIndicatorsList(data?.data ? data?.data : []);
        }

        const customSort = (rows, selector, direction) => {
            return rows.sort((rowA, rowB) => {
             const aField = selector(rowA)
             const bField = selector(rowB)
             let comparison = 0;
             if (aField > bField) {
              comparison = 1;
             } else if (aField < bField) {
              comparison = -1;
             }
             return direction === 'desc' ? comparison * -1 : comparison;
            });
           };

          
           const filteredItems = indicatorsList.filter(
               item => item?.attributes?.name && item?.attributes?.name.toLowerCase().includes(filterText.toLowerCase()),
           );
       
        //    const subHeaderComponentMemo = React.useMemo(() => {
        //        const handleClear = () => {
        //            if (filterText) {
        //                setResetPaginationToggle(!resetPaginationToggle);
        //                setFilterText('');
        //            }
        //        };
        //        return (

        //             <Content1ToolFormInput type="text"  onKeyUp={e => setFilterText(e.target.value)} id="form-subscribe-Filter" placeholder="Search"/>
        //         //    <FilterComponent onFilter={e => setFilterText(e.target.value)} onClear={handleClear} filterText={filterText} />
        //        );
        //    }, [filterText, resetPaginationToggle]);

        const columns = [
            {
                name: 'CODE',
                sortable: true,
                width:"10%", 
                selector: row => row?.attributes?.code,
            },
            {
                name: 'INDICATOR NAME',
                sortable: true,
                width:"10%",
                selector: row => row?.attributes?.name,
            },
            {
                name: 'DESCRIPTION',
                sortable: true,
                width:"10%",
                selector: row => row?.attributes?.description,
            },
            {
                name: 'INDICATOR TYPE',
                sortable: true,
                width:"10%",
                selector: row => row?.attributes?.type?.name,
            },
            {
                name: 'INDICATOR CATEGORY',
                sortable: true,
                width:"10%",
                selector: row => row?.attributes?.category?.name,
            }
        ];
    
        
    return ( 
        <>
    <Container >
        <SubContainer>
            <Content2>
                    <DataTable  
                    columns={columns}
                    data={filteredItems}
                    sortFunction={customSort} 
                    pagination
                    />
            </Content2>
        </SubContainer>
    </Container>
        </>
     );
}
 
export default MetadataIndicatorsTable;