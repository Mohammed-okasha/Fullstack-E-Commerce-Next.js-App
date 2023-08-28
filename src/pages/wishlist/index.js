import Head from "next/head";
import { Section } from "@/components/UI";
import WishlistContent from "@/components/wishlist/WishlistContent";

const WishlistPage = () => {
  return (
    <>
      <Head>
        <title>Wishlist</title>
        <meta
          name="description"
          content="want to save something for later?, your wishlist will go here"
        />
      </Head>
      <Section>
        <WishlistContent />
      </Section>
    </>
  );
};

export default WishlistPage;
