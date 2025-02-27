'use client';

import { signOutUser } from '@/utils/auth';
import { Avatar, Dropdown, Navbar } from "flowbite-react";

function MyNavbar() {

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
                <Avatar alt="User settings" img="https://flowbite.com/docs/images/people/profile-picture-5.jpg" rounded />
              }
            >
              <Dropdown.Header>
                <span className="block text-sm">Bonnie Green</span>
                <span className="block truncate text-sm font-medium">name@flowbite.com</span>
              </Dropdown.Header>
              <Dropdown.Item>Dashboard</Dropdown.Item>
              <Dropdown.Item>Settings</Dropdown.Item>
              <Dropdown.Item>Earnings</Dropdown.Item>
              <Dropdown.Divider />
              <div onClick={signOutUser}>
                <Dropdown.Item>Sign out</Dropdown.Item>
              </div>
              
            </Dropdown>
            <Navbar.Toggle />
          </div>
          <Navbar.Collapse>
            <Navbar.Link href="#" active>
              Home
            </Navbar.Link>
            <Navbar.Link href="#">About</Navbar.Link>
            <Navbar.Link href="#">Services</Navbar.Link>
            <Navbar.Link href="#">Pricing</Navbar.Link>
            <Navbar.Link href="#">Contact</Navbar.Link>
          </Navbar.Collapse>
        </Navbar>
  );
}

export default MyNavbar;
