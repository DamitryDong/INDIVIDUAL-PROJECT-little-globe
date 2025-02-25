import React from "react";

export default function Loading() {
  return (
    <div className="flex justify-center items-center mt-5">
      <div className="w-24 h-24 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
}