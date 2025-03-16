"use client";

import { Button, Drawer, } from "flowbite-react";
import { useEffect, useState } from "react";
import { useTheme } from "@/utils/context/ThemeContext";

export function SlideoutFrame({ children, buttonName, position, autoClose = false, backDrop = true, buttonPosition = "left-5", shadow= "", CloseFrameForDiscover }) {

  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => setIsOpen(false);

  const {darkTheme} = useTheme()

  useEffect (() => { //this will reset the frame to be closed whenever the Closeframfordiscover is changes and it's changed when we open the discover
    setIsOpen(false)
  },[CloseFrameForDiscover])

  return (
    <>
    <div className={`items-center justify-center absolute top-1/2 ${buttonPosition} z-30`}>
      <Button className="rounded-full w-13 h-13 bg-transparent dark:bg-transparent" onClick={() => setIsOpen(true)}>
        <img src={buttonName} className="w-8 h-auto" style={{ filter: darkTheme ? 'invert(100%)' : '' }} alt="button icon" />
      </Button>
    </div>
      {/* Drawer with hidden overlay & manual close button */}
      <Drawer
        open={isOpen}
        onClose={autoClose ? handleClose : () => {}}
        position={position}
        backdrop={backDrop}  
        className={`${shadow} absolute`}
      >
        <Drawer.Items>
        <Button onClick={handleClose} outline gradientDuoTone="greenToBlue" pill size="xs" className=" hover:text-white transition">
          <strong>✕</strong>
        </Button>
          {children}
        </Drawer.Items>
      </Drawer>
    </>
  );
}
