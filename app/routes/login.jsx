import {json, Link, Form, redirect, useActionData} from "remix";
import Errors from "./../components/errors"
import Label from "./../components/label"
import Input from "./../components/input"
import Button from "./../components/button"
import {login, requireGuest} from "./../services/auth.server"

export let loader = async ({request, params}) => {
    await requireGuest({request});

    return null;
};

export let action = async ({request}) => {
    await requireGuest({request});

    let formData = await request.formData();
    let email = formData.get("email");
    let password = formData.get("password");

    let {errors, redirector} = await login({request, email, password});

    return errors || redirector;
};

export let meta = () => {
    return {
        title: "Sign In — ergodnc",
    };
};

export default function Login() {
    let errors = useActionData();

    return (
        <>
            <div className={"w-1/2 mx-auto bg-white p-5 rounded-lg"}>
                <Errors className="mb-5" errors={errors || []}/>

                <Form method="POST" autoComplete="off">
                    <div>
                        <Label htmlFor="email">Email</Label>

                        <Input
                            id="email"
                            type="email"
                            name="email"
                            className="block mt-1 w-full"
                            required
                            autoFocus
                        />
                    </div>

                    <div className="mt-4">
                        <Label htmlFor="password">Password</Label>

                        <Input
                            id="password"
                            type="password"
                            name="password"
                            className="block mt-1 w-full"
                            required
                            autoComplete="current-password"
                        />
                    </div>

                    <div className="flex items-center justify-end mt-4">
                        <Link to="/forgot-password" className="underline text-sm text-gray-600 hover:text-gray-900">
                            Forgot your password?
                        </Link>

                        <Button className="ml-3">Login</Button>
                    </div>
                </Form>
            </div>
        </>
    );
}
