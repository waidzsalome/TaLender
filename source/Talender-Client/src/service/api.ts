import request from "../service/request";

//profile page
// get userInfo, which will be shown at the right part of profile page
export const requestUserInfo = () => {
  return request.get(`/api/users/search-by-username/:attanasioluca02`);
};
//edit userinfo, when users want to change there basci info
export const updateUserInfo = (userInfo: object) => {
  return request.post(`/updateUsers`, userInfo);
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
export const requestMessageList = () => {};

//chatting with a  specific (right part of chat page)
export const requestChatsList = () => {};

//send message
export const sendMessage = () => {};

//how to receive?

//notification
// how to get immediate notification

//get the number of notification, the bagde of the bell
export const requestNotificationNum = () => {};

//get the notification list
export const requestNotificatioList = () => {};

//tailored page
//search with keywords and filter(by types)
export const requestSkillList = () => {};

//add my skills and interets
export const addMySkills = () => {};

// add skills which is not occured in our lists
export const addNewSkills = () => {};

// swipe page
//get userList to be matched
export const requestUnmatchedUserLists = () => {};
//like
export const likeUser = () => {};
//don't like
export const unLikeUser = () => {};
