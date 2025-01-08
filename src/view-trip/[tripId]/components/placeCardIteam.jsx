import React, { useEffect, useState } from "react";
import { Button } from "../../../components/ui/button";
import { FaMapLocationDot } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { GetPlacesDetails, PHOTO_REF_URL } from "../../../service/GlobalApi"; // Adjust import path as needed

function PlaceCardItem({ place }) {
  const [photoUrl, setPhotoUrl] = useState("");

  useEffect(() => {
    if (place) {
      GetPlacePhoto();
    }
  }, [place]);

  const GetPlacePhoto = async () => {
    try {
      const data = {
        textQuery: place.placeName,
      };
      const result = await GetPlacesDetails(data);
      if (result.data?.places?.[0]?.photos?.[3]?.name) {
        const url = PHOTO_REF_URL.replace(
          "{NAME}",
          result.data.places[0].photos[3].name
        );
        setPhotoUrl(url);
      } else {
        console.error("Photo not found");
      }
    } catch (error) {
      console.error("Error fetching place photo:", error);
    }
  };

  return (
    <div className="border p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow">
      <img
        src={photoUrl || "https://via.placeholder.com/300x180"}
        alt={place.placeName}
        className="w-full h-48 object-cover rounded-md mb-3"
      />
      <h4 className="font-semibold text-lg">{place.placeName}</h4>
      <p className="text-gray-500 text-sm mb-2">{place.placeDetail}</p>
      <p className="text-gray-700 text-sm mb-1">
        <strong>Rating:</strong> {place.rating}
      </p>
      <p className="text-gray-700 text-sm mb-1">
        <strong>Tickets:</strong> {place.ticketsPricing}
      </p>
      <p className="text-gray-700 text-sm">
        <strong>Travel Time:</strong> {place.travelTime}
      </p>
      <Link
        to={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
          place.placeName
        )}`}
        target="_blank"
        rel="noopener noreferrer"
      >
        <Button>
          <FaMapLocationDot />
        </Button>
      </Link>
    </div>
  );
}

export default PlaceCardItem;
