import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { GetPlacesDetails, PHOTO_REF_URL } from "../service/GlobalApi";
import { deleteDoc, doc } from "firebase/firestore";
import { db } from "../service/firebaseConfig";

function UserTripCard({ trip, tripId, onDelete }) {
  const [photoUrl, setPhotoUrl] = useState();

  useEffect(() => {
    if (trip) {
      GetPlacePhoto();
    }
  }, [trip]);

  const GetPlacePhoto = async () => {
    try {
      const data = {
        textQuery: trip?.userSelection?.location?.label,
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

  const handleDelete = async () => {
    try {
      await deleteDoc(doc(db, "AITrips", tripId)); // Deletes the trip document from Firestore
      onDelete(tripId); // Notify parent component to remove this trip from the state
    } catch (error) {
      console.error("Error deleting trip:", error);
    }
  };

  return (
    <div className="rounded-lg shadow-md overflow-hidden bg-white w-full">
      <Link to={`/view-trip/${tripId}`} className="block">
        {/* Image Section */}
        <div className="h-[200px] w-full bg-gray-200">
          <img
            src={photoUrl || "/placeholder.png"}
            alt={trip?.userSelection?.location?.label}
            className="h-full w-full object-cover"
          />
        </div>
        {/* Text Section */}
        <div className="p-4">
          <h2 className="text-blue-600 font-bold text-lg">
            {trip?.userSelection?.location?.label}
          </h2>
          <p className="text-gray-500 text-sm">
            {trip?.userSelection?.location?.noofDays} Days trip with{" "}
            {trip?.userSelection?.budget} Budget
          </p>
        </div>
      </Link>
      {/* Delete Button */}
      <div className="p-4">
        <button
          onClick={handleDelete}
          className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
        >
          Delete Trip
        </button>
      </div>
    </div>
  );
}

export default UserTripCard;
