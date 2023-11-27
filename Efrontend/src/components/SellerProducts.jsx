import { useQuery } from "@tanstack/react-query";
import { $axios } from "../lib/axios";
import { Grid, Typography } from "@mui/material";
import ProductCard from "./ProductCard";

const SellerProducts = () => {
  const { data, error, isError, isLoading } = useQuery({
    queryKey: ["seller-product"],
    queryFn: async () => {
      return await $axios.post("/product/seller/all", { page: 1, limit: 10 });
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

export default SellerProducts;
