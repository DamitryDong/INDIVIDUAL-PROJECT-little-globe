import GeminiTest from "@/Componenets/Gemini";
import MapBoxMap from "@/Componenets/MapBox";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center bg-white text-black">
        <GeminiTest/>
        <MapBoxMap/>
    </div>
  );
}
