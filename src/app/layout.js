import { Oswald } from 'next/font/google';
import "@/style/globals.css";
import ClientProvider from '@/utils/context/ClientProvider';

const oswald = Oswald({ subsets: ['latin'], weight: ['400', '700'] });

export const metadata = {
  title: "Little Globe",
  description: "Little Globe is a NEXTjs map and social media site where media post will be tied to different locations around the world",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${oswald.className}`}
      >
        <ClientProvider>
        {children}
        </ClientProvider>
        
      </body>
    </html>
  );
}
