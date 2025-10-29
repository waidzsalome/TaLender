import React from "react";
import { Box, Typography, Button, Paper } from "@mui/material";
import { useNavigate } from "react-router";

const LoginRequired: React.FC = () => {
  const navigate = useNavigate();

  const handleGoogleLogin = () => {
    window.location.href =
      "http://localhost:3000/auth/google?prompt=select_account";
  };

  return (
    <Box
      sx={{
        height: "90vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: 5,
          borderRadius: 3,
          textAlign: "center",
          width: "400px",
        }}
      >
        <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold" }}>
          Please log in
        </Typography>
        <Typography variant="body1" sx={{ mb: 4 }}>
          You need to log in to access this feature.
        </Typography>

        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleGoogleLogin}
          sx={{
            textTransform: "none",
            fontSize: "16px",
            py: 1.2,
            backgroundColor: "#4285F4",
            "&:hover": { backgroundColor: "#357ae8" },
          }}
        >
          Continue with Google
        </Button>

        <Button
          variant="text"
          fullWidth
          sx={{ mt: 2 }}
          onClick={() => navigate("/")}
        >
          Go Back Home
        </Button>
      </Paper>
    </Box>
  );
};

export default LoginRequired;
