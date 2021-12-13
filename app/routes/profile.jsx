import {useLoaderData, Link} from "remix";
import {user, currentToken, requireAuth} from "./../services/auth.server"
import axios from "./../services/axios.server"

export let loader = async ({request, params}) => {
    await requireAuth({request});

    let userToken = await currentToken({request});

    let response = await axios.get('/reservations', {
        headers: {
            "Authorization": "Bearer " + userToken
        }
    });

    return {
        reservations: response.data.data,
        user: await user({request})
    };
};

export let meta = () => {
    return {
        title: "Profile — ergodnc",
    };
};

export default function Profile() {
    let {reservations, user} = useLoaderData();

    return (
        <>
            <h1 className="text-3xl font-black mb-10">
                Hello {user.name}!
            </h1>

            <div className="mb-10">
                <span>Here is a list of your previous reservations!</span>
            </div>

            {reservations.map((reservation, index) => (
                <div key={reservation.office.id} className={`flex ${index + 1 == reservations.length ? '' : 'pb-10 mb-10 border-b'}`}>
                    <div className="w-1/3 h-56 relative overflow-hidden rounded-lg">
                        <img src={reservation.office.featured_image.path} className="object-cover w-full h-full"></img>
                    </div>


                    <div className="w-full pl-14">
                        <div className="flex justify-between items-center mb-6">
                            <h1 className="text-2xl font-bold">{reservation.office.title}</h1>
                            <span className="block font-semibold">Total ${reservation.price / 100}</span>
                        </div>
                        <p className="mb-5">
                            <span className="text-gray-600 text-sm uppercase">
                                From <strong>{reservation.start_date.split('T')[0]}</strong> To <strong>{reservation.end_date.split('T')[0]}</strong>
                            </span>
                        </p>
                        <p className="leading-loose mb-5">
                            {reservation.office.description}
                        </p>
                        <Link to={"/offices/" + reservation.office.id} className="text-purple-600 font-bold">
                            More details...
                        </Link>
                    </div>
                </div>
            ))}
        </>
    );
}