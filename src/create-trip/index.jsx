import { useEffect, useState } from 'react';
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { Input } from "@/components/ui/input";
import { AI_prompt, BudgetOptions, LongTripOptions } from '../constants/option';
import { Button } from '../components/ui/button';
import { toast } from "sonner";
import { chatSession } from '../service/AIModal';
import { FcGoogle } from "react-icons/fc";
import axios from 'axios';
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog";
import { useGoogleLogin } from '@react-oauth/google';
import { doc, setDoc } from 'firebase/firestore';
import { db } from '../service/firebaseConfig';
import { useNavigate } from 'react-router-dom';



function Createtrip() {
  const [place, setPlace] = useState(null);
  const [formData, setFormData] = useState({});
  const [openDialog, setOpenDialog] = useState(false);
const [Loading, setLoading]=useState(false);

const navigate =useNavigate(); 

  const handleInputChange = (name, value) => {
    if (name === 'noOfDays' && value > 7) {
      alert("Please enter a trip duration of 7 days or less.");
      return;
    }
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  useEffect(() => {
    console.log(formData);
  }, [formData]);


  const Login = useGoogleLogin({
    onSuccess: (tokenInfo) => {
      console.log('Google Login Successful:', tokenInfo);
      GetUserProfile(tokenInfo);
    },
    onError: (error) => {
      console.error('Google Login Error:', error);
    },
  });

  const OnGenerateTrip = async () => {
    const user = localStorage.getItem('user');
    if (!user) {
      setOpenDialog(true);
      return;
    }

    if (!formData?.location || !formData?.budget || !formData?.traveler || formData?.noOfDays > 7) {
      toast("Please fill all the required details");
      return;
    }
setLoading(true);
    const FINAL_PROMPT = AI_prompt
      .replace('{location}', formData?.location?.label)
      .replace('{totalDays}', formData?.noOfDays)
      .replace('{traveler}', formData?.traveler)
      .replace('{budget}', formData?.budget);

    

    try {
      const result = await chatSession.sendMessage(FINAL_PROMPT);
      console.log(result?.response?.text());
      setLoading(false);
      SaveAiTrip(result?.response?.text())

    } catch (error) {
      console.error("Error generating trip:", error);
    }
  };



const SaveAiTrip =async(tripData)=>{
  setLoading(true);
  const user =JSON.parse(localStorage.getItem('user'));
  const docId =Date.now().toString()
await setDoc(doc(db, "AITrips", docId), {
  userSelection:formData,
  tripData:JSON.parse(tripData),
  userEmail:user?.email,
  id:docId
});
setLoading(false);
navigate(`/view-trip/${docId}`)
}



  return (
    <div className="sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5 mt-10">
      <h2 className="font-bold text-3xl">Tell us your travel preferences 🏕️ 🏖️</h2>
      <p className="mt-3 text-gray-500 text-xl">
        Just provide some basic information, and our trip planner will generate a customized itinerary based on your preferences.
      </p>

      <div className="mt-20 flex flex-col gap-10">
        <div>
          <h2 className="font-bold text-xl">What is your destination of choice?</h2>
          <GooglePlacesAutocomplete
            apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_key}
            selectProps={{
              place,
              onChange: (v) => { setPlace(v); handleInputChange('location', v); },
            }}
          />
        </div>
        <div>
          <h2 className="font-bold text-xl">How many days are you planning for your trip?</h2>
          <Input
            placeholder="e.g., 3"
            type="number"
            onChange={(e) => handleInputChange('noOfDays', e.target.value)}
          />
        </div>
      </div>

      <div className="mt-10">
        <h2 className="font-bold text-xl">What is your budget?</h2>
        <div className="grid grid-cols-3 gap-5 mt-10">
          {BudgetOptions.map((item, index) => (
            <div
              key={index}
              onClick={() => handleInputChange('budget', item.title)}
              className={`p-4 border cursor-pointer rounded-lg hover:shadow-sm ${formData?.budget === item.title ? 'shadow-lg border-black' : ''}`}
            >
              <h2 className="text-4xl">{item.icon}</h2>
              <h2 className="font-bold text-lg">{item.title}</h2>
              <h2 className="text-sm text-gray-500">{item.desc}</h2>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-10">
        <h2 className="font-bold text-xl">Who do you plan on traveling with on your next adventure?</h2>
        <div className="grid grid-cols-3 gap-5 mt-10">
          {LongTripOptions.map((item, index) => (
            <div
              key={index}
              onClick={() => handleInputChange('traveler', item.people)}
              className={`p-4 border cursor-pointer rounded-lg hover:shadow-sm ${formData?.traveler === item.people ? 'shadow-lg border-black' : ''}`}
            >
              <h2 className="text-4xl">{item.icon}</h2>
              <h2 className="font-bold text-lg">{item.title}</h2>
              <h2 className="text-sm text-gray-500">{item.desc}</h2>
            </div>
          ))}
        </div>
      </div>

      <div className="my-10 flex justify-end">
        <Button 
        disabled={Loading}onClick={OnGenerateTrip}>
          {Loading?<AiOutlineLoading3Quarters className='h-7 w-7 animate-spin' />:'Generate trip'}</Button>
      </div>

      <Dialog open={openDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogDescription>
              <img
                src="/logo.svg"
                alt="Logo"
                style={{ height: '40px', width: 'auto', marginRight: '10px' }}
              />
              <h2 className="font-bold text-lg mt-7">Sign In With Google</h2>
              <p>Sign in to the app with Google authentication securely.</p>
              <Button
              disabled={Loading}
                onClick={Login}
                className="w-full mt-5 flex gap-4 items-center"
              >
                
                {
                  Loading?"test":<>
                <FcGoogle className="h-10 w-10" /> Sign in with Google
                </>}
              </Button>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default Createtrip;
