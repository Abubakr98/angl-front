import jwt_decode from "jwt-decode";

export const isAuthenticated = () => {
  let token = localStorage.getItem("userData");
  if (!token) {
    return false;
  }
  token = JSON.parse(localStorage.getItem("userData")).accessToken;
  const jwt = jwt_decode(token);
  return !(jwt.exp <= parseInt(`${Date.now() / 1000}`, 2));
};

export const getIdToken = () => {
  const token = JSON.parse(localStorage.getItem("userData")).accessToken;
  return token;
};
export const setUserData = idToken => {
  const token = localStorage.setItem("userData", JSON.stringify(idToken));
  return token;
};
export const login = () => {
  window.location.pathname = "/sign-in";
};
