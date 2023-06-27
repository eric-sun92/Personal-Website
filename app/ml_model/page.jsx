import React from "react";
import { Navigation } from "../components/nav";
import { Card } from "../components/card";
import { Article } from "./article";
import data from "../../data.json";
import { getRepos, getPinnedRepos } from "../data";


export default async function MlModel({
    searchParams: { customUsername },
}) {
    
    const username = customUsername || process.env.GITHUB_USERNAME || data.githubUsername;
    const [repositories] = await Promise.all([getRepos(username)]);

    const sorted = repositories
        .filter((p) => !p.private)
        .filter((p) => !p.fork)
        .filter((p) => !p.archived)
        // .filter((p) => p.name !== username)
        .filter((p) => !data.projects.blacklist.includes(p.name))
        .sort(
            (a, b) =>
                new Date(b.updated_at ?? Number.POSITIVE_INFINITY).getTime() -
                new Date(a.updated_at ?? Number.POSITIVE_INFINITY).getTime(),
        );
    
    
    const ml_models = ["Kaggle-Titanic", "pytorch_custom_data", "computer_vision_MNIST"]
    
    const machineLearning = sorted.filter((p) => ml_models.includes(p.name))
    
    return (
        <div className="relative pb-16">
            <Navigation />
            <div className="px-6 pt-16 mx-auto space-y-8 max-w-7xl lg:px-8 md:space-y-16 md:pt-24 lg:pt-32">
                <div className="max-w-2xl mx-auto lg:mx-0">
                    <h2 className="text-3xl font-bold tracking-tight text-zinc-100 sm:text-4xl">
                        My Projects
                    </h2>
                </div>

                <div className="grid grid-cols-2 gap-4 mx-auto lg:mx-0">
                        {machineLearning.map((project) => (
                                <Card key={project.name}>
                                    <Article project={project} />
                                </Card>
                            ))}
                </div>
            </div>
        </div>
    );
}
