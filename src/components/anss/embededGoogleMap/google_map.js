import React from 'react';
//  const AddressMap=()=>{
//     return (
//         <div className="google-map-code">
//           <iframe src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d63459.00702253021!2d106.799126!3d-6.238943!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f16a0e59afdb%3A0x89f08eb1032a8895!2sJl.%20Sisingamangaraja%20No.70%20A%2C%20RT.2%2FRW.1%2C%20Selong%2C%20Kec.%20Kby.%20Baru%2C%20Kota%20Jakarta%20Selatan%2C%20Daerah%20Khusus%20Ibukota%20Jakarta%2012110%2C%20Indonesia!5e0!3m2!1sen!2sus!4v1658040948891!5m2!1sen!2sus" width="100%" height="200" frameBorder="0" style={{border:0}} allowFullScreen="true" aria-hidden="false" tabIndex="0"></iframe>
//         </div>
//     );
//  }

 const AddressMap=({
    mapSize = "100%",
    mapSrc = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3862.2136389172165!2d121.02290931381182!3d14.529768989847614!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397c92f064a8c13%3A0x21771f10cb3eed50!2sChief%20Administrative%20Division%20Office%20-%20National%20Nutrition%20Council!5e0!3m2!1sen!2sus!4v1658041370485!5m2!1sen!2sus"
})=>{
    return (
          <iframe src={mapSrc} width={mapSize} height="200" frameBorder="0" style={{border:0}} allowFullScreen="true" aria-hidden="false" tabIndex="0"></iframe>
    );
 }
 export{AddressMap}