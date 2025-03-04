import { Card } from "flowbite-react";
import { useTheme } from "@/utils/context/ThemeContext";

function ImageCards({ cardobj }) {
  const { darkTheme } = useTheme();

  return (
    <Card
      imgAlt="Post Image"
      imgSrc={cardobj.imageUrl}
      className={darkTheme ? "bg-slate-800" : "bg-white"} 
    >
      <div className={`p-4 ${darkTheme ? "bg-slate-800" : "bg-white"}`}>
        <h3 className={`font-semibold text-lg ${darkTheme ? "text-gray-100" : "text-gray-800"}`}>
          {cardobj.locationName}
        </h3>
        <p className={`font-semibold text-lg ${darkTheme ? "text-gray-100" : "text-gray-800"}`}>
          {cardobj.caption}
        </p>
      </div>
    </Card>
  );
}

export default ImageCards;

