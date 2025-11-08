import React, { useEffect, useState, useRef } from "react";
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
import "swiper/css";
import "swiper/css/navigation";
import { requestUnmatchedUserLists, userPreference } from "../service/api";
import type { User } from "../types/types";
import { useNavigate } from "react-router";
import { Swiper as SwiperType } from "swiper";
// import { mockList } from "./types";

const Swipepage: React.FC = () => {
  const navigate = useNavigate();
  const [userList, setUserList] = useState<User[]>([]);
  const swiperRef = useRef<SwiperType>(null);
  // const [curUnmatchedUID, setCurUnmatchedUID] = useState();
  const handleClickYes = async (toUserId: string) => {
    console.log("click yes", toUserId);
    try {
      const res = await userPreference({
        toUserId: toUserId,
        value: 1,
      });
      console.log(res);
      swiperRef.current?.slideNext();
    } catch (error) {
      console.log(error);
    }
  };
  const handleClickNo = async (toUserId: string) => {
    console.log("click no", toUserId);
    try {
      const res = await userPreference({
        toUserId: toUserId,
        value: -1,
      });
      console.log(res);
      swiperRef.current?.slideNext();
    } catch (error) {
      console.log(error);
    }
  };
  const fetchUnmatchedUserList = async () => {
    try {
      const res = await requestUnmatchedUserLists();
      console.log(res);
      // setUserList([...(res as unknown as User[]), ...mockList]);
      setUserList(res as unknown as User[]);
    } catch (error) {
      console.log("swipePage", error);
      return navigate("/loginrequired");
    }
  };
  useEffect(() => {
    fetchUnmatchedUserList();
  }, []);
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
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          style={{ width: 500, height: "70vh" }}
        >
          {userList?.map((item, i) => (
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
                  image={item?.avatarLink}
                  alt={item?.last_name}
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
                        {item?.skills?.map((s) => (
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
                        {item?.interests.map((i) => (
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
                        <Typography variant="body2">
                          {item.sharedLocation ? item.location : null}
                        </Typography>
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
                      <Button
                        variant="contained"
                        color="error"
                        onClick={() => handleClickNo(item.id)}
                      >
                        No
                      </Button>
                      <Button
                        variant="contained"
                        color="success"
                        onClick={() => handleClickYes(item.id)}
                      >
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
