'use client';

import { signOutUser } from '@/utils/auth';
import { Avatar, Dropdown, Navbar, DarkThemeToggle, Flowbite } from "flowbite-react";
import { useAuth } from '@/utils/context/authContext';
import { useEffect, useState } from 'react';  


function MyNavbar( {handleMapDarkMode} ) {
    const [imageUrl, setImageUrl] = useState(null);
    
    const { user } = useAuth()

    useEffect(() => { //did this because sometimes the user image to be broken or there's not a user image
      if (!user.photoURL) {
        const defaultImageReplacement = '/defaultProfile.jpeg';
        setImageUrl(defaultImageReplacement);
      }
      else {
        setImageUrl(user.photoURL);
      }
    }, [user.photoURL]);

  return (
        <Navbar>
          <Navbar.Brand href="/">
            <img src="/icon.png" className="mr-6 h-9 sm:h-9 rounded-full" alt="Logo"/>
            <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Little Globe</span>
          </Navbar.Brand>
          <div className="flex md:order-2 z-20">
            <Dropdown
              arrowIcon={false}
              inline
              label={
                <Avatar alt="User Image" img={imageUrl} rounded />
              }
            >
              <Dropdown.Header>
                <span className="block text-sm">{user.displayName}</span>
                <span className="block truncate text-sm font-medium">{user.email}</span>
              </Dropdown.Header>
              <Dropdown.Item>NoWORK</Dropdown.Item>
              <Dropdown.Item>NoWORK</Dropdown.Item>
              <Dropdown.Item>NoWORK</Dropdown.Item>
              <Dropdown.Divider />
              <div onClick={signOutUser}>
                <Dropdown.Item>Sign out</Dropdown.Item>
              </div>
              
            </Dropdown>

            <Flowbite>
                <DarkThemeToggle onClick={() => handleMapDarkMode()}/>
            </Flowbite>

            <Navbar.Toggle />
          </div>
          <Navbar.Collapse>
            <Navbar.Link href="/">Home</Navbar.Link>
            <Navbar.Link href="#">NADADADA</Navbar.Link>
          </Navbar.Collapse>
        </Navbar>
  );
}

export default MyNavbar;
