export const revalidate = 3600;
export const dynamic = "force-dynamic";

import BlogListing from "~/components/pages/blog-list-page";

export default async function Page() {
  const apiKey = process.env.NEXT_PUBLIC_SEOBOT_API_KEY;
  let articles = [];
  try {
    const url = `https://cdn.seobotai.com/${apiKey}/system/base.json`;
    const resp = await fetch(url, { next: { revalidate: 3600 } });
    if (resp.ok) {
      articles = await resp.json();
    }
  } catch (e) {
    articles = [];
  }
  return <BlogListing articles={articles} />;
}

export const metadata = {
  title: "Blog",
};
