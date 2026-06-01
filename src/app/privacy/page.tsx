import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy - BachatGuru",
  description: "How BachatGuru handles your data. We process tax calculations in your browser and never store your financial information.",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white mb-2">Privacy Policy</h1>
        <p className="text-sm text-slate-400 mb-6">Last updated: {new Date().toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" })}</p>
        <div className="space-y-4 text-slate-600 dark:text-slate-300 leading-relaxed text-sm">
          <p>
            Your privacy matters to us. This policy explains what information BachatGuru (&quot;we&quot;, &quot;us&quot;)
            collects and how we use it.
          </p>

          <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100 mt-6">1. Tax calculation data</h2>
          <p>
            The numbers you enter into our calculator (salary, deductions, personal situation) are processed
            <strong> entirely within your own browser</strong>. This data is <strong>not</strong> sent to or stored on our
            servers. If you choose, your inputs may be saved locally in your browser (localStorage) only so the form
            stays filled when you return — you can clear it any time with the &quot;Reset form&quot; button.
          </p>

          <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100 mt-6">2. Information you submit voluntarily</h2>
          <p>
            If you fill in our &quot;Get Free Expert Help&quot; form, we collect the name, email, mobile number and
            details you provide, in order to connect you with a tax advisor. We use this only for that purpose and do
            not sell it indiscriminately. You can request deletion any time via our contact page.
          </p>

          <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100 mt-6">3. Cookies & analytics</h2>
          <p>
            We may use analytics tools (such as Google Analytics) to understand how visitors use the site. These tools
            may set cookies to collect anonymous usage data (pages visited, device type, approximate location).
          </p>

          <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100 mt-6">4. Advertising</h2>
          <p>
            We may display ads served by third-party networks such as Google AdSense. Third-party vendors, including
            Google, use cookies to serve ads based on a user&apos;s prior visits to this and other websites. Google&apos;s
            use of advertising cookies enables it and its partners to serve ads based on your visits. You can opt out of
            personalized advertising by visiting{" "}
            <a href="https://www.google.com/settings/ads" target="_blank" rel="noopener noreferrer" className="text-indigo-600 dark:text-indigo-400 underline">
              Google Ads Settings
            </a>.
          </p>

          <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100 mt-6">5. Third-party links</h2>
          <p>
            Our recommendations may link to third-party services (mutual fund platforms, insurers, etc.). We are not
            responsible for the privacy practices of those sites. Please review their policies.
          </p>

          <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100 mt-6">6. Your rights</h2>
          <p>
            You may request access to, correction of, or deletion of any personal information you submitted to us by
            emailing us via the contact page.
          </p>

          <h2 className="text-lg font-bold text-slate-800 dark:text-slate-100 mt-6">7. Changes</h2>
          <p>
            We may update this policy from time to time. Continued use of the site means you accept the latest version.
          </p>
        </div>
      </div>
    </div>
  );
}
