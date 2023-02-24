import { Form, useActionData } from "@remix-run/react";
import { redirect, json } from "@remix-run/node";
import { getIsLoggedIn, login } from "~/data/auth.server";
import { LockClosedIcon } from "@heroicons/react/20/solid";

export default function AuthPage() {
  const actionData = useActionData();
  console.log(actionData);

  return (
    <div className="flex min-h-full items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <img
            // className="mx-auto h-12 w-auto"
            src="assets/logo.png"
            alt="Logo"
          />
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Enter Access Code
          </h2>
        </div>
        <Form className="mt-8 space-y-6" method="post" id="auth-form">
          {actionData?.formError ? (
            <div className="rounded-md bg-red-50 p-4">
              <div className="flex">
                <div className="ml-3">
                  <h3 className="text-sm font-medium text-red-800">
                    {actionData.formError}
                  </h3>
                </div>
              </div>
            </div>
          ) : null}
          <div className="-space-y-px rounded-md shadow-sm">
            <div>
              <label htmlFor="password" className="sr-only">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                placeholder="Access Code"
              />
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                <LockClosedIcon
                  className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400"
                  aria-hidden="true"
                />
              </span>
              Sign in
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
}

export async function loader({ request }) {
  const isLoggedIn = await getIsLoggedIn(request);
  console.log(isLoggedIn);
  if (isLoggedIn) {
    return redirect("/");
  }
  return json({});
}

export async function action({ request }) {
  const formData = await request.formData();
  const credentials = Object.fromEntries(formData);

  try {
    return await login(credentials);
  } catch (error) {
    console.log(error);
    console.log(error.mesage);
    return { formError: error.message };
  }
}
