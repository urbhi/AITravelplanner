import React from "react";
import PlaceCardItem from "./placeCardIteam";


function Placestovisit({ trip }) {
  if (!trip || !trip.tripData || !trip.tripData.itinerary) {
    return <p className="text-red-500">No trip data available.</p>;
  }

  return (
    <div>
      <h2 className="font-bold text-lg">Places to Visit</h2>
      <div>
        {Object.keys(trip.tripData.itinerary).map((dayKey, index) => {
          const day = trip.tripData.itinerary[dayKey];
          return (
            <div key={index} className="mb-8">
              <h3 className="font-bold text-md">{`Day ${index + 1}: ${day.theme}`}</h3>
              <p className="text-gray-600 mb-4">{`Best Time to Visit: ${day.bestTimeToVisit}`}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {day.places.map((place, placeIndex) => (
                  <PlaceCardItem key={placeIndex} place={place} />
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Placestovisit;
