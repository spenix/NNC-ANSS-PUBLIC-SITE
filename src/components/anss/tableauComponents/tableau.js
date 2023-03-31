import React, {useState, useRef, useEffect} from "react";
import styled from "styled-components";
import tw from "twin.macro";

const Div = tw.div`w-full min-h-full`;

const {tableau} = window;

export default ({url = "", height = "auto", width = "auto", startDate = "", selectedMemberState = ""}) => {
  const ref = useRef(null);
  const [] = useState();

  // const dataRange = () => {
  //   var yrsArr = [];
  //   for (let i = parseInt(startDate); i <= parseInt(endDate); i++) {
  //     yrsArr.push(i.toString());
  //   }
  //   return yrsArr;
  // }

  const initViz = () => { 
    var options = {
      height, 
      width, 
      hideTabs: true
    };
    if(startDate){
      options["Year"] = startDate
    }
    if(selectedMemberState){
      options["Member State"] = selectedMemberState
    }
    var viz = new tableau.Viz(ref.current, url, options);
    console.log("viz", viz);
  }
  useEffect(() => {
    initViz();
  }, [])
  return (
      <>
        <Div ref={ref} style={{ height: height, width:width}}/>
      </>
  );
};
