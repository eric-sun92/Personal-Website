import React from "react";
import { Navigation } from "../components/nav";
import {Sub} from "./sub"
import data from "../../data.json";
import { getRepos } from "../data";

import "../../global.css";
import { Inter } from "next/font/google";
import LocalFont from "next/font/local";


const inter = Inter({
 subsets: ["latin"],
 variable: "--font-inter",
});

const calSans = LocalFont({
 src: "../../public/fonts/CalSans-SemiBold.ttf",
 variable: "--font-calsans",
});

export default async function ProjectsPage() {
    
    const username = process.env.GITHUB_USERNAME || data.githubUsername;
    const [repositories] = await Promise.all([getRepos(username)]);
    
    return (
        <html lang="en" className={[inter.variable, calSans.variable].join(" ")}>
         <body
             className={`bg-black ${
                 process.env.NODE_ENV === "development" ? "debug-screens" : ''
             }`}
         >
        <div className="relative min-h-screen bg-gradient-to-tl from-zinc-900 via-zinc-400/10 to-zinc-900">
            <div className="relative pb-16">
                <Navigation />
                <div className="px-6 pt-16 mx-auto space-y-8 max-w-7xl lg:px-8 md:space-y-16 md:pt-24 lg:pt-32">
                    <div className="max-w-2xl mx-auto lg:mx-0">
                        <h2 className="text-3xl font-bold tracking-tight text-zinc-100 sm:text-4xl">
                            My Projects
                        </h2>
                    </div>

                    <Sub repositories={repositories}></Sub>
                </div>
            </div>
        </div>
        </body>
      </html>
    );
}
