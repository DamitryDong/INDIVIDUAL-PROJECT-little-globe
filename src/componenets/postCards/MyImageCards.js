import { Card, Button } from "flowbite-react";
import { useTheme } from "@/utils/context/ThemeContext";
import { deletePost } from "@/api/postApi";
import ModalForUpdatePost from "./PostEditForm";

function MyImageCards({ cardobj }) {
  const { darkTheme } = useTheme();

  const handleDelete = () => {
    deletePost(cardobj.firebaseKey).then(() => console.log("Yayy deleted!!"));
  };

  return (
    <div className="flex flex-col md:flex-row items-center gap-4 p-4 bg-opacity-50 rounded-lg shadow-lg">
      {/* Image Card */}
      <Card
        imgAlt="Post Image"
        imgSrc={cardobj.imageUrl}
        className={`${darkTheme ? "bg-slate-800" : "bg-white"} w-full md:w-1/2 border-2 rounded-lg shadow-md overflow-hidden`}
      >
        <div className={`flex flex-row ${darkTheme ? "text-white" : "text-slate-800"}`}>
        <strong className="text-xs">Lat: {cardobj.latitude} Lon: {cardobj.longitude}</strong>
        </div>
        
      </Card>

      {/* Text and Actions */}
      <div className={`flex flex-col items-center p-4 rounded-lg ${darkTheme ? "bg-slate-800 text-gray-100" : "bg-white text-gray-800"} w-full md:w-1/2`}> 
        <p className="font-semibold text-xl text-center">{cardobj.locationName}</p>
        <p className="mt-2 text-center">{cardobj.caption}</p>
        
        {/* Buttons */}
        <div className="flex gap-2 mt-4">
          <Button onClick={handleDelete} size="sm" gradientMonochrome="failure">
            Delete
          </Button>
          <ModalForUpdatePost postObj={cardobj} />
        </div>
      </div>
    </div>
  );
}

export default MyImageCards;