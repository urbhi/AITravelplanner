import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { db } from '../../service/firebaseConfig';
import { toast } from 'sonner';
import InfoSec from './components/InfoSec';
import Hotels from './components/Hotels';
import Placestovisit from './components/Placestovisit';

function Viewtrip() {
    const {tripId}=useParams();
    useEffect(()=>{
        tripId&&GetTripData();
    },[tripId])
    const [trip,setTrip]=useState([]);

    const GetTripData=async()=>{
        const docRef=doc(db,'AITrips',tripId);
        const docSnap =await getDoc(docRef);
        if(docSnap.exists()){
            console.log("Doscument:",docSnap.data());
            setTrip(docSnap.data());
        }
        else{
            console.log("No such document");
            toast('No trip found')
        }
    }
  return (
    <div className='p-10 md:px-20 lg:px-44 xl:px-56'>
    {/* Information section */}
<InfoSec trip={trip}/>
    {/* recommonded Hotels */}
<Hotels trip={trip}/>
    {/* Daily plan */}
<Placestovisit trip={trip} />
    {/* footer */}
    </div>
  )
}

export default Viewtrip
