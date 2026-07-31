import API from "./api";

interface LoginData {
  email: string;
  password: string;
}

interface RegisterData {
  name: string;
  email: string;
  password: string;
}

export const loginUser = async (userData: LoginData) => {
  const response = await API.post("/auth/login", userData);
  return response.data;
};

export const registerUser = async (userData: RegisterData) => {
  const response = await API.post("/auth/register", userData);
  return response.data;
};