import type { MetadataRoute } from "next";
import { ARTICLES, CLUSTERS } from "./guide/articles";

export const dynamic = "force-static";

const BASE_URL = "https://menoapp.health";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const guidePages: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/guide`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.8,
    },
    ...CLUSTERS.map((c) => ({
      url: `${BASE_URL}/guide/topic/${c.id}`,
      lastModified,
      changeFrequency: "weekly" as const,
      priority: 0.75,
    })),
    ...ARTICLES.map((a) => ({
      url: `${BASE_URL}/guide/${a.slug}`,
      lastModified: new Date(a.dateModified),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];

  return [
    {
      url: `${BASE_URL}/`,
      lastModified,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/quiz`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    ...guidePages,
    {
      url: `${BASE_URL}/tracking`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.85,
    },
    {
      url: `${BASE_URL}/for-clinicians`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/privacy`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/terms`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/support`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.6,
    },
    {
      url: `${BASE_URL}/delete-account`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];
}
