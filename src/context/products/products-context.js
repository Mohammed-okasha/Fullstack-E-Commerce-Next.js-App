import React from "react";

const ProductsContext = React.createContext({
  products: [],
  searchValue: "",
  selectedValue: "all",
  searchProductsHandler: () => {},
  filterProductsHandler: () => {},
});

export default ProductsContext;
