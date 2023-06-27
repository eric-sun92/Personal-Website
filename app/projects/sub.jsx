"use client";
import { Card } from "../components/card";
import { Article } from "./article";
import { useSearchParams } from 'next/navigation';

export const Sub = ({ repositories }) => {
    const searchParams = useSearchParams();
    const area = searchParams.get('area');

    const ml_models = ["Kaggle-Titanic", "pytorch_custom_data", "computer_vision_MNIST"]
    const ml_apps = ["is_it_food"]
    const full_stack_apps = ["surveyALP", "OPPO-hackathon"]
    const custom_APIs = ["Custom_Auth_API", "e-commerce-api", "jobs-api","fileUpload"]
    const data_structures = []
    const games = []

    let correct;
    if (area == "ML Models") {
        correct = ml_models
    } else if (area == "ML Apps") {
        correct = ml_apps
    } else if (area == "Full Stack Apps") {
        correct = full_stack_apps
    } else if (area == "Custom APIs") {
        correct = custom_APIs
    } else if (area == "Data Structures") {
        correct = data_structures
    } else {
        correct = games
    }
    // const sorted = repositories
    //     .filter((p) => !p.private)
    //     .filter((p) => !p.fork)
    //     .filter((p) => !p.archived)
    //     .filter((p) => !data.projects.blacklist.includes(p.name))
    //     .sort(
    //         (a, b) =>
    //             new Date(b.updated_at ?? Number.POSITIVE_INFINITY).getTime() -
    //             new Date(a.updated_at ?? Number.POSITIVE_INFINITY).getTime(),
    //     );
    console.log(repositories)
            
    const display_repos = repositories.filter((p) => correct.includes(p.name))
    console.log(display_repos)

	return (
        <div className="grid grid-cols-2 gap-4 mx-auto lg:mx-0">
                            {display_repos.map((project) => (
                                    <Card key={project.name}>
                                        <Article project={project} />
                                    </Card>
                                ))}
                    </div>
	);
};
