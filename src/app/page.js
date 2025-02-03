import "../styles/globals.css";
import SignIn from "@/components/SignInPage";

export default function Home() {
  return (

    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <h1 className="text-4xl font-bold text-blue-500">This is my testrun for Tailwind</h1>
      <SignIn/>
    </div>

  );
}
