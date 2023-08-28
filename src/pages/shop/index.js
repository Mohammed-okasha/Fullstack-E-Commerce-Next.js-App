import Head from "next/head";
import ProductsProvider from "@/context/products/ProductsProvider";
import { Section } from "@/components/UI";
import FilterItems from "@/components/products/filterItems/FilterItems";
import ShoppingProducts from "@/components/products/ShoppingProducts";
import { fetchProducts } from "@/api/http-util";

const ShoppingPage = ({ products }) => {
  return (
    <>
      <Head>
        <title>Shop</title>
        <meta
          name="description"
          content="shop our products collection, you can search product by his name, you can filter products by category"
        />
      </Head>
      <ProductsProvider products={products}>
        <Section title="shop all products" variant="h3">
          <FilterItems />
          <ShoppingProducts />
        </Section>
      </ProductsProvider>
    </>
  );
};

export const getStaticProps = async () => {
  const products = await fetchProducts();

  if (!products) {
    return { notFound: true };
  }

  return {
    props: { products },
  };
};

export default ShoppingPage;
