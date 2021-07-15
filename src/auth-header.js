export default function authHeader() {
  const user = JSON.parse(localStorage.getItem('visitor_counting_app_user'));

  if (user && user.accessToken) {
    return { 'x-access-token': user.accessToken };
  } else {
    return {};
  }
}