'use client'

import MyCardSection from "@/componenets/postCards/MyCardSec";
import { useEffect, useState } from "react";
import { getPostByUid } from "@/api/postApi";
import { useAuth } from "@/utils/context/authContext";

export default function MyPostPage () {
    const [postobj,setPostobj] =useState()

    const {user} = useAuth()

    useEffect(() => {
        getPostByUid(user.uid).then((users) => setPostobj(users))
    })

    return (
      <div className="dark:bg-slate-800">
        <div className="w-[60%] flex justify-center items-center mx-auto">
          <MyCardSection postObj={postobj} />
        </div>
      </div>
      );
}