export const saveToken = (token: string) => {
  localStorage.setItem("sakhi_token", token);
};

export const getToken = () => {
  return localStorage.getItem("sakhi_token");
};

export const removeToken = () => {
  localStorage.removeItem("sakhi_token");
};