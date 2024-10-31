import { jwtDecode } from "jwt-decode";
;

export function isAuthenticated() {
  return localStorage.getItem("token");
}

export function token_decoded() {
  if (!isAuthenticated()) {
    return false;
  }
  return jwtDecode(localStorage.getItem("token") || "");
}
