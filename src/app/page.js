import MapBoxMap from "@/Componenets/MapBox";
import CardSection from "@/Componenets/postCards/CardsSection";
import { LocationSearch } from "@/Componenets/LocationSearch";

export default function Home() {
  return (
    <div className="flex flex-row justify-center bg-white text-black">
      <CardSection/>
      <MapBoxMap/>
      <LocationSearch/> 
    </div>
  );
}
