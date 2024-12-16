
import "./globals.css";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/footer/Footer";
import { Poppins } from 'next/font/google';
import { SessionProvider } from "next-auth/react";
import { auth } from "./api/auth/[...nextauth]/route";

const poppins = Poppins({ subsets: ['latin'], weight: ['400', '600'] });



export const metadata ={
  title: "Mangguy Full-Stack",
  description: "Explore the world of full-stack development with powerful tools, resources, and projects for web and app development."
}


export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <html lang="en">
      <body className={poppins.className}>
        <SessionProvider session={session}>
          <div className="container">
            <Navbar />
            <main>
              {children}
            </main>
            <Footer />
          </div>
        </SessionProvider>
      </body>
    </html>
  );
}
