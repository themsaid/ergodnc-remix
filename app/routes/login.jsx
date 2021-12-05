import {json, Link, Form, redirect, useActionData} from "remix";
import Errors from "./../components/errors"
import Label from "./../components/label"
import Input from "./../components/input"
import Button from "./../components/button"

export let action = async ({request}) => {
    let formData = await request.formData();
    let email = formData.get("email");
    let password = formData.get("password");
    let remember = formData.get("remember");
    let errors: [];

    return redirect("/");
};

export let meta = () => {
    return {
        title: "Sign In — ergodnc",
    };
};

export default function Index() {
    let errors = useActionData();

    return (
        <>
            <div className={"w-1/2 mx-auto bg-white p-5 rounded-lg"}>
                <Errors className="mb-5" errors={errors}/>

                <Form method="POST">
                    <div>
                        <Label htmlFor="email">Email</Label>

                        <Input
                            id="email"
                            type="email"
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
                            className="block mt-1 w-full"
                            required
                            autoComplete="current-password"
                        />
                    </div>

                    <div className="block mt-4">
                        <label
                            htmlFor="remember_me"
                            className="inline-flex items-center">
                            <input
                                id="remember_me"
                                type="checkbox"
                                name="remember"
                                className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            />

                            <span className="ml-2 text-gray-600">
                            Remember me
                        </span>
                        </label>
                    </div>

                    <div className="flex items-center justify-end mt-4">
                        <Link to="/forgot-password">
                            <a className="underline text-sm text-gray-600 hover:text-gray-900">
                                Forgot your password?
                            </a>
                        </Link>

                        <Button className="ml-3">Login</Button>
                    </div>
                </Form>
            </div>
        </>
    );
}
