import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact BachatGuru",
  description: "Get in touch with the BachatGuru team for questions, feedback, partnerships or support.",
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white mb-6">Contact Us</h1>
        <div className="space-y-4 text-slate-600 dark:text-slate-300 leading-relaxed">
          <p>
            We&apos;d love to hear from you — whether it&apos;s feedback, a bug, a partnership idea, or a question about
            your tax plan.
          </p>
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6">
            <p className="mb-2">
              <strong className="text-slate-800 dark:text-slate-100">Email:</strong>{" "}
              <a href="mailto:hello@bachatguru.in" className="text-indigo-600 dark:text-indigo-400 underline">
                hello@bachatguru.in
              </a>
            </p>
            <p className="text-sm text-slate-500 dark:text-slate-400">
              (Replace this with your real email address before going live.)
            </p>
          </div>
          <p>We aim to reply within 1–2 business days.</p>
        </div>
      </div>
    </div>
  );
}
