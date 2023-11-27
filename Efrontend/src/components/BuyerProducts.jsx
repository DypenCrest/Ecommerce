import { useQuery } from "@tanstack/react-query";
import { $axios } from "../lib/axios";
import { Grid, Typography } from "@mui/material";
import ProductCard from "./ProductCard";

const BuyerProducts = () => {
  const { data, error, isLoading, isError } = useQuery({
    queryKey: "buyer-products",
    queryFn: async () => {
      return await $axios.post("/product/buyer/all", { page: 1, limit: 12 });
    },
  });
  const products = data?.data?.products;
  console.log(products);
  return (
    <Grid
      container
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "2rem",
        flexWrap: "wrap",
      }}
    >
      {isLoading && <Typography>Loading...</Typography>}
      {isError && (
        <p className="error-message">{error.response.data.message}</p>
      )}
      {products?.map((product) => {
        return <ProductCard key={product._id} product={product} />;
      })}
    </Grid>
  );
};
export default BuyerProducts;
