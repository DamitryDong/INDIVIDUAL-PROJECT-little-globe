'use client';

import React from 'react';
import { signIn } from '../utils/auth';
import { Button, Checkbox, Label, TextInput } from "flowbite-react";

function Signin() {
  return (
    <div className="flex flex-col justify-center items-center h-screen w-full text-center">
        <Button pill onClick={signIn}>Google Login</Button>
      </div>
  );
}

export default Signin;