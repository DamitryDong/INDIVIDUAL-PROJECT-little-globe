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
        className={`${darkTheme ? "bg-slate-800" : "bg-white "} mt-6`} 
      >
        <div>

        <div className={`${darkTheme ? "bg-slate-800 text-gray-100" : "bg-white text-gray-800"} p-4`}>
          <p className="font-semibold text-lg">
            {cardobj.locationName}
          </p>
          <p className="mt-2">
            {cardobj.caption}
          </p>
        </div>

        {/* AVATAR SECTION ON THE CARD */}
        <div
          className={`absolute right-0 flex flex-row items-center p-1 rounded-md shadow-md ${
            darkTheme ? "bg-slate-800 text-gray-100" : "bg-white text-gray-800"
          }`}
        >
          <span className="mr-2">{author?.username || "Unknown"}</span>
          <Avatar rounded img={author?.photoURL || "/defaultProfile.jpeg"} alt="Post Author" />
        </div>

        {/* THE BUTTON TO FIND LOCATION */}
        <Tooltip content="Find Post" arrow={false}>
          <Button className="absolute left-0" size="xs" outline gradientDuoTone="cyanToBlue">
          <img src="/locationIcon.png" className="w-4 h-4 dark:border-white" alt="Location Icon" />
          </Button>
        </Tooltip>

        </div>
      </Card>
  );
}

export default ImageCards;

