import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import ButtonBase from "@mui/material/ButtonBase";
import Container from "@mui/material/Container";
import { Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const ImageBackdrop = styled("div")(({ theme }) => ({
  position: "absolute",
  left: 0,
  right: 0,
  top: 0,
  bottom: 0,
  background: "#000",
  opacity: 0.5,
  transition: theme.transitions.create("opacity"),
}));

const ImageIconButton = styled(ButtonBase)(({ theme }) => ({
  position: "relative",
  display: "block",
  padding: 0,
  borderRadius: 0,
  height: "40vh",
  [theme.breakpoints.down("md")]: {
    width: "100% !important",
    height: 100,
  },
  "&:hover": {
    zIndex: 1,
  },
  "&:hover .imageBackdrop": {
    opacity: 0.15,
  },
  "&:hover .imageMarked": {
    opacity: 0,
  },
  "&:hover .imageTitle": {
    border: "4px solid currentColor",
  },
  "& .imageTitle": {
    position: "relative",
    padding: `${theme.spacing(2)} ${theme.spacing(4)} 14px`,
  },
  "& .imageMarked": {
    height: 3,
    width: 18,
    background: theme.palette.common.white,
    position: "absolute",
    bottom: -2,
    left: "calc(50% - 9px)",
    transition: theme.transitions.create("opacity"),
  },
}));

const images = [
  {
    url: "https://cdn.gobankingrates.com/wp-content/uploads/2022/11/family-father-mother-daughter-grocery-shopping-supermarket_iStock-1436468416.jpg?webp=1&w=675&quality=100?auto=format&fit=crop&w=400",
    title: "Grocery",
    width: "40%",
  },
  {
    url: "https://c4.wallpaperflare.com/wallpaper/580/687/703/wooden-floor-hand-tools-safety-glasses-wallpaper-preview.jpg?quality=100?auto=format&fit=crop&w=400",
    title: "Tools",
    width: "20%",
  },
  {
    url: "https://wallpapercave.com/wp/wp3130198.jpg?auto=format&fit=crop&w=400",
    title: "Clothing",
    width: "40%",
  },
  {
    url: "https://imageproxy.wolt.com/venue/624eafab339c448403cc8adf/601740e6-b66c-11ec-bf15-8e560a13fd11_shutterstock_1875797689.jpg?auto=format&fit=crop&w=400",
    title: "Electronics",
    width: "38%",
  },
  {
    url: "https://media.istockphoto.com/id/1285065780/photo/furniture-showroom-with-plants-spotlights-and-brick-wall.jpg?s=170667a&w=0&k=20&c=ECA73AgaZoM0YpCGMSYmG8Z0VSYNAmklbn-6tFkje0E=",
    title: "Furniture",
    width: "38%",
  },
  {
    url: "https://c0.wallpaperflare.com/preview/461/487/717/bakery-bread-food-market.jpg?auto=format&fit=crop&w=400",
    title: "Bakery",
    width: "24%",
  },
  {
    url: "https://wallpaperaccess.com/full/4983373.jpg?auto=format&fit=crop&w=400",
    title: "Liquor",
    width: "30%",
  },
  {
    url: "https://images.unsplash.com/photo-1533727937480-da3a97967e95?auto=format&fit=crop&w=400",
    title: "Fitness and Sports",
    width: "20%",
  },
  {
    url: "https://images.unsplash.com/photo-1518136247453-74e7b5265980?auto=format&fit=crop&w=400",
    title: "Reading",
    width: "30%",
  },
  {
    url: "https://bobbysfashions.com/wp-content/uploads/2018/05/Style-Accessories-for-Men.jpg?auto=format&fit=crop&w=400",
    title: "Accessories",
    width: "20%",
  },
];

export default function ProductCategories() {
  const navigate = useNavigate();
  return (
    <>
      <Container component="section" sx={{ mt: 8, mb: 4 }}>
        <Typography variant="h4" marked="center" align="center" component="h2">
          For all Styles and all Desires
        </Typography>
        <Box sx={{ mt: 8, display: "flex", flexWrap: "wrap" }}>
          {images.map((image) => (
            <ImageIconButton
              key={image.title}
              onClick={() => {
                navigate(`/product/${image?.title?.toLowerCase()}`);
              }}
              style={{
                width: image.width,
              }}
            >
              <Box
                sx={{
                  position: "absolute",
                  left: 0,
                  right: 0,
                  top: 0,
                  bottom: 0,
                  backgroundSize: "cover",
                  backgroundPosition: "center 40%",
                  backgroundImage: `url(${image.url})`,
                }}
              />
              <ImageBackdrop className="imageBackdrop" />
              <Box
                sx={{
                  position: "absolute",
                  left: 0,
                  right: 0,
                  top: 0,
                  bottom: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "common.white",
                }}
              >
                <Typography
                  component="h3"
                  variant="h6"
                  color="inherit"
                  className="imageTitle"
                >
                  {image.title}
                  <div className="imageMarked" />
                </Typography>
              </Box>
            </ImageIconButton>
          ))}
        </Box>
      </Container>
      <Container component="section" sx={{ mt: 8, mb: 4 }}>
        <Typography variant="h4" marked="center" align="center" component="h2">
          ALL OF OUR PRODUCTS
        </Typography>
        <Box sx={{ mt: 8, display: "flex", flexWrap: "wrap" }}>
          <ImageIconButton
            key="Visit Store"
            style={{
              width: "100%",
            }}
            onClick={() => {
              navigate("/product");
            }}
          >
            <Box
              sx={{
                position: "absolute",
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
                backgroundSize: "cover",
                backgroundPosition: "center 70%",
                backgroundImage: `url(https://img.freepik.com/premium-photo/shopping-cart-sits-front-bunch-cardboard-boxes_781958-2431.jpg)`,
              }}
            />
            <ImageBackdrop className="imageBackdrop" />
            <Box
              sx={{
                position: "absolute",
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "common.white",
              }}
            >
              <Typography
                component="h3"
                variant="h6"
                color="inherit"
                className="imageTitle"
              >
                Visit Store
                <div className="imageMarked" />
              </Typography>
            </Box>
          </ImageIconButton>
        </Box>
      </Container>
    </>
  );
}
