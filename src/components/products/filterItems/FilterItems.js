import { useContext } from "react";
import Stack from "@mui/material/Stack";
import classes from "./FilterItems.module.scss";
import ProductContext from "@/context/product-details";

const FilterItems = () => {
  const { products, searchProductsHandler, filterProductsHandler } =
    useContext(ProductContext);

  const categories = [
    "all",
    ...new Set(products.map((product) => product.category)),
  ];

  return (
    <Stack
      direction={{ sm: "row" }}
      spacing={2}
      rowGap={1}
      sx={{ "& > *": { flex: 1, bgcolor: "#fff" }, mb: 2 }}
    >
      <input
        type="text"
        name="searchForProducts"
        placeholder="Search By Product Name"
        className={classes.filterItem}
        onChange={(e) => searchProductsHandler(e.target.value)}
      />
      <select
        name="filterProducts"
        defaultValue="all"
        className={`${classes.filterItem} ${classes.select}`}
        onChange={(e) => filterProductsHandler(e.target.value)}
      >
        {categories.map((category) => (
          <option key={category} value={category}>
            {category}
          </option>
        ))}
      </select>
    </Stack>
  );
};

export default FilterItems;
