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
} from "@mui/material";
import { useNavigate } from "react-router";
import { userWei } from "./mock";

const Profilepage: React.FC = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({
    name: "Weiiii",
    age: 26,
    location: "Roma, Italy",
    isPublic: true,
  });
  const [editable, seteditable] = useState(false);

  const handleClickEditButton = () => {
    return navigate("/tailoredpage");
  };
  const handleClickModifyButton = () => {
    console.log("click modify");
    seteditable(!editable);
  };
  const handleClickLogoutButton = () => {
    console.log("click logout");
  };
  const handleClickDeleteButton = () => {
    console.log("click delete");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", userInfo);
  };
  const handleChange =
    (field: keyof typeof userInfo) =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value =
        field === "isPublic" ? event.target.checked : event.target.value;
      setUserInfo((prev) => ({ ...prev, [field]: value }));
      // console.log({ ...userInfo, [field]: value });
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
  }, []);
  return (
    <Container sx={{ height: "90vh" }}>
      <Box>
        <Grid container spacing={1}>
          {/* left part of profilepage */}
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
          {/* right part of profilepage */}
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
              <Box component="form" onSubmit={handleSubmit}>
                <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold" }}>
                  User Information
                </Typography>
                {editable ? (
                  <Grid container spacing={2} alignItems="center">
                    {/* Name */}
                    <Grid size={4}>
                      <Typography>Name</Typography>
                    </Grid>
                    <Grid size={8}>
                      <TextField
                        size="small"
                        value={userInfo.name}
                        fullWidth
                        onChange={handleChange("name")}
                      />
                    </Grid>

                    {/* Age */}
                    <Grid size={4}>
                      <Typography>Age</Typography>
                    </Grid>
                    <Grid size={8}>
                      <TextField
                        size="small"
                        type="number"
                        value={userInfo.age}
                        fullWidth
                        onChange={handleChange("age")}
                      />
                    </Grid>

                    {/* Location + switch + button */}
                    <Grid size={4}>
                      <Typography>Location</Typography>
                    </Grid>
                    <Grid
                      size={6}
                      sx={{ display: "flex", alignItems: "center", gap: 1 }}
                    >
                      <TextField
                        size="small"
                        value={userInfo.location}
                        fullWidth
                        onChange={handleChange("location")}
                      />
                      <FormControlLabel
                        control={
                          <Switch
                            checked={userInfo.isPublic}
                            onChange={handleChange("isPublic")}
                          />
                        }
                        label="Public"
                      />
                    </Grid>

                    {/* Submit button */}
                    <Grid size={2} sx={{ textAlign: "right" }}>
                      <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        onClick={handleClickConfirmButton}
                        size="small"
                      >
                        Confirm
                      </Button>
                    </Grid>
                  </Grid>
                ) : (
                  <Grid container spacing={2} alignItems="center">
                    {/* Name */}
                    <Grid size={4}>
                      <Typography>Name</Typography>
                    </Grid>
                    <Grid size={8}>
                      <Typography>{userInfo.name}</Typography>
                    </Grid>

                    {/* Age */}
                    <Grid size={4}>
                      <Typography>Age</Typography>
                    </Grid>
                    <Grid size={8}>
                      <Typography>{userInfo.age}</Typography>
                    </Grid>

                    {/* Location */}
                    <Grid size={4}>
                      <Typography>Location</Typography>
                    </Grid>
                    <Grid
                      size={8}
                      sx={{ display: "flex", alignItems: "center", gap: 1 }}
                    >
                      <Typography>{userInfo.location}</Typography>
                      <FormControlLabel
                        control={
                          <Switch checked={userInfo.isPublic} disabled />
                        }
                        label="Public"
                      />
                    </Grid>
                  </Grid>
                )}
              </Box>
              <Divider />
              {/* My interest and skills Edit */}
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
