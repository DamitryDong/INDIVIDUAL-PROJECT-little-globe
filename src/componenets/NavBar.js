'use client';

import { signOutUser } from '@/utils/auth';
import { Avatar, Dropdown, Navbar, DarkThemeToggle, Flowbite } from "flowbite-react";
import { useAuth } from '@/utils/context/authContext';
import { useEffect, useState } from 'react';  
import { useTheme } from '@/utils/context/ThemeContext';


function MyNavbar() {
    const [imageUrl, setImageUrl] = useState(null);
    
    const { toggleTheme } = useTheme();
    
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
            <img src="/icon.png" className="mr-6 h-9 sm:h-9 rounded-full z-10" alt="Logo"/>
            <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white z-10">Little Globe</span>
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
                <span className="block text-sm">{user.email}</span>
              </Dropdown.Header>
              <Dropdown.Item><strong>Profile</strong></Dropdown.Item>
              <Dropdown.Divider />
              <div onClick={signOutUser}>
                <Dropdown.Item><strong>Sign out</strong></Dropdown.Item>
              </div>
              
            </Dropdown>

            <Flowbite>
                <DarkThemeToggle onClick={toggleTheme}/>
            </Flowbite>

            <Navbar.Toggle />
          </div>

          <div className='z-10'>
          <Navbar.Collapse>
            <Navbar.Link href="/"><strong>Home</strong></Navbar.Link>
            <Navbar.Link href="#"><strong>something</strong></Navbar.Link>
          </Navbar.Collapse>
          </div>
        </Navbar>
  );
}

export default MyNavbar;
