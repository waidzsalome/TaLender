import React from "react";
import { useNavigate } from "react-router";
import {
  Container,
  Box,
  Stack,
  Paper,
  Card,
  Button,
  CardMedia,
  CardContent,
  Typography,
  InputBase,
  IconButton,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";

const Mainpage: React.FC = () => {
  const navigate = useNavigate();
  const handleClickModifyButton = () => {
    return navigate("/tailoredpage");
  };
  const handleClickSwipeButton = () => {
    return navigate("/swipepage");
  };
  return (
    <Container maxWidth="md">
      <Box
        sx={{
          height: "90vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Stack
          spacing={5}
          direction="column"
          sx={{ alignItems: "center", p: "4vh" }}
        >
          <Paper
            component="form"
            sx={{
              p: "2px 4px",
              display: "flex",
              alignItems: "center",
              width: 400,
            }}
          >
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Input your Interests"
              inputProps={{ "aria-label": "Input your Interests" }}
            />
            <IconButton type="button" sx={{ p: "10px" }} aria-label="search">
              <SearchIcon />
            </IconButton>
          </Paper>
          <Card sx={{ maxWidth: 400, textAlign: "center" }}>
            <CardMedia
              component="img"
              image="https://i.pinimg.com/736x/7b/4f/eb/7b4feb5598514b483db486d2c4f11a34.jpg"
              alt="Spongebob"
            />
            <CardContent>
              <Typography gutterBottom variant="h5" component="div">
                Welcome to Talender
              </Typography>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                Find Friends with the same interests
              </Typography>
            </CardContent>
          </Card>
          <Button variant="contained" onClick={handleClickModifyButton}>
            Modify your Interests and Skills
          </Button>
          <Button variant="contained" onClick={handleClickSwipeButton}>
            Swipe and Explore
          </Button>
        </Stack>
      </Box>
    </Container>
  );
};

export default Mainpage;
