import { useEffect, useState } from 'react';
import { Button } from '../ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
} from "@/components/ui/dialog";
import { googleLogout, useGoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { FcGoogle } from 'react-icons/fc';
import { Link } from 'react-router-dom';

function Header() {
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('user')));
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log(user);
  }, [user]);

  const login = useGoogleLogin({
    onSuccess: (tokenInfo) => {
      console.log('Google Login Successful:', tokenInfo);
      getUserProfile(tokenInfo);
    },
    onError: (error) => {
      console.error('Google Login Error:', error);
    },
  });

  const getUserProfile = (tokenInfo) => {
    setLoading(true);
    axios
      .get(`https://www.googleapis.com/oauth2/v1/userinfo?access_token=${tokenInfo?.access_token}`, {
        headers: {
          Authorization: `Bearer ${tokenInfo?.access_token}`,
          Accept: 'application/json',
        },
      })
      .then((resp) => {
        console.log('User Profile Data:', resp.data);
        localStorage.setItem('user', JSON.stringify(resp.data));
        setUser(resp.data);
        setOpenDialog(false);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching user profile:', error);
        setLoading(false);
      });
  };

  const handleLogout = () => {
    googleLogout();
    localStorage.clear();
    setUser(null);
  };

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '1.5em',
        backgroundColor: '#fff',
        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
      }}
    ><a href="/">
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <img
          src="/logo.svg"
          alt="Logo"
          style={{
            height: '40px',
            width: 'auto',
            marginRight: '10px',
          }}
        />
        
        <span
          style={{
            fontSize: '1.2em',
            fontWeight: 'bold',
            color: '#333',
          }}
        >
          Plan My Trip
        </span>
      </div>
      </a>
      <div>
        {user ? (
          <div className="flex items-center gap-3">

<a href='/create-trip'>
  <Button  variant="outline" className="rounded-full">Create New Trip </Button>
  </a>
            <a href="/my-trips">
              <Button variant="outline" className="rounded-full">My Trip</Button>
            </a>
            <Popover>
              <PopoverTrigger>
                <img src={user.picture} alt="" className="h-[35px] w-[35px] rounded-full" />
              </PopoverTrigger>
              <PopoverContent>
                <h2 className="cursor-pointer" onClick={handleLogout}>Logout</h2>
              </PopoverContent>
            </Popover>
          </div>
        ) : (
          <Button onClick={() => setOpenDialog(true)}>Sign In</Button>
        )}
      </div>
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
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
                disabled={loading}
                onClick={login}
                className="w-full mt-5 flex gap-4 items-center"
              >
                {loading ? "Loading..." : <>
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

export default Header;
