import { useEffect, useState } from 'react';
import { Button } from '../../../components/ui/button';
import { IoIosSend } from "react-icons/io";
import { GetPlacesDetails } from '@/service/GlobalApi';
import { PHOTO_REF_URL } from '../../../service/GlobalApi';



function InfoSec({ trip }) {
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
          '{NAME}',
          result.data.places[0].photos[3].name
        );
        setPhotoUrl(url);
      } else {
        console.error('Photo not found');
      }
    } catch (error) {
      console.error('Error fetching place photo:', error);
    }
  };

  return (
    <div>
      <img
        src={photoUrl || '/placeholder.png'}
        className="h-[340px] w-full object-cover rounded-xl"
        alt="Place"
      />
      <div className="flex justify-between items-center">
        <div className="my-5 flex flex-col gap-2">
          <h2 className="font-bold text-2xl">
            {trip?.userSelection?.location?.label || 'Unknown Location'}
          </h2>
          <div className="flex gap-5">
            <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md">
              ⌚ {trip?.userSelection?.noofDays || 'N/A'} Day
            </h2>
            <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md">
              💰 {trip?.userSelection?.budget || 'N/A'} Budget
            </h2>
            <h2 className="p-1 px-3 bg-gray-200 rounded-full text-gray-500 text-xs md:text-md">
              🧑‍🤝‍🧑 {trip?.userSelection?.traveler || 'N/A'} Traveler
            </h2>
          </div>
        </div>
        <Button>
          <IoIosSend />
        </Button>
      </div>
    </div>
  );
}

export default InfoSec;
