import {
    Link,
    Links,
    LiveReload,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration,
    useCatch, useTransition, useLoaderData
} from "remix";

import tailwindStyles from "./tailwind.css"
import {user} from "./services/auth.server"

export let loader = async ({request}) => {
    return await user({request});
};

export let links = () => {
    return [
        {rel: "stylesheet", href: tailwindStyles},
    ];
};

export default function App() {
    let user = useLoaderData();

    return (
        <Document>
            <Layout user={user}>
                <Outlet/>
            </Layout>
        </Document>
    );
}

export function ErrorBoundary({error}) {
    console.error(error);
    return (
        <Document title="Error!">
            <Layout>
                <div>
                    <h1>There was an error</h1>
                    <p>{error.message}</p>
                    <hr/>
                    <p>
                        Hey, developer, you should replace this with what you want your
                        users to see.
                    </p>
                </div>
            </Layout>
        </Document>
    );
}

export function CatchBoundary() {
    let caught = useCatch();

    let message;
    switch (caught.status) {
        case 401:
            message = (
                <p>
                    Oops! Looks like you tried to visit a page that you do not have access
                    to.
                </p>
            );
            break;
        case 404:
            message = (
                <p>Oops! Looks like you tried to visit a page that does not exist.</p>
            );
            break;

        default:
            throw new Error(caught.data || caught.statusText);
    }

    return (
        <Document title={`${caught.status} ${caught.statusText}`}>
            <Layout>
                <h1>
                    {caught.status}: {caught.statusText}
                </h1>
                {message}
            </Layout>
        </Document>
    );
}

function Document({children, title}) {
    return (
        <html lang="en">
        <head>
            <meta charSet="utf-8"/>
            <meta name="viewport" content="width=device-width,initial-scale=1"/>
            {title ? <title>{title}</title> : null}
            <Meta/>
            <Links/>
        </head>
        <body className="bg-gray-100">
        {children}
        <ScrollRestoration/>
        <Scripts/>
        {process.env.NODE_ENV === "development" && <LiveReload/>}
        </body>
        </html>
    );
}

function Layout({children, user}) {
    let transition = useTransition();
    return (
        <>
            <div className="bg-white">
                <main className="shadow">
                    <div className="max-w-screen-lg mx-auto flex flex-row justify-between items-center p-4 sm:p-7 relative z-10 space-x-2 sm:space-x-3">
                        <Link to="/" className="block">
                            <h1 className="text-2xl font-black"><span className="text-purple-700">
                                    ergo</span>dnc
                            </h1>
                        </Link>

                        <div className="flex items-center text-sm font-semibold">
                            {user
                                ?
                                <>
                                    <form action="/logout" method="post">
                                        <button type="submit" className="text-gray-700 hover:text-purple-700">
                                            Log Out
                                        </button>
                                    </form>

                                    <Link to={"/profile"} className="text-gray-700 ml-7 border border-gray-300 hover:border-gray-400 rounded px-4 py-2">
                                        Profile
                                    </Link>
                                </>
                                :
                                <>
                                    <Link to={"/login"} className="text-gray-700 hover:text-purple-700">
                                        Sign In
                                    </Link>
                                    <Link to={"/register"} className="text-gray-700 ml-7 border border-gray-300 hover:border-gray-400 rounded px-4 py-2">
                                        Create Account
                                    </Link>
                                </>
                            }
                        </div>
                    </div>
                </main>
            </div>

            <div className="max-w-screen-lg mx-auto p-4 sm:p-7 mt-10">
                {transition.state == 'loading'
                    ? <div className={'text-center'}>
                        {/*By Sam Herbert (@sherb), for everyone. More @ http://goo.gl/7AJzbL*/}
                        <svg width="120" height="30" viewBox="0 0 120 30" xmlns="http://www.w3.org/2000/svg" className={'text-purple-700 fill-current inline'}>
                            <circle cx="15" cy="15" r="15">
                                <animate attributeName="r" from="15" to="15"
                                         begin="0s" dur="0.8s"
                                         values="15;9;15" calcMode="linear"
                                         repeatCount="indefinite" />
                                <animate attributeName="fillOpacity" from="1" to="1"
                                         begin="0s" dur="0.8s"
                                         values="1;.5;1" calcMode="linear"
                                         repeatCount="indefinite" />
                            </circle>
                            <circle cx="60" cy="15" r="9" fillOpacity="0.3">
                                <animate attributeName="r" from="9" to="9"
                                         begin="0s" dur="0.8s"
                                         values="9;15;9" calcMode="linear"
                                         repeatCount="indefinite" />
                                <animate attributeName="fillOpacity" from="0.5" to="0.5"
                                         begin="0s" dur="0.8s"
                                         values=".5;1;.5" calcMode="linear"
                                         repeatCount="indefinite" />
                            </circle>
                            <circle cx="105" cy="15" r="15">
                                <animate attributeName="r" from="15" to="15"
                                         begin="0s" dur="0.8s"
                                         values="15;9;15" calcMode="linear"
                                         repeatCount="indefinite" />
                                <animate attributeName="fillOpacity" from="1" to="1"
                                         begin="0s" dur="0.8s"
                                         values="1;.5;1" calcMode="linear"
                                         repeatCount="indefinite" />
                            </circle>
                        </svg>
                    </div>
                    : children
                }
            </div>
        </>
    )
}