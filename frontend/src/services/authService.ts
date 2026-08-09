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

  interface QueueData {
  department: string;
}

export const createQueue = async (
  queueData: QueueData
) => {
  const response = await API.post(
    "/queues",
    queueData
  );

  return response.data;
};

export const getMyQueues = async () => {
  const response = await API.get("/queues/my");
  return response.data;
};

export const getQueuePosition = async (
  id: string
) => {
  const response = await API.get(
    `/queues/position/${id}`
  );

  return response.data;
};

export const getEstimatedTime = async (
  id: string
) => {
  const response = await API.get(
    `/queues/estimated-time/${id}`
  );

  return response.data;
};

export const getQueueHistory = async () => {
  const response = await API.get("/queues/history");
  return response.data;
};