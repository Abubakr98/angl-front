import jwt_decode from "jwt-decode";

export const isAuthenticated = () => {
  let token = localStorage.getItem("userData");
  if (!token) {
    return false;
  }
  token = JSON.parse(localStorage.getItem("userData")).accessToken;
  const jwt = jwt_decode(token);
  // console.log(!(jwt.exp - 60000 < Date.now() / 1000));
  return !(jwt.exp < Date.now() / 1000);
};
export const signOut = () => {
  let token = localStorage.getItem("userData");
  if (!token) {
    return false;
  }
  localStorage.removeItem("userData");
  login();
};

export const getIdToken = () => {
  const token = JSON.parse(localStorage.getItem("userData")).accessToken;
  return token;
};
export const setUserData = userData => {
  localStorage.removeItem("userData");
   localStorage.setItem("userData", JSON.stringify(userData));
};
export const getUserData = () => {
  const user = JSON.parse(localStorage.getItem("userData"));
  return user;
};
export const login = () => {
  window.location.pathname = "/sign-in";
};
