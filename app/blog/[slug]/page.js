import BlogClient from "./BlogClient";

// SERVER — Fetch data here
async function getPost(slug) {
  const res = await fetch(
    `https://zmapi.zoikomobile.co.uk/api/v1/posts/${slug}`,
    { cache: "no-store" }
  );

  if (!res.ok) return null;
  return res.json();
}

// SERVER — SEO Metadata
export async function generateMetadata({ params }) {
  const post = await getPost(params.slug);

  if (!post) {
    return {
      title: "Post Not Found",
      description: "This blog post does not exist.",
    };
  }

  const seoTitle = post.meta_title || post.title;
  const seoDescription =
    post.meta_description ||
    post.content?.replace(/<[^>]+>/g, "").slice(0, 160);

  const imageFile = post.og_image || post.cover_image;
  const imageUrl = imageFile
    ? `https://zmapi.zoikomobile.co.uk/storage/${imageFile}`
    : "/no-image.jpg";

  const pageUrl = `https://zoikomobile.co.uk/${params.slug}`;

  return {
    title: seoTitle,
    description: seoDescription,
    alternates: { canonical: pageUrl },
    openGraph: {
      title: seoTitle,
      description: seoDescription,
      type: "article",
      url: pageUrl,
      images: [{ url: imageUrl }],
    },
    twitter: {
      card: "summary_large_image",
      title: seoTitle,
      description: seoDescription,
      images: [imageUrl],
    },
  };
}

// SERVER — Return CLIENT component
export default async function BlogPage({ params }) {
  const post = await getPost(params.slug);

  return <BlogClient post={post} />;
}
