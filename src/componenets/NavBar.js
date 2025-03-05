'use client';

import { signOutUser } from '@/utils/auth';
import { Avatar, Dropdown, Navbar, DarkThemeToggle, Flowbite, Button } from "flowbite-react";
import { useAuth } from '@/utils/context/authContext';
import { useEffect, useState } from 'react';  
import { useTheme } from '@/utils/context/ThemeContext';
import Link from 'next/link';

function MyNavbar() {
  const [imageUrl, setImageUrl] = useState(null);
  const { toggleTheme, darkTheme } = useTheme(); 
  const { user } = useAuth();

  useEffect(() => {
    setImageUrl(user.photoURL || '/defaultProfile.jpeg');
  }, [user.photoURL]);

  return (
    <Navbar className={`absolute w-full ${darkTheme ? "bg-gray-800 text-white" : "bg-white text-black"}`}>
      <Navbar.Brand className="flex items-center gap-3 z-30">
        <img src="/icon.png" className="h-10 w-10 rounded-full" alt="Logo"/>
        <span className="text-xl font-semibold dark:text-white">Little Globe</span>
      </Navbar.Brand>

      {/* Right Side */}
      <div className="flex items-center space-x-6 z-30">
        {/* Theme Toggle */}
        <Flowbite>
          <DarkThemeToggle onClick={toggleTheme} />
        </Flowbite>

        {/* User Dropdown */}
        <Dropdown arrowIcon={false} inline label={<Avatar alt="User Image" img={imageUrl} rounded />}>
          <Dropdown.Header>
            <span className="block text-sm">{user.email}</span>
          </Dropdown.Header>
          <Dropdown.Item href="/profile"><strong>Profile</strong></Dropdown.Item>
          <Dropdown.Divider />
          <div onClick={signOutUser}>
            <Dropdown.Item><strong>Sign out</strong></Dropdown.Item>
          </div>
        </Dropdown>

        {/* Navbar Toggle Button (Mobile) */}
        <Navbar.Toggle />
      </div>

      {/* Navigation Links , SOMETHING I DIDNT KNOW: you jave the wrap a button in link if ur using flowbite navbar bc it doesnt register normal button affects*/}
      <Navbar.Collapse> 
        <div className="flex gap-4 text-lg z-30">
          <Link href="/" passHref>
            <Button className='bg-transparent border-transparent dark:bg-transparent dark:border-transparent' color='gray'>
              <img src="/homepageIcon.png" className="w-6 h-6" style={{ filter: darkTheme ? 'invert(100%)' : '' }} alt="Home" />
            </Button>
          </Link>
          <Link href="/myPost" passHref>
            <Button className='bg-transparent border-transparent dark:bg-transparent dark:border-transparent' color='gray'>
              <img src="/myImageIcon.png" className="w-6 h-6" style={{ filter: darkTheme ? 'invert(100%)' : '' }} alt="My Images" />
            </Button>
          </Link>
          <Link href="#" passHref>
            <Button className='bg-transparent border-transparent dark:bg-transparent dark:border-transparent' color='gray'>
              <img src="/friendListIcon.webp" className="w-6 h-6" style={{ filter: darkTheme ? 'invert(100%)' : '' }} alt="Friends" />
            </Button>
          </Link>
        </div>
      </Navbar.Collapse>

    </Navbar>
  );
}

export default MyNavbar;
