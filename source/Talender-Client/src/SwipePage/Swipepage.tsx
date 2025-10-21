import React from "react";
import {
  Container,
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Stack,
  Chip,
  Link,
  Divider,
  Button,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

const images = [
  {
    url: "https://i.pinimg.com/474x/e5/65/5f/e5655f7b5dc8a528247e66834a9b61b2.jpg",
    caption: "Pink Labubu",
  },
  {
    url: "https://i.pinimg.com/736x/90/83/0f/90830f4818ae6011ab79ef4b0348c5e8.jpg",
    caption: "Purple Labubu",
  },
  {
    url: "https://i.pinimg.com/474x/a5/b8/d5/a5b8d5d5f63c9ca63378ae8a91bd989b.jpg",
    caption: "Green Labubu",
  },
];
const skills = ["Eating", "Badmiinton", "Day Dreaming"];
const interests = ["Tennis", "Cooking", "Catch Fish"];
const Swipepage: React.FC = () => {
  return (
    <Container
      sx={{
        height: "90vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box>
        <Swiper
          modules={[Navigation]}
          navigation
          style={{ width: 500, height: "70vh" }}
        >
          {images.map((item, i) => (
            <SwiperSlide
              key={i}
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                height: "70vh",
              }}
            >
              <Card sx={{ maxWidth: 500, textAlign: "center" }}>
                <CardMedia
                  component="img"
                  image={item.url}
                  alt={item.caption}
                  sx={{
                    width: 400,
                    height: "20vh",
                    objectFit: "contain",
                    objectPosition: "center",
                  }}
                />
                <CardContent sx={{ height: "35vh" }}>
                  <Box sx={{ textAlign: "left", p: 2 }}>
                    {/* skills and interests */}
                    <Box
                      sx={{
                        height: "20vh",
                        overflowY: "auto",
                      }}
                    >
                      {/* Skills */}
                      <Stack
                        direction="row"
                        alignItems="center"
                        spacing={1}
                        sx={{ mb: 1 }}
                      >
                        <Chip
                          label="Skills :"
                          size="small"
                          sx={{
                            bgcolor: "orange",
                            color: "white",
                            fontWeight: "bold",
                            borderRadius: "6px",
                            boxShadow: 1,
                          }}
                        />
                      </Stack>

                      <Stack
                        direction="row"
                        flexWrap="wrap"
                        gap={1}
                        sx={{ mb: 2 }}
                      >
                        {skills.map((s) => (
                          <Chip
                            key={s}
                            label={s}
                            variant="outlined"
                            size="small"
                          />
                        ))}
                      </Stack>

                      {/* Interests */}
                      <Stack
                        direction="row"
                        alignItems="center"
                        spacing={1}
                        sx={{ mb: 1 }}
                      >
                        <Chip
                          label="Interests :"
                          size="small"
                          sx={{
                            bgcolor: "green",
                            color: "white",
                            fontWeight: "bold",
                            borderRadius: "6px",
                            boxShadow: 1,
                          }}
                        />
                      </Stack>

                      <Stack
                        direction="row"
                        flexWrap="wrap"
                        gap={1}
                        sx={{ mb: 3 }}
                      >
                        {interests.map((i) => (
                          <Chip
                            key={i}
                            label={i}
                            variant="outlined"
                            size="small"
                          />
                        ))}
                      </Stack>
                    </Box>
                    {/* Location and Report */}
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        mt: 2,
                        height: "5vh",
                      }}
                    >
                      <Stack direction="row" alignItems="center" spacing={1}>
                        <LocationOnIcon color="action" />
                        <Typography variant="body2">Roma, Italy</Typography>
                      </Stack>

                      <Link href="#" underline="hover" color="primary">
                        <Typography variant="caption">Report</Typography>
                      </Link>
                    </Box>
                    {/* yes and no */}
                    <Divider />
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: 2,
                        mt: 2,
                        height: "5vh",
                      }}
                    >
                      <Button variant="contained" color="error">
                        No
                      </Button>
                      <Button variant="contained" color="success">
                        yes
                      </Button>
                    </Box>
                  </Box>
                </CardContent>
              </Card>
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>
    </Container>
  );
};

export default Swipepage;
