import React from 'react'

function Placestovisit({trip}) {
  return (
    <div>
      <h1 className="font-bold text-2xl mb-5">place to visit</h1>
  
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {trip?.tripData?.?.map((hotel, index) => (
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${hotel.hotelName+hotel.hotelAddress}`}
            target="_blank"
            rel="noopener noreferrer"
            key={index}
            className="hover:scale-105 transition-transform cursor-pointer"
          >
            <div className="bg-white shadow-lg rounded-xl overflow-hidden">
              <img
                src={hotel.hotelImageUrl}
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
        ))}
      </div>
    </div>
    
  )
}

export default Placestovisit
