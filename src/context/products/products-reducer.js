const createProductsState = (products) => {
  return {
    products: products,
    searchValue: "",
    selectedValue: "all",
  };
};

const productsReducer = (state, action) => {
  if (action.type === "SEARCH") {
    return {
      ...state,
      searchValue: action.searchValue.trim().toLowerCase(),
    };
  }

  if (action.type === "FILTER") {
    return {
      ...state,
      selectedValue: action.selectedValue,
    };
  }

  return state;
};

export { createProductsState, productsReducer };
