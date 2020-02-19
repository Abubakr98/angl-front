export default {
  base: process.env.REACT_APP_BASE_URL || "http://localhost:3000/",
  localebase: "https://angl-server.herokuapp.com/",
  api: "api/v1.0/",
  refreshPassword: "auth/refresh-password/",
  emailVerify: "auth/email-verify/",
  remindPassword: "auth/token-refresh-password",
  signIn: "auth/signin",
  signUp: "auth/registration",
  users:"users/",
  study:"study/",
  groups: "groups"
};
