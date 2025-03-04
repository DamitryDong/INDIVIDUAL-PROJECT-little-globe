'use client';

import { signOutUser } from '@/utils/auth';
import { Avatar, Dropdown, Navbar, DarkThemeToggle, Flowbite } from "flowbite-react";
import { useAuth } from '@/utils/context/authContext';
import { useEffect, useState } from 'react';  
import { useTheme } from '@/utils/context/ThemeContext';

function MyNavbar() {
  const [imageUrl, setImageUrl] = useState(null);
  const { toggleTheme, darkTheme } = useTheme(); // Hook to get toggle function and also get the darktheme that is changed by the toggle
  const { user } = useAuth();

  useEffect(() => {
    // Set default image or user image
    if (!user.photoURL) {
      const defaultImageReplacement = '/defaultProfile.jpeg';
      setImageUrl(defaultImageReplacement);
    } else {
      setImageUrl(user.photoURL);
    }
  }, [user.photoURL]);

  return (
    <Navbar className={darkTheme ? "bg-gray-800 text-white" : "bg-white text-black"}>
      <Navbar.Brand href="/">
        <img src="/icon.png" className="mr-6 h-9 sm:h-9 rounded-full z-10" alt="Logo"/>
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white z-10">Little Globe</span>
      </Navbar.Brand>
      <div className="flex md:order-2 z-20">
        <Dropdown
          arrowIcon={false}
          inline
          label={<Avatar alt="User Image" img={imageUrl} rounded />}
        >
          <Dropdown.Header>
            <span className="block text-sm">{user.email}</span>
          </Dropdown.Header>
          <Dropdown.Item href="/profile"><strong>Profile</strong></Dropdown.Item>
          <Dropdown.Divider />
          <div onClick={signOutUser}>
            <Dropdown.Item><strong>Sign out</strong></Dropdown.Item>
          </div>
        </Dropdown>

        {/* Dark theme toggle button */}
        <Flowbite>
          <DarkThemeToggle onClick={toggleTheme} />
        </Flowbite>

        <Navbar.Toggle />
      </div>

      <div className="z-10">
        <Navbar.Collapse>
          <Navbar.Link href="/"><strong>Home</strong></Navbar.Link>
          <Navbar.Link href="#"><strong>My Post</strong></Navbar.Link>
          <Navbar.Link href="#"><strong>Friends</strong></Navbar.Link>
        </Navbar.Collapse>
      </div>
    </Navbar>
  );
}

export default MyNavbar;
