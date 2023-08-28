import Head from "next/head";
import { Section } from "@/components/UI";
import ProductWrapper from "@/components/productDetails/product/ProductWrapper";
import ReviewsWrapper from "@/components/productDetails/reviews/ReviewsWrapper";
import ProductContext from "@/context/product-details";
import { getFeaturedProducts, fetchProducts } from "@/api/http-util";

const ProductDetailsPage = ({ product }) => {
  return (
    <>
      <Head>
        <title>{product.title}</title>
        <meta name="description" content={product.description} />
      </Head>
      <ProductContext.Provider value={product}>
        <Section>
          <ProductWrapper />
        </Section>
        <Section>
          <ReviewsWrapper />
        </Section>
      </ProductContext.Provider>
    </>
  );
};

export const getStaticProps = async ({ params }) => {
  const allProducts = await fetchProducts();
  const productId = params.productId;

  const product = allProducts.find(
    (product) => String(product.id) === productId
  );

  if (!product) {
    return { notFound: true };
  }

  return {
    props: { product },
    revalidate: 1800,
  };
};

export const getStaticPaths = async () => {
  const featuredProducts = await getFeaturedProducts();

  const paths = featuredProducts.map((product) => ({
    params: { productId: product.id.toString() },
  }));

  return {
    paths,
    fallback: "blocking",
  };
};

export default ProductDetailsPage;
