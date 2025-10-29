import React, { useEffect, useState } from "react";
import { requestUserInfo, updateUserInfo } from "../service/api";
import {
  Container,
  Box,
  Grid,
  Avatar,
  Divider,
  List,
  ListItem,
  ListItemText,
  Typography,
  TextField,
  Chip,
  Button,
  FormControlLabel,
  Switch,
  // FormControl,
} from "@mui/material";
import { useNavigate } from "react-router";
import { userWei } from "./mock";

const Profilepage: React.FC = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState(Object);

  const handleClickEditButton = () => {
    return navigate("/tailoredpage");
  };
  const handleClickModifyButton = () => {
    console.log("click modify");
  };
  const handleClickLogoutButton = () => {
    console.log("click logout");
  };
  const handleClickDeleteButton = () => {
    console.log("click delete");
  };
  const handleClickConfirmButton = async () => {
    try {
      const { data } = await updateUserInfo({});
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };
  const getUserInfo = async () => {
    try {
      const { data } = await requestUserInfo();
      setUserInfo(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getUserInfo();
  }, [userInfo]);
  return (
    <Container sx={{ height: "90vh" }}>
      <Box>
        <Grid container spacing={1}>
          <Grid size={4}>
            <Box
              sx={{
                height: "90vh",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                alignItems: "center",
                p: 2,
              }}
            >
              <Box
                sx={{
                  width: "100%",
                  flex: "0 0 40%",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 2,
                }}
              >
                <Avatar
                  alt="User Avatar"
                  src="/static/images/avatar/1.jpg"
                  sx={{ width: 100, height: 100 }}
                />
                <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                  Wei Han
                </Typography>
                <Divider sx={{ width: "80%", my: 2 }} />
              </Box>
              <Box>
                <List sx={{ width: "100%" }}>
                  <ListItem alignItems="center">
                    <Button
                      variant="outlined"
                      onClick={handleClickModifyButton}
                    >
                      Modify my Profile
                    </Button>
                  </ListItem>
                  <ListItem>
                    <Button
                      variant="outlined"
                      onClick={handleClickLogoutButton}
                    >
                      Log out
                    </Button>
                  </ListItem>
                  <ListItem>
                    <ListItemText>
                      <Button
                        variant="outlined"
                        color="error"
                        onClick={handleClickDeleteButton}
                      >
                        Delete Account
                      </Button>
                    </ListItemText>
                  </ListItem>
                </List>
              </Box>
            </Box>
          </Grid>
          <Grid size={8}>
            <Box
              sx={{
                height: "90vh",
                overflowY: "auto",
                display: "flex",
                flexDirection: "column",
                p: 3,
                gap: 3,
              }}
            >
              {/* user information */}
              <Box>
                <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold" }}>
                  User Information
                </Typography>

                <Grid container spacing={2} alignItems="center">
                  {/* <FormControl> */}
                  <Grid size={4}>
                    <Typography>Name</Typography>
                  </Grid>
                  <Grid size={8}>
                    <TextField size="small" value="Weiiii" disabled fullWidth />
                  </Grid>

                  <Grid size={4}>
                    <Typography>Age</Typography>
                  </Grid>
                  <Grid size={8}>
                    <TextField size="small" value="26" disabled fullWidth />
                  </Grid>

                  <Grid size={4}>
                    <Typography>Location</Typography>
                  </Grid>
                  <Grid
                    size={8}
                    sx={{ display: "flex", alignItems: "center", gap: 1 }}
                  >
                    <TextField size="small" value="Roma, Italy" disabled />
                    <FormControlLabel
                      control={<Switch defaultChecked />}
                      label=""
                    />
                    <Button
                      variant="outlined"
                      onClick={handleClickConfirmButton}
                    >
                      Confirm
                    </Button>
                  </Grid>
                  {/* </FormControl> */}
                </Grid>
              </Box>

              <Divider />

              {/* Edit */}
              <Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    mb: 1,
                  }}
                >
                  <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                    My Interests
                  </Typography>
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={handleClickEditButton}
                  >
                    Edit
                  </Button>
                </Box>

                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                  {userWei.interestList.map((interest) => (
                    <Chip key={interest} label={interest} variant="outlined" />
                  ))}
                </Box>
              </Box>

              <Divider />

              <Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    mb: 1,
                  }}
                >
                  <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                    My Talents
                  </Typography>
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={handleClickEditButton}
                  >
                    Edit
                  </Button>
                </Box>

                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                  {userWei.talantsList.map((talent) => (
                    <Chip
                      key={talent}
                      label={talent}
                      variant="outlined"
                      color="primary"
                    />
                  ))}
                </Box>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default Profilepage;
