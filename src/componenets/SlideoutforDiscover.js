"use client";

import { Button, Drawer, } from "flowbite-react";
import { useState } from "react";
import { useTheme } from "@/utils/context/ThemeContext";

export function SlideoutFrameforDiscovery({ children, buttonName, position, buttonPosition = "left-5", onOpen}) {

  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => setIsOpen(false);

  const {darkTheme} = useTheme()

  return (
<>
  <div className={`items-center justify-center absolute top-1/2 ${buttonPosition} z-30`}>
    <Button className="rounded-full w-13 h-13 bg-transparent dark:bg-transparent" onClick={() => {
        setIsOpen(true)
        onOpen()
        }}>
      <img src={buttonName} className="w-8 h-auto" style={{ filter: darkTheme ? 'invert(100%)' : '' }} alt="button icon" />
    </Button>
  </div>

  {/* Drawer with hidden overlay & manual close button */}
        <Drawer
        open={isOpen}
        onClose={handleClose} // Disable auto-close on background click
        position={position}
        backdrop={true}
        className={`bg-white w-[100%] xs:w-[100%]`}
        >

        <div className="fixed top-1/2 left-10 z-50 ">
        <Button onClick={handleClose} pill size="xs" className="p-2">
            Back
        </Button>
        </div>

        <Drawer.Items>
            {children}
        </Drawer.Items>
        </Drawer>
</>

  );
}
