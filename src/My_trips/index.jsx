import { collection, getDocs, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../service/firebaseConfig";
import { useNavigate } from "react-router-dom";
import UserTripCard from "./UserTripCard";

function MYTrips() {
  const navigation = useNavigate();
  const [userTrips, setUserTrips] = useState([]);

  useEffect(() => {
    GetUserTrips();
  }, []);

  const GetUserTrips = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      navigation("/");
      return;
    }
    setUserTrips([]);
    const q = query(
      collection(db, "AITrips"),
      where("userEmail", "==", user?.email)
    );
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      setUserTrips((preVal) => [...preVal, { ...doc.data(), tripId: doc.id }]);
    });
  };

  const handleDeleteTrip = (deletedTripId) => {
    // Remove the trip from the local state
    setUserTrips((prevTrips) =>
      prevTrips.filter((trip) => trip.tripId !== deletedTripId)
    );
  };

  return (
    <div className="sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5 mt-10">
      <h2 className="font-bold text-3xl mb-8">My Trips</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {userTrips.map((trip, index) => (
          <UserTripCard
            key={index}
            trip={trip}
            tripId={trip.tripId}
            onDelete={handleDeleteTrip} // Pass the delete handler as a prop
          />
        ))}
      </div>
    </div>
  );
}

export default MYTrips;
