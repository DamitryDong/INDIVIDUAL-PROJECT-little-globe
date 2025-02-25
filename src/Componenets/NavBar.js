'use client';

import { signOutUser } from '@/utils/auth';
import { Avatar, Dropdown, Navbar, DarkThemeToggle, Flowbite } from "flowbite-react";
import { useAuth } from '@/utils/context/authContext';


function MyNavbar() {
    
    const { user } = useAuth()

    console.log(user)

  return (
        <Navbar fluid rounded>
          <Navbar.Brand href="/">
            <img src="/icon.png" className="mr-6 h-9 sm:h-9 rounded-full" alt="Flowbite React Logo"/>
            <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">Little Globe</span>
          </Navbar.Brand>
          <div className="flex md:order-2">
            <Dropdown
              arrowIcon={false}
              inline
              label={
                <Avatar alt="User settings" img={user.photoURL} rounded />
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
                <DarkThemeToggle />
            </Flowbite>

            <Navbar.Toggle />
          </div>
          <Navbar.Collapse>
            <Navbar.Link href="#" active>
            NoWORK
            </Navbar.Link>
            <Navbar.Link href="#">NoWORK</Navbar.Link>
            <Navbar.Link href="#">NoWORK</Navbar.Link>
            <Navbar.Link href="#">NoWORK</Navbar.Link>
            <Navbar.Link href="#">NoWORK</Navbar.Link>
          </Navbar.Collapse>
        </Navbar>
  );
}

export default MyNavbar;
