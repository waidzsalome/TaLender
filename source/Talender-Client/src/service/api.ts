import request from "../service/request";
import type { User } from "../types/types";

// check if current user has a authenticated token
export const requestIsMe = () => {
  return request.get("");
};

//profile page
// get userInfo, which will be shown at the right part of profile page
export const requestUserInfo = () => {
  return request.get(`/api/user/search-by-id`);
};
//edit userinfo, when users want to change there basci info
export const updateUserInfo = (userInfo: object) => {
  return request.post(`/api/edit-user`, userInfo);
};
//??
export const authGoogle = () => {
  return request.post("/login", {
    username: "lucatest",
    password: "supersecure123",
  });
};

//delete account
// log out
export const requestLogOut = () => {};
//chatpage
// get userList(who chat with current user，left part of chat page)
export const requestMessageList = () => {
  return request.get("/api/chats/user");
};

//chatting with a  specific (right part of chat page)
export const requestChatsList = () => {};

//send message
export const sendMessage = (params: string) => {
  return request.post("/api/messages/send", params);
};

//how to receive?

//notification
// how to get immediate notification

//get the number of notification, the bagde of the bell
export const requestNotificationNum = () => {};

//get the notification list
export const requestNotificatioList = () => {};

//tailored page
//search with keywords and filter(by types)
export const requestSkillList = (params: object) => {
  return request.get("/api/skills", params);
};

//add my skills and interets
export const addMySkills = () => {};

// add skills which is not occured in our lists
export const addNewSkills = () => {};

// swipe page
//get userList to be matched
export const requestUnmatchedUserLists = () => {
  return request.get<User[]>("/api/recommendedUsers");
};
//like and unLike, called preference
export const userPreference = (params: object) => {
  return request.post("/api/user/preference", params);
};
