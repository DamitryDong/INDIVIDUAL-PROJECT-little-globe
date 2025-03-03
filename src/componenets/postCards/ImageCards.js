import { Card } from "flowbite-react";

function ImageCards({ cardobj }) {
  return (
    <Card
      className="max-w-sm"
      imgAlt="imagenamegoeshere"
      imgSrc={cardobj.imageUrl}
    >
      <h3 className="font-semibold text-lg text-gray-800 dark:text-gray-100">
        {cardobj.locationName}
      </h3>
      <p className="font-normal text-gray-700 dark:text-gray-400">
        {cardobj.caption}
      </p>
    </Card>
  );
}

export default ImageCards;