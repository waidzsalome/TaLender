import React, { useEffect } from "react";
import { useState } from "react";
import {
  Grid,
  Box,
  Container,
  List,
  ListItemButton,
  Divider,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Typography,
  Paper,
  AppBar,
  Toolbar,
  IconButton,
  TextField,
  Stack,
  ListItem,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import { userList, messageData } from "./mock";
import { requestMessageList, sendMessage } from "../service/api";

const ChatPage: React.FC = () => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [input, setInput] = useState(String || null);
  const [curChatUsename, setCurChatUsername] = useState(String || null);
  const [curUserID, setCurUserID] = useState<number | null>(null);

  const handleListItemClick = (index: number) => {
    setSelectedIndex(index);
    setCurChatUsername(userList[index].name);
  };
  const handleSend = async () => {
    //simulate data submission
    console.log(input);
    // setInput("");
    try {
      const data = await sendMessage(input);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    //simulate set current user
    requestMessageList();
    setCurUserID(1);
  }, []);
  return (
    <Container sx={{ height: "90vh" }}>
      <Box>
        <Grid container spacing={1}>
          <Grid size={4}>
            <Paper
              sx={{
                height: "90vh",
                overflowY: "auto",
                border: "1px solid #ddd",
                borderRadius: 2,
              }}
            >
              <List
                sx={{
                  width: "100%",
                  bgcolor: "background.paper",
                }}
              >
                {userList.map((user, index) => (
                  <div key={userList[index].id}>
                    {index !== 0 && <Divider variant="inset" component="li" />}
                    <ListItemButton
                      alignItems="flex-start"
                      selected={selectedIndex === index}
                      onClick={() => handleListItemClick(index)}
                    >
                      <ListItemAvatar>
                        <Avatar alt={user.username} src={user.avatarLink} />
                      </ListItemAvatar>
                      <ListItemText
                        primary={user.username}
                        secondary={
                          <React.Fragment>
                            <Typography
                              component="span"
                              variant="body2"
                              sx={{ color: "text.primary", display: "inline" }}
                            >
                              {user.lastesnews}
                            </Typography>
                          </React.Fragment>
                        }
                      />
                    </ListItemButton>
                  </div>
                ))}
              </List>
            </Paper>
          </Grid>
          <Grid size={8}>
            <Paper>
              {/* chatbar */}
              <AppBar position="static" color="transparent">
                <Toolbar
                  sx={{
                    height: "8vh",
                    alignItems: "center",
                  }}
                >
                  {curChatUsename && (
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 2,
                      }}
                    >
                      <IconButton sx={{ p: 0 }}>
                        <Avatar
                          alt={curChatUsename}
                          src="/static/images/avatar/2.jpg"
                        />
                      </IconButton>
                      <Typography variant="h6" sx={{ flexGrow: 1 }}>
                        {curChatUsename}
                      </Typography>
                    </Box>
                  )}
                </Toolbar>
              </AppBar>
              {/* chat content */}
              {!curChatUsename && (
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column", // 水平排列
                    alignItems: "center", // 垂直居中
                    justifyContent: "center", // 水平居中（Box 自身内容居中）
                    height: "60vh",
                    p: 2,
                    gap: 2,
                    color: "text.secondary",
                  }}
                >
                  <PersonAddAltIcon sx={{ fontSize: "3rem" }} />
                  <Typography>Click a person to chat</Typography>
                </Box>
              )}
              {curChatUsename && (
                <Box
                  sx={{
                    height: "60vh",
                    flexGrow: 1,
                    overflowY: "auto",
                    p: 2,
                    alignItems: "center",
                  }}
                >
                  (
                  <List
                    sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}
                  >
                    {messageData.map((m) => {
                      const isMe = m.senderID === curUserID;
                      return (
                        <ListItem
                          key={m.id}
                          disableGutters
                          sx={{
                            display: "flex",
                            justifyContent: isMe ? "flex-end" : "flex-start",
                          }}
                        >
                          <Stack
                            direction={isMe ? "row-reverse" : "row"}
                            alignItems="flex-end"
                            spacing={1}
                            sx={{ maxWidth: "80%" }}
                          >
                            <Avatar
                              alt={m.sender}
                              src={m.avatar}
                              sx={{ width: 32, height: 32 }}
                            />
                            <Stack spacing={0.5} sx={{ minWidth: 0 }}>
                              <Paper
                                elevation={0}
                                sx={{
                                  p: 1.25,
                                  px: 1.5,
                                  borderRadius: 3,
                                  bgcolor: isMe ? "primary.main" : "grey.100",
                                  color: isMe
                                    ? "primary.contrastText"
                                    : "text.primary",
                                  alignSelf: isMe ? "flex-end" : "flex-start",
                                  wordBreak: "break-word",
                                  whiteSpace: "pre-wrap",
                                }}
                              >
                                <Typography variant="body2">
                                  {m.context}
                                </Typography>
                              </Paper>

                              <Typography
                                variant="caption"
                                sx={{
                                  color: "text.secondary",
                                  alignSelf: isMe ? "flex-end" : "flex-start",
                                }}
                              >
                                {m.time}
                              </Typography>
                            </Stack>
                          </Stack>
                        </ListItem>
                      );
                    })}
                  </List>
                  )
                </Box>
              )}
              {/* chattext */}
              <Box
                sx={{
                  height: "22vh",
                  display: "flex",
                  p: 1,
                  borderTop: "1px solid #ddd",
                }}
              >
                <TextField
                  fullWidth
                  placeholder="Type a message here..."
                  multiline
                  rows={5}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                />
                <IconButton color="primary" onClick={handleSend}>
                  <SendIcon />
                </IconButton>
              </Box>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default ChatPage;
