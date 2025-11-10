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

//delete account
export const deleteAccount = () => {
  return request.post("/api/delete-user");
};
// log out
export const requestLogOut = () => {
  return request.post("/api/logout");
};
//chatpage
// get userList(who chat with current user，left part of chat page)
export const requestMessageList = () => {
  return request.get("/api/chats/user");
};

//chatting with a  specific (right part of chat page)
export const requestChatsList = (chatId: string) => {
  return request.get(`/api/messages?chatId=${chatId}`);
};

//tailored page
//search with keywords and filter(by types)
export const requestSkillList = (params: {
  keywords?: string;
  filter?: string;
}) => {
  const query: Record<string, string> = {};

  if (params.keywords) query.keywords = params.keywords;
  if (params.filter) query.filter = params.filter;

  return request.get("/api/categories-with-skills", { params: query });
};

export const getCategories = () => {
  return request.get("/api/categories");
};
//add my skills and interets
export const addMySkills = (params: object) => {
  return request.post("/api/user-skills/add", params);
};

// add skills which is not occured in our lists
export const addNewSkills = (params: object) => {
  return request.post("/api/skills/add", params);
};

// swipe page
//get userList to be matched
export const requestUnmatchedUserLists = () => {
  return request.get<User[]>("/api/recommendedUsers");
};
//like and unLike, called preference
export const userPreference = (params: object) => {
  return request.post("/api/user/preference", params);
};
//notification
// how to get immediate notification

//get the number of notification, the bagde of the bell
export const requestNotificationNum = () => {};

//get the notification list
export const requestNotificatioList = () => {};
