import { Card } from "flowbite-react";

function ImageCards({ cardobj }) {
  return (
    <Card
      className="max-w-sm"
      imgAlt="imagenamegoeshere"
      imgSrc={cardobj.imgUrl}
    >
      <p className="font-normal text-gray-700 dark:text-gray-400">
        Here are the biggest enterprise technology acquisitions of 2021 so far, in reverse chronological order.
      </p>
    </Card>
  );
}

export default ImageCards;