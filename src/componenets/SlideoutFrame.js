"use client";

import { Button, Drawer } from "flowbite-react";
import { useState } from "react";

export function SlideoutFrame({ children, buttonName, position, autoClose = false, backDrop = true }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleClose = () => setIsOpen(false);

  return (
    <>
      <div className="flex min-h-[50vh] items-center justify-center">
        <Button onClick={() => setIsOpen(true)}>{buttonName}</Button>
      </div>

      {/* Drawer with hidden overlay & manual close button */}
      <Drawer
        open={isOpen}
        onClose={autoClose ? handleClose : () => {}} // Disable auto-close on background click
        position={position}
        backdrop={backDrop}  // Disable the backdrop to remove black background
      >
        <Drawer.Items className="relative">
          {/* Close button inside the Drawer */}
          <button
            onClick={handleClose}
            className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>

          {children}
        </Drawer.Items>
      </Drawer>
    </>
  );
}
