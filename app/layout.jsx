
import "../global.css";
import { Inter } from "next/font/google";
import LocalFont from "next/font/local";
import { Analytics } from '@vercel/analytics/react';
import data from "../data.json";

const username = process.env.GITHUB_USERNAME || data.githubUsername;
const displayName = data.displayName || username;

/** @type {import('next').Metadata} */
export const metadata = {
 title: {
     default: "Eric Sun",
     template: "Eric Sun",
 },
 description: "Eric Sun's Personal Website",
 robots: {
     index: true,
     follow: true,
     googleBot: {
         index: true,
         follow: true,
         "max-video-preview": -1,
         "max-image-preview": "large",
         "max-snippet": -1,
     },
 },
 icons: [
     {
         url: "/favicon.ico",
         rel: "icon",
         sizes: "any",
         type: "image/svg+xml",
     },
 ]
};
const inter = Inter({
 subsets: ["latin"],
 variable: "--font-inter",
});

const calSans = LocalFont({
 src: "../public/fonts/CalSans-SemiBold.ttf",
 variable: "--font-calsans",
});

export default function RootLayout({
 children,
}) {
 return (
     <html lang="en" className={[inter.variable, calSans.variable].join(" ")}>
         <body
             className={`bg-black ${
                 process.env.NODE_ENV === "development" ? "debug-screens" : ''
             }`}
         >
             <Analytics />
             {children}
         </body>
     </html>
 );
}
