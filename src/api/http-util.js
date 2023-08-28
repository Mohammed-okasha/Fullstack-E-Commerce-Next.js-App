import { getDiscountAmount, getNewPrice } from "@/utils/helpers";

const productsUrl = "https://dummyjson.com/products";

export async function fetchData(url) {
  const res = await fetch(url);

  const data = await res.json();

  if (res.status !== 200 && res.ok) {
    throw new Error(data);
  }

  return data;
}

export async function fetchProducts() {
  const res = await fetch(productsUrl);

  const data = await res.json();

  if (res.status !== 200 && res.ok) {
    throw new Error(data);
  }

  return data.products.map((product, index) => {
    const discount = getDiscountAmount(
      product.price,
      product.discountPercentage
    );

    const newPrice = discount ? getNewPrice(product.price, discount) : null;

    if (index >= 20) {
      return { ...product, newPrice, featured: false };
    }

    return { ...product, newPrice, featured: true };
  });
}

export async function getFeaturedProducts() {
  const allProducts = await fetchProducts();

  return allProducts.filter((product) => product.featured);
}

export async function sendData(url, data) {
  const res = await fetch(url, {
    method: "POST",
    body: JSON.stringify(data),
    headers: { "Content-Type": "application/json" },
  });

  const result = await res.json();

  if (res.status !== 201 && !res.ok) {
    throw new Error(result.message);
  }

  return result;
}
