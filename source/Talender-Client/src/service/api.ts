import request from "../service/request";

export const requestUserInfo = () => {
  return request.get(`/api/users/search-by-username/:attanasioluca02`);
};

export const updateUserInfo = (userInfo: object) => {
  return request.post(`/updateUsers`, userInfo);
};

export const authGoogle = () => {
  return request.post("/login", {
    username: "lucatest",
    password: "supersecure123",
  });
};
