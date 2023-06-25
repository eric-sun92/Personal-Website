import React from "react";
import { Navigation } from "../components/nav";
import { Card } from "../components/card";
import { Article } from "./article";
import chunk from 'lodash/chunk';
import data from "../../data.json";
import { getRepos, getPinnedRepos, getVercelProjects } from "../data";
// import { Redis } from "@upstash/redis";

// const redis = Redis.fromEnv();

export default async function ProjectsPage({
    searchParams: { customUsername },
}) {
    
    const username = customUsername || process.env.GITHUB_USERNAME || data.githubUsername;
    const [repositories, pinnedNames, vercelProjects] = await Promise.all([getRepos(username), getPinnedRepos(username), getVercelProjects()]);

    // interested only in the project name, link, framework and description
    // interested only in Vercel projects that are linked to GitHub repositories
    const vercelProjectsDetails = vercelProjects.projects
        .filter(project => {
            const githubRepo = repositories.find(repo => repo.name === project.name);
            return githubRepo;
        })
        .map((project) => ({
            framework: project.framework,
            name: project.name,
            nodeVersion: project.nodeVersion,
            link: project.link,
            description: project.description,
        }));

    // For Vercel projects, add the framework to the GitHub repository info object.
    repositories.forEach(repo => {
        const vercelRepo = vercelProjectsDetails.find(vercelRepo => vercelRepo.name === repo.name);
        if (vercelRepo) {
            repo.vercel = vercelRepo;
        }
    });

    // const heroes = repositories.filter((project) => data.projects.heroNames.includes(project.name)).sort((a, b) => b.stargazers_count - a.stargazers_count);
    const heroes = repositories.filter((project) => pinnedNames.includes(project.name)).sort((a, b) => b.stargazers_count - a.stargazers_count);
    const sorted = repositories
        .filter((p) => !p.private)
        .filter((p) => !p.fork)
        .filter((p) => !p.archived)
        // .filter((p) => p.name !== username)
        .filter((p) => !pinnedNames.includes(p.name))
        .filter((p) => !data.projects.blacklist.includes(p.name))
        .sort(
            (a, b) =>
                new Date(b.updated_at ?? Number.POSITIVE_INFINITY).getTime() -
                new Date(a.updated_at ?? Number.POSITIVE_INFINITY).getTime(),
        );
    
    const project_categories = ["Machine Learning", "Data Structures", "Games", "APIs", "Websites"]
    
    const chunkSize = Math.ceil(sorted.length / 3);
    return (
        <div className="relative pb-16">
            <Navigation />
            <div className="px-6 pt-16 mx-auto space-y-8 max-w-7xl lg:px-8 md:space-y-16 md:pt-24 lg:pt-32">
                <div className="max-w-2xl mx-auto lg:mx-0">
                    <h2 className="text-3xl font-bold tracking-tight text-zinc-100 sm:text-4xl">
                        My Projects
                    </h2>
                    <p className="mt-4 text-zinc-400">
                        {/* {data.description} */}
                        {/* <pre>{JSON.stringify(vercelProjects.projects[1], null, 4)}</pre> */}
                    </p>
                </div>

                <div className="grid grid-cols-2 gap-4 mx-auto lg:mx-0">
                        {project_categories.map((project) => (
                                <Card key={project.name}>
                                    <Article project={project} />
                                </Card>
                            ))}
                </div>
            </div>
        </div>
    );
}
