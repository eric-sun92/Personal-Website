import Link from "next/link";
import { Github, Star } from "lucide-react";
import { VercelInfo } from "../components/vercel-info";

export const Article = ({ project }) => {

    let appLink =  `/projects?area=${project}`

    return (
        <article className="p-6 md:p-8">
            <Link href={appLink} prefetch={false}>
                <h2 className="z-20 text-xl font-medium duration-1000 lg:text-3xl text-zinc-200 group-hover:text-white font-display cursor-pointer" title={`Click to view the ${project.homepage ? 'app' : 'repo'}.`}>
                    <span className="bg-gradient-to-r from-purple-400 to-blue-500 hover:from-pink-500 hover:to-yellow-500 text-transparent bg-clip-text">
                        {project}
                    </span>
                </h2>
            </Link>
            
        </article>
    );
};
