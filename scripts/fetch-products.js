import fs from "fs/promises";

async function fetchAndSave() {
  const apiUrl = "https://zmapi.zoikomobile.co.uk/api/v1/products/category/1";

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
    const data = await response.json();

    const mapped = mapProducts(data.products.products);
    const jsonString = JSON.stringify(mapped, null, 2);

    await fs.writeFile("./app/products/phonedata.json", jsonString, "utf-8");

    console.log("phonedata.json saved successfully!");
  } catch (err) {
    console.error("Error fetching or saving:", err);
  }
}

function mapProducts(apiProducts) {
  return apiProducts.map((p) => {
    const v = p.variants?.[0] || {};

    return {
      id: p.id,
      name: p.name,
      slug: p.slug,
      price: `$${v.starting_price ?? "0.00"}`,
      condition: v.device_conditions || [],
      color: (v.colors || []).map((c) => c.toLowerCase()),
      storage: v.storages || [],
      quality: v.quality || "",
      image: mapImage(p.slug),
    };
  });
}

function mapImage(slug) {
  const mapping = {
    "galaxy-s22-plus-5g": "/img/phones/galaxy-s22.jpg",
    "iphone-13-pro-max": "/img/phones/iphone-14-pro-max-black.jpg",
    "iphone-12-pro-max": "/img/phones/iphone-12-pro-max-graphite.jpg",
    "iphone-12-mini": "/img/phones/iphone-12-mini.jpg",
    "iphone-11-pro": "/img/phones/iphone-11-pro.jpg",
    "galaxy-s23-plus": "/img/phones/Galaxy-s23.jpg",
    "galaxy-s23-fe": "/img/phones/galaxy-s23-fe.jpg",
    "iphone-se-3": "/img/phones/iphone-se3.jpg",
    "pixel-8-pro": "/img/phones/pixel-8-pro.jpg",
  };
  return mapping[slug] ?? `/img/phones/${slug}.jpg`;
}

fetchAndSave();
