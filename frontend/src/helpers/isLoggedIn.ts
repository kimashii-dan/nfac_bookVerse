export default function isLoggedIn() {
  const accessToken = localStorage.getItem("access");
  if (!accessToken) {
    return false;
  } else {
    return true;
  }
}
