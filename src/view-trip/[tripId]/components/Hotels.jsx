import React, { useEffect, useState } from "react";
import { GetPlacesDetails } from "../../../service/GlobalApi";
import Hotelcarditem from "./Hotelcarditem";

function Hotels({ trip }) {
  
  return (
    <div className="px-10 py-5">
      <h1 className="font-bold text-2xl mb-5">Hotel Recommendation</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {trip?.tripData?.hotels?.map((hotel, index) => (
          
          <Hotelcarditem key={index} hotel={hotel} index={index}/>
        ))}
      </div>
    </div>
  );
}

export default Hotels;
