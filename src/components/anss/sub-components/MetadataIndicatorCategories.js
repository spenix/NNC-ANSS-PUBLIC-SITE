import {useState, useEffect} from "react";

const IndicatorCategoryList = ({indicatorsTypeDatas}) => {
    const [indicatorCategories, setIndicatorCategories] = useState({});

    useEffect(() => {
       var categories = indicatorsTypeDatas.reduce((a, b) => {
            a[b.category] = [...a[b.category] || [], b];
            return a;
          }, {});
        setIndicatorCategories(categories)
    }, [indicatorsTypeDatas]);
    return ( 
        <>
            {
                Object.keys(indicatorCategories).map((category, index) => {
                    return (
                        <a href="#" className="feature">
                           <span key={category}  style={{ margin:"20px 0 20px 0" }}>
                             {category}
                           </span>
                        </a>
                    )
                })
            }
        </>
       
     );
}
 
export default IndicatorCategoryList;