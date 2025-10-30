import React from "react";
import { Box, Container, Typography } from "@mui/material";

const Loading: React.FC = () => {
  return (
    <Container sx={{ height: "90vh" }}>
      <Box>
        <Typography>Loading</Typography>
      </Box>
    </Container>
  );
};

export default Loading;
