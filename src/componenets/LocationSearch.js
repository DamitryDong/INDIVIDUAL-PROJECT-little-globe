"use client";

import { Label, TextInput } from "flowbite-react";

export function LocationSearch({ clickedLocation }) {
  // Check if clickedLocation is valid
  if (!clickedLocation || !clickedLocation.longitude || !clickedLocation.latitude) {
    return <div>Loading...</div>; // Or handle this case appropriately
  }

  return (
    <div className="flex max-w-md flex-col gap-4 bg-white p-4 rounded-lg shadow-md">
      {/* Longitude */}
      <div>
        <div className="mb-2 block">
          <Label htmlFor="longitude" value="Longitude" className="dark:text-black" />
        </div>
        <TextInput
          id="longitude"
          type="text"
          sizing="sm"
          value={clickedLocation.longitude}
          readOnly // Make it read-only if you don't want the user to edit it
        />
      </div>

      {/* Latitude */}
      <div>
        <div className="mb-2 block">
          <Label htmlFor="latitude" value="Latitude" className="dark:text-black" />
        </div>
        <TextInput
          id="latitude"
          type="text"
          sizing="md"
          value={clickedLocation.latitude}
          readOnly // Again, read-only if you don't want the user to edit
        />
      </div>

      {/* Another field if needed */}
      <div>
        <div className="mb-2 block">
          <Label htmlFor="other" value="Other input" className="dark:text-black" />
        </div>
        <TextInput
          id="other"
          type="text"
          sizing="lg"
          placeholder="NEED REST OF THE FORM AS INPUT"
        />
      </div>
    </div>
  );
}
