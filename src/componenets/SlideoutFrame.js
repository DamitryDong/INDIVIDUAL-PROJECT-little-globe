"use client";

import { Button, Drawer, } from "flowbite-react";
import { useState } from "react";

export function SlideoutFrame({ children, buttonName, position, autoClose = false, backDrop = true, buttonPosition = "left-5", backgroundTrans = "", shadow= "", widthChange="" }) {

  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => setIsOpen(false);

  return (
    <>
    <div className={`items-center justify-center absolute top-1/2 ${buttonPosition} z-30`}>
      <Button className="rounded-full w-13 h-13 bg-transparent dark:bg-transparent" onClick={() => setIsOpen(true)}>
        <img src={buttonName} className="w-6 h-auto" alt="button icon" />
      </Button>
    </div>
      {/* Drawer with hidden overlay & manual close button */}
      <Drawer
        open={isOpen}
        onClose={autoClose ? handleClose : () => {}} // Disable auto-close on background click
        position={position}
        backdrop={backDrop}  // Disable the backdrop to remove black background
        className= {`${shadow} ${backgroundTrans} dark:${backgroundTrans} ${widthChange}`}
      >
        <Drawer.Items>
        <Button onClick={handleClose} color="gray" pill size="xs" className="p-2 hover:bg-red-500 hover:text-white transition">
          ✕
        </Button>
          {children}
        </Drawer.Items>
      </Drawer>
    </>
  );
}
