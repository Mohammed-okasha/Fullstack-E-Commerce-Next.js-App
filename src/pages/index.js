import Head from "next/head";
import { Section, Banner } from "@/components/UI";
import ProductsList from "@/components/products/ProductsList";
import { getFeaturedProducts } from "@/api/http-util";

const HomePage = ({ featuredProducts }) => {
  return (
    <>
      <Head>
        <title>D&E Home</title>
        <meta
          name="description"
          content="browse our featured products on D&E Home Page"
        />
      </Head>
      <Banner />
      <Section title="featured products" variant="h3">
        <ProductsList products={featuredProducts} />
      </Section>
    </>
  );
};

export async function getStaticProps() {
  const featuredProducts = await getFeaturedProducts();

  return {
    props: { featuredProducts },
  };
}
export default HomePage;
