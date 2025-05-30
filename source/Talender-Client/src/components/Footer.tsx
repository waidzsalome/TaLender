import React from "react";
import { Stack, Typography } from "@mui/material";

const Footer: React.FC = () => {
  return (
    <Stack
      sx={{ height: "4vh", textAlign: "center", justifyContent: "center" }}
    >
      <Typography>Created By Talender Group @2025</Typography>
    </Stack>
  );
};

export default Footer;
