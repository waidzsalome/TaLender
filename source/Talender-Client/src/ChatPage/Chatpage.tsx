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
import { requestMessageList, requestChatsList } from "../service/api";
import type { Chat, Message } from "../types/types";
import socket from "./socket";

const ChatPage: React.FC = () => {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [input, setInput] = useState(String || null);
  const [chatUserList, setchatUserList] = useState<Chat[]>();
  const [curUserID, setCurUserID] = useState<string>("");
  // chat with who
  const [curChatUsename, setCurChatUsername] = useState<string>("");
  const [curChatPartnerID, setCurChatPaternerID] = useState<string>("");
  const [curChatID, setCurChatID] = useState<string>("");
  const [curChatAvatarLink, setCurChatAvatarLink] = useState<string>("");
  const [historyMessageList, setHistoryMessageList] = useState<Message[]>([]);

  const fetchChatUserList = async () => {
    try {
      const data = await requestMessageList();
      console.log(data);
      // @ts-expect-error: text
      setchatUserList(data?.chats as unknown as Chat[]);
      // @ts-expect-error: text
      console.log("test", data?.chats?.[0]?.curUser?.id);
      // @ts-expect-error: text
      setCurUserID(data?.chats?.[0]?.curUser?.id as un as string);
    } catch (error) {
      console.log(error);
    }
  };
  const handleListItemClick = (
    index: number,
    chatID: string,
    username: string,
    avatarLink: string,
    chatParterID: string
  ) => {
    setSelectedIndex(index);
    setCurChatUsername(username);
    setCurChatID(chatID);
    setCurChatAvatarLink(avatarLink);
    setCurChatPaternerID(chatParterID);
  };
  const fetchHistoryMessageList = async () => {
    try {
      const data = await requestChatsList(curChatID);
      console.log(data);
      setHistoryMessageList(data as unknown as Message[]);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSend = () => {
    console.log("sendMessage");
    // if (!input.trim()) return;
    const messageData = {
      chatId: curChatID,
      senderId: curUserID,
      text: input,
    };
    console.log("🚀 Sending message:", messageData);
    socket.emit("sendMessage", messageData);

    setInput("");
  };
  useEffect(() => {
    fetchHistoryMessageList();
  }, [curChatID]);
  useEffect(() => {
    socket.emit("joinChat", curChatID);

    // 监听服务器新消息
    socket.on("newMessage", (msg) => {
      console.log("💬 Received new message:", msg);
      setHistoryMessageList((prev) => [...prev, msg]);
    });

    return () => {
      socket.emit("leaveChat", curChatID);
      socket.off("newMessage");
    };
  }, [curChatID]);

  useEffect(() => {
    fetchChatUserList();
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
                {chatUserList?.map((user, index) => (
                  <div key={user.chatId}>
                    {index !== 0 && <Divider variant="inset" component="li" />}
                    <ListItemButton
                      alignItems="flex-start"
                      selected={selectedIndex === index}
                      onClick={() =>
                        handleListItemClick(
                          index,
                          user?.chatId,
                          user?.chatPartner?.username,
                          user?.chatPartner?.avatarLink,
                          user?.chatPartner?.id
                        )
                      }
                    >
                      <ListItemAvatar>
                        <Avatar
                          alt={user?.chatPartner?.username}
                          src={user?.chatPartner?.avatarLink}
                        />
                      </ListItemAvatar>
                      <ListItemText
                        primary={user?.chatPartner?.username}
                        secondary={
                          <React.Fragment>
                            <Typography
                              component="span"
                              variant="body2"
                              sx={{ color: "text.primary", display: "inline" }}
                            >
                              {user.lastMessage.text}
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
                        <Avatar alt={curChatUsename} src={curChatAvatarLink} />
                      </IconButton>
                      <Typography variant="h6" sx={{ flexGrow: 1 }}>
                        {curChatUsename}
                      </Typography>
                    </Box>
                  )}
                </Toolbar>
              </AppBar>
              {/* chat content */}
              {!curChatID && (
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
                  <List
                    sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}
                  >
                    {historyMessageList?.map((m) => {
                      const isMe = m?.senderId !== curChatPartnerID;
                      return (
                        <ListItem
                          key={m._id}
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
                              alt={m?.senderId}
                              src={m?.senderId}
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
                                  {m?.text}
                                </Typography>
                              </Paper>

                              <Typography
                                variant="caption"
                                sx={{
                                  color: "text.secondary",
                                  alignSelf: isMe ? "flex-end" : "flex-start",
                                }}
                              >
                                {m.createdAt}
                              </Typography>
                            </Stack>
                          </Stack>
                        </ListItem>
                      );
                    })}
                  </List>
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
                <IconButton color="primary" onClick={() => handleSend()}>
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
