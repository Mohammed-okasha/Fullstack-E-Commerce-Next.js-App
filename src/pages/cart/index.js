import Head from "next/head";
import { Section } from "@/components/UI";
import CartContent from "@/components/cart/CartContent";

const CartPage = () => {
  return (
    <>
      <Head>
        <title>Cart</title>
        <meta
          name="description"
          content="in this page (cart page), you can see your products that you have added to the cart, modify quantities, and delete products, and you can perform the payment and purchase process"
        />
      </Head>
      <Section>
        <CartContent />
      </Section>
    </>
  );
};

export default CartPage;
