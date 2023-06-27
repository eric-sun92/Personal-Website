import React from "react";
import { Navigation } from "../components/nav";
import { Article } from "./article";

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

export default function ProjectAreasPage() {

    const project_categories = ["ML Apps", "ML Models", "Full Stack Apps" , "Custom APIs", "Data Structures", "Games"]
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
                <div className="px-6 pt-20 pb-8 mx-auto space-y-8 max-w-7xl lg:px-8 md:space-y-8 md:pt-40 lg:pt-25">
                    <div className="max-w-2xl mx-auto lg:mx-0">
                        <h2 className="text-3xl font-bold tracking-tight text-zinc-100 sm:text-4xl">
                            My Projects
                        </h2>
                    </div>
                    <div className="grid grid-cols-2 gap-4 mx-auto lg:mx-0">
                            {project_categories.map((project) => (
                                    // <Card key={project.name}>
                                        <Article key={project} project={project} />
                                    // </Card>
                            ))}
                    </div>
                </div>
            </div>
        </div>
        </body>
      </html>
    );
}
