export const dynamic = "force-dynamic";
export const revalidate = 0;

import BlogPost from "~/components/pages/blog-detail-page";

export default async function Page({ params }) {
  const { slug } = params;
  const apiUrl = process.env.NEXT_PUBLIC_SEOBOT_API_KEY;
  const key = `https://cdn.seobotai.com/${apiUrl}/blog/${slug}.json`;

  try {
    const response = await fetch(key, { next: { revalidate: 3600 } });
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const blog = await response.json();
    return <BlogPost blog={blog} />;
  } catch (error) {
    return <BlogPost error={error.message} />;
  }
}

export async function generateMetadata({ params }) {
  const { slug } = params;
  const apiUrl = process.env.NEXT_PUBLIC_SEOBOT_API_KEY;
  const key = `https://cdn.seobotai.com/${apiUrl}/blog/${slug}.json`;
  try {
    const response = await fetch(key, { next: { revalidate: 3600 } });
    if (!response.ok) return {};
    const blog = await response.json();
    return {
      title: blog?.metaDescription || blog?.title || "Blog",
      description: blog?.metaDescription || undefined,
      openGraph: { images: blog?.image ? [blog.image] : [] },
    };
  } catch {
    return {};
  }
}
