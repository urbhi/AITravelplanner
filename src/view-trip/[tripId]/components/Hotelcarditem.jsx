import { useEffect, useState } from 'react';
import { GetPlacesDetails } from '@/service/GlobalApi';
import { PHOTO_REF_URL } from '../../../service/GlobalApi';
function Hotelcarditem({hotel, index}) {
 const [photoUrl, setPhotoUrl] = useState();

  useEffect(() => {
    if (hotel) {
      GetPlacePhoto();
    }
  }, [hotel]);

  const GetPlacePhoto = async () => {
    try {
      const data = {
        textQuery: hotel.hotelName
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
    <a
            href={`https://www.google.com/maps/search/?api=1&query=${hotel.hotelName+hotel.hotelAddress}`}
            target="_blank"
            rel="noopener noreferrer"
            key={index}
            className="hover:scale-105 transition-transform cursor-pointer"
          >
            <div className="bg-white shadow-lg rounded-xl overflow-hidden">
              <img
                src={photoUrl || '/placeholder.png'}
                alt="Hotel Thumbnail"
                className="w-full h-[180px] object-cover"
              />
              <div className="p-4 flex flex-col gap-2">
                <h2 className="font-medium text-lg">{hotel.hotelName}</h2>
                <h2 className="text-sm text-gray-500">{hotel.hotelAddress}</h2>
                <h2 className="text-sm">
                  <span className="font-semibold">💰</span> {hotel.price} per night
                </h2>
                <h2 className="text-sm">
                  <span className="font-semibold">⭐</span> {hotel.rating} stars
                </h2>
              </div>
            </div>
          </a>
  )
}

export default Hotelcarditem
