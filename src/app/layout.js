import { Poppins } from 'next/font/google';
import "@/style/globals.css";
import ClientProvider from '@/utils/context/ClientProvider';
import "mapbox-gl/dist/mapbox-gl.css";
import { ThemeProvider } from '@/utils/context/ThemeContext';

const poppins = Poppins({ subsets: ['latin'], weight: ['400', '700'] });

export const metadata = {
  title: "Little Globe",
  description: "Little Globe is a NEXTjs map and social media site where media post will be tied to different locations around the world",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
        {/* standard favicon change, i forget how to do this everytime but it's just a link below htmlr*/}
        <link rel="icon" type="image/png" href="/icon.png" />

      <body
        className={`${poppins.className}`}
      >
        <ThemeProvider>
          <ClientProvider>
            {children}
          </ClientProvider>
        </ThemeProvider>

      </body>

    </html>
  );
}
