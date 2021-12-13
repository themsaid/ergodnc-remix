import {createCookieSessionStorage, redirect} from "remix";
import axios from "./axios.server"

let storage = createCookieSessionStorage({
    cookie: {
        name: "ergodnc_session",
        secure: process.env.NODE_ENV === "production",
        secrets: [process.env.SESSION_SECRET],
        sameSite: "lax",
        path: "/",
        maxAge: 60 * 60 * 24 * 30,
        httpOnly: true
    }
});

export async function login({request, email, password}) {
    let response;
    let session = await storage.getSession(
        request.headers.get('Cookie')
    );

    try {
        response = await axios.post("/login", {email, password})
    } catch (error) {
        return {errors: Object.values(error.response.data.errors).flat()};
    }

    session.set("userToken", response.data.token);

    return {
        redirector: redirect("/", {
            headers: {
                "Set-Cookie": await storage.commitSession(session)
            }
        })
    };
};

export async function logout({request}) {
    const session = await storage.getSession(
        request.headers.get("Cookie")
    );

    let token = session.get("userToken");

    await axios.post("/logout", {}, {
        headers: {
            "Authorization": "Bearer " + token
        }
    })

    return redirect("/login", {
        headers: {
            "Set-Cookie": await storage.destroySession(session)
        }
    });
};

export async function currentToken({request}) {
    const session = await storage.getSession(
        request.headers.get("Cookie")
    );

    return session.get("userToken");
}

export async function user({request}) {
    let response;
    let token = await currentToken({request});

    try {
        response = await axios.get('/user', {
            headers: {
                "Authorization": "Bearer " + token
            }
        })
    } catch (error) {
        return null;
    }

    return response.data.data;
};

export async function requireGuest({request}) {
    if (await user({request})) {
        throw redirect("/");
    }
};

export async function requireAuth({request}) {
    let token = await currentToken({request});

    if (!token) {
        throw redirect("/login");
    }
};