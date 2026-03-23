import PlanDetailsPage from "./PlanDetailsPage";

export async function generateMetadata({ params }) {
  const slug = params.slug;
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

  let meta = {
    title: "Plan Details",
    description: "View plan details",
  };

  try {
    const res = await fetch(
      `${API_BASE_URL}/api/v1/plan/slug/${slug}`,
      { cache: "no-store" }
    );
    const result = await res.json();

    if (result.success && result.data) {
      meta.title = result.data.meta_title || result.data.title;
      meta.description =
        result.data.meta_description || "Best mobile plan available";
    }
  } catch (error) {
    console.error("Meta fetch error:", error);
  }

  return {
    title: meta.title,
    description: meta.description,
  };
}

export default function Page({ params }) {
  return <PlanDetailsPage slug={params.slug} />;
}