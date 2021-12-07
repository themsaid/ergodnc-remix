import {useCatch, Link, json, useLoaderData} from "remix";
import Button from '../../components/button'

export let loader = async ({params}) => {
    let office = {
        "images": [
            {
                "path": "https://via.placeholder.com/400x400.png?text=PLACEHOLDER",
            }
        ],
        "id": 1,
        "title": "Office One",
        "description": "Architecto assumenda cum eum. Voluptas qui dignissimos qui voluptate. Mollitia necessitatibus ut sit. Et saepe ea quo nulla.",
        "price_per_day": 1000,
    };

    return office;
};

export let meta = ({office}) => {
    return {
        title: office ? `${office.name} — ergodnc` : "ergodnc",
    };
};


export default function Office() {
    let office = useLoaderData();

    return (
        <div className="flex">
            <div className="w-1/2 h-56 relative overflow-hidden rounded-lg">
                <img src={office.images[0].path} className="object-cover w-full h-full"></img>
            </div>

            <div className="w-full pl-14">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">{office.title}</h1>
                    <span className="block font-semibold">${office.price_per_day / 100} per day</span>
                </div>
                <p className="leading-loose mb-5">
                    {office.description}
                </p>
                <Button className="mt-10">Book</Button>
            </div>
        </div>
    );
}