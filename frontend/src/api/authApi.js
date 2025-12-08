import axiosClient from './axios.js';


export const signup = async (data) => {
  const res = await axiosClient.post("/auth/signup", data);
  const { token, user } = res.data;
  localStorage.setItem("token", token);
  localStorage.setItem("user", JSON.stringify(user));
  return user;
};




export const login = async (data) => {
    const res= await axiosClient.post('/auth/login', data);
    const { token, user } = res.data;
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    return user;
}

export const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/login";
};
