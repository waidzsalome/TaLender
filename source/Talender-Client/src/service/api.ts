import request from "../service/request";

export const requestUserInfo = (userId: number) => {
  return request.post(`/users`, { userId });
};

export const updateUserInfo = (userInfo: object) => {
  return request.post(`/updateUsers`, userInfo);
};
