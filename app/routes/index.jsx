import {useLoaderData, Link} from "remix";
import axios from "./../services/axios.server"

export let loader = async () => {
    let response = await axios.get('/offices');

    return response.data.data;
};

export let meta = () => {
    return {
        title: "ergodnc"
    };
};

export default function Index() {
    let offices = useLoaderData();

    return (
        <>
            {offices.map((office, index) => (
                <div key={office.id} className={`flex ${index + 1 == offices.length ? '' : 'pb-10 mb-10 border-b'}`}>
                    <div className="w-1/3 h-56 relative overflow-hidden rounded-lg">
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
                        <Link to={"/offices/" + office.id} className="text-purple-600 font-bold">
                            More details...
                        </Link>
                    </div>
                </div>
            ))}
        </>
    );
}
