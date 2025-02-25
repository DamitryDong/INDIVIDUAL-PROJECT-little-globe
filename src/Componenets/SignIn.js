'use client';

import React from 'react';
import { signIn } from '../utils/auth';

function Signin() {
  return (
    <div className="flex flex-col justify-center items-center h-screen text-center">
      <h2 className="text-4xl font-bold">Welcome to our App</h2>
      <p className="text-lg mt-2">Please sign in to continue</p>
      <button
        onClick={signIn}
        className=" border-slate-200 bg-cyan-500"
      >
        Sign In
      </button>
    </div>
  );
}

export default Signin;