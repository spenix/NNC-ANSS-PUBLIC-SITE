import React, {useEffect, useRef} from "react";
import tw from "twin.macro";
const Div = tw.div`w-full`;
const {tableau} = window;

export default () => {
    const ref = useRef(null);
    //   console.log(ref);
      const url = "https://public.tableau.com/shared/T5M9TMDBQ?:display_count=n&:origin=viz_share_link&:showShareOptions=false";
      const initViz = () => { 
        var viz = new tableau.Viz(ref.current, url, {
          width:"100%",
          height:"100vh"
        });
      }
      useEffect(() => {
        initViz();
      }, [])
    return ( 
        <Div ref={ref}/>
     );
}
 
