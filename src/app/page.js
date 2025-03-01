import MapBoxMap from "@/componenets/MapBox";
import CardSection from "@/componenets/postCards/CardsSection";
import { LocationSearch } from "@/componenets/LocationSearch";

export default function Home() {
  return (
    <div className="flex flex-row justify-center bg-white text-black h-screen">

      <div className=" w-1/4 bg-yellow-200 overflow-y-auto">
        <CardSection/>
      </div>

      <div className="w-1/2 h-screen bg-slate-200">
        <MapBoxMap/>
      </div>

      <div className="w-1/4 bg-green-700"><LocationSearch/> </div>

    </div>
  );
}
