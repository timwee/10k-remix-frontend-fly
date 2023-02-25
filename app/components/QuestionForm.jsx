import { Form, useTransition as useNavigation } from "@remix-run/react";

export default function QuestionForm() {
  const navigation = useNavigation();
  const isSubmitting = navigation.state !== "idle";

  return (
    <div className="min-w-0 flex-1">
      <Form method="post" id="query-form" className="relative">
        <div className="overflow-hidden rounded-lg border border-gray-300 shadow-sm focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500">
          <label htmlFor="question" className="sr-only">
            Ask your question
          </label>
          <textarea
            rows={3}
            name="question"
            id="question"
            className="block w-full resize-none border-0 py-3 px-3 focus:ring-0 sm:text-sm border-b-2"
            placeholder="Ask your question..."
            defaultValue={""}
          />

          {/* Spacer element to match the height of the toolbar */}
          <div className="py-2" aria-hidden="true">
            {/* Matches height of button in toolbar (1px border + 36px content height) */}
            <div className="py-px">
              <div className="h-9" />
            </div>
          </div>
        </div>

        <div className="absolute inset-x-0 bottom-0 flex justify-between py-2 pl-3 pr-2">
          <div className="flex items-center space-x-5">
            <div className="flex items-center"></div>
            <div className="flex items-center"></div>
          </div>
          <div className="flex-shrink-0">
            <button
              disabled={isSubmitting}
              type="submit"
              className={
                "inline-flex items-center rounded-md border border-transparent px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2" +
                (isSubmitting ? " bg-gray-300" : " bg-indigo-600 ")
              }
            >
              {isSubmitting ? "Processing..." : "Submit"}
            </button>
          </div>
        </div>
      </Form>
    </div>
  );
}
