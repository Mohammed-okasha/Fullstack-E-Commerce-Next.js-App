import { useReducer } from "react";
import { productsReducer, createProductsState } from "./products-reducer";
import ProductContext from "../product-details";

const ProductsProvider = ({ children, products }) => {
  const defaultProductsState = createProductsState(products);
  const [productsState, dispatch] = useReducer(
    productsReducer,
    defaultProductsState
  );

  const searchProductsHandler = (value) => {
    dispatch({ type: "SEARCH", searchValue: value });
  };

  const filterProductsHandler = (value) => {
    dispatch({ type: "FILTER", selectedValue: value });
  };

  const productsCtx = {
    products: productsState.products,
    searchValue: productsState.searchValue,
    selectedValue: productsState.selectedValue,
    searchProductsHandler,
    filterProductsHandler,
  };

  return (
    <ProductContext.Provider value={productsCtx}>
      {children}
    </ProductContext.Provider>
  );
};

export default ProductsProvider;
