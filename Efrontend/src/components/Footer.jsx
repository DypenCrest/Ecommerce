import Box from "@mui/material/Box";
import Link from "@mui/material/Link";
import Typography from "@mui/material/Typography";
import * as React from "react";

function Footer() {
  return (
    <Box component="footer" >
      <Typography variant="body2" color="text.secondary" align="center">
        {"Copyright © "}
        <Link color="inherit" href="/aboutus">
          DS Online Shop
        </Link>
        {new Date().getFullYear()}
      </Typography>
    </Box>
  );
}

export default Footer;