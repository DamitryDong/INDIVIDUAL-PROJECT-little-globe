import { Card, Tooltip, Button } from "flowbite-react";
import { useTheme } from "@/utils/context/ThemeContext";
import { deletePost } from "@/api/postApi";
import ModalForUpdatePost from "./PostEditForm";

function MyImageCards({ cardobj }) {
  const { darkTheme } = useTheme();

  const handleDelete = () => {
    deletePost(cardobj.firebaseKey).then(console.log("Yayy deleted!!"))
  }

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

        {/* Delete button */}
        <div>
            <Button color="failure" onClick={handleDelete} size="xs">
                Delete
            </Button>
        </div>

        <ModalForUpdatePost postObj={cardobj}/>

        </div>
      </Card>
  );
}

export default MyImageCards;

