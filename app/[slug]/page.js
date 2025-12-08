import BlogClient from "./BlogClient";

// Simple fetch — NO CACHE ANYWHERE
async function getPost(slug) {
  try {
    const res = await fetch(
      `https://zmapi.zoikomobile.co.uk/api/v1/posts/${slug}`,
      { cache: "no-store" } // always fetch fresh
    );

    if (!res.ok) return null;

    return await res.json();
  } catch (error) {
    console.error("Failed to fetch post:", error);
    return null;
  }
}

// SERVER — SEO Metadata
export async function generateMetadata({ params }) {
  const post = await getPost(params.slug);

  if (!post) {
    return {
      title: "Post Not Found",
      description: "This blog post does not exist.",
      keywords: "",
    };
  }

  const seoTitle = post.meta_title || post.title || "Blog Post";
  const seoDescription =
    post.meta_description ||
    post.content?.replace(/<[^>]+>/g, "").slice(0, 160) ||
    "Read this amazing blog post.";
  const seoKeywords = post.meta_keywords?.join(", ") || "";

  const imageUrl =
    post.og_image || post.cover_image
      ? `https://zmapi.zoikomobile.co.uk/storage/${post.og_image || post.cover_image}`
      : "/no-image.jpg";

  const pageUrl = `https://zoikomobile.co.uk/${params.slug}`;

  return {
    title: seoTitle,
    description: seoDescription,
    keywords: seoKeywords,
    alternates: { canonical: pageUrl },
    openGraph: {
      title: post.og_title || seoTitle,
      description: post.og_description || seoDescription,
      type: "article",
      url: pageUrl,
      images: [{ url: imageUrl }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.og_title || seoTitle,
      description: post.og_description || seoDescription,
      images: [imageUrl],
    },
  };
}

// SERVER — Return CLIENT component
export default async function BlogPage({ params }) {
  const post = await getPost(params.slug);

  if (!post) return <p>Post not found.</p>;
  return <BlogClient post={post} />;
}
