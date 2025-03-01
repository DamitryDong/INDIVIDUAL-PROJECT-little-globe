
import MapBoxMap from "@/Componenets/MapBox";
import ImageCards from "@/Componenets/postCards/ImageCards";
import { LocationSearch } from "@/Componenets/LocationSearch";

export default function Home() {
  return (
    <div className="flex flex-row justify-center bg-white text-black">
      <ImageCards/>
      <MapBoxMap/>
      <LocationSearch/> 
    </div>
  );
}
