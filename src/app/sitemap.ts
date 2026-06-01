import { MetadataRoute } from "next";

type Freq = "always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://bachatguru.in";
  const now = new Date();
  const page = (path: string, priority: number, freq: Freq) => ({
    url: `${baseUrl}${path}`,
    lastModified: now,
    changeFrequency: freq,
    priority,
  });
  return [
    page("", 1, "weekly"),
    page("/guide", 0.8, "monthly"),
    page("/about", 0.4, "monthly"),
    page("/contact", 0.3, "monthly"),
    page("/privacy", 0.3, "yearly"),
    page("/disclaimer", 0.3, "yearly"),
  ];
}
