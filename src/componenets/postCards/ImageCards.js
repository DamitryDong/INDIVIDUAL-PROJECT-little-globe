import { Card, Avatar, Tooltip, Button } from "flowbite-react";
import { useTheme } from "@/utils/context/ThemeContext";
import { getSingleUserByUid } from "@/api/userApi";
import { useEffect, useState } from "react";

function ImageCards({ cardobj }) {
  const { darkTheme } = useTheme();
  const [author, setAuthor] = useState()

  useEffect(() => {
    getSingleUserByUid(cardobj.uid).then((user) => {
      if (user) {
        setAuthor(user)
      }
    })
  }, [cardobj])

  return (
      <Card
        imgAlt="Post Image"
        imgSrc={cardobj.imageUrl}
        className={`${darkTheme ? "!bg-slate-800" : "!bg-white "} mt-4`} 
      >
        <div className=" p-4 border-t-4">

        <div className={`${darkTheme ? "!bg-slate-800 text-gray-300" : "!bg-white !text-gray-800"} p-4`}>
          <p className="font-semibold text-lg">
            {cardobj.locationName}
          </p>
          <p className="mt-2">
            {cardobj.caption}
          </p>
        </div>

        {/* AVATAR SECTION ON THE CARD */}
          <div
            className={`p-1 rounded-md flex flex-row items-center justify-center gap-4 ${
              darkTheme ? "bg-slate-800 text-gray-100" : "bg-white text-gray-800"
            }`}
          >
            <Tooltip content={author?.username} arrow={false}>
            <Avatar rounded img={author?.photoURL || "/defaultProfile.jpeg"} alt="Post Author" />
            </Tooltip>
          
          </div>

        </div>
      </Card>
  );
}

export default ImageCards;

