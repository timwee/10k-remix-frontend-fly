import { useActionData } from "@remix-run/react";
import { redirect, json } from "@remix-run/node";
import { getIsLoggedIn } from "~/data/auth.server";
import QuestionForm from "~/components/QuestionForm";
import { callAPI } from "~/data/api.server";

export default function Index() {
  const actionData = useActionData();

  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-4xl px-6 lg:px-8">
        <div className="flex items-start space-x-4">
          <QuestionForm />
        </div>
        <div className="flex items-start space-x-4">
          {actionData && actionData.response ? (
            <div className="mt-6 p-2 border-yellow-200 bg-yellow-50">
              <p className="text-sm leading-8 text-yellow-500">
                {actionData.response}
              </p>
            </div>
          ) : (
            <div />
          )}
        </div>
      </div>
    </div>
  );
}

export async function loader({ request }) {
  const isLoggedIn = await getIsLoggedIn(request);
  if (!isLoggedIn) {
    return redirect("/auth");
  }
  return json({});
}

export async function action({ request }) {
  const formData = await request.formData();
  const question = formData.get("question");
  console.log(question);

  return callAPI(question);

  // await new Promise((r) => setTimeout(r, 3000));
  // return {
  //   response:
  //     "Google made changes to their fee structure, improved ad formats and delivery, and increased sales of Pixel devices. They also experienced growth in YouTube non-advertising and hardware revenues, as well as Google Cloud Platform and Google Workspace offerings.",
  // };
}
