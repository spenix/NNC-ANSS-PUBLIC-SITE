import React, {useState, useRef, useEffect} from "react";
import styled from "styled-components";
import tw from "twin.macro";
import { Container as ContainerBase } from "components/misc/Layouts.js";

const Div = tw.div``;
const Row = tw.div`flex  flex-nowrap lg:flex-row  justify-center items-center h-auto max-w-full sm:px-2`;
const Content2Xl= tw.div`max-w-full mx-auto`;
const Container = tw(ContainerBase)`mt-4 lg:my-2 -mx-8`;
const {tableau} = window;

export default () => {
  const ref = useRef(null);
//   console.log(ref);
  const url = "https://public.tableau.com/views/Book1_16534590396720/Dashboard1";
  const initViz = () => { 
    var viz = new tableau.Viz(ref.current, url);
  }

  useEffect(() => {
    initViz();
  }, [])
  return (
      <>
     
      <Container >
          <Content2Xl>
            <Row>
                <Div ref={ref} style={{height:"850px", width:"1000px"}}/>
            </Row>
          </Content2Xl>
      </Container>
      </>
  );
};
