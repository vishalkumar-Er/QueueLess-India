import API from "./api";

// ================= Dashboard =================
export const getDashboardStats = async () => {
  const response = await API.get("/admin/dashboard");
  return response.data;
};

// ================= Recent Queues =================
export const getRecentQueues = async () => {
  const response = await API.get("/admin/recent-queues");
  return response.data;
};

// ================= Get All Queues =================
export const getAllQueues = async (
  search: string = "",
  page: number = 1
) => {
  const response = await API.get(
    `/queues?search=${search}&page=${page}`
  );

  return response.data;
};

// ================= Update Queue Status =================
export const updateQueueStatus = async (
  id: string,
  status: string
) => {
  const response = await API.put(`/queues/${id}`, {
    status,
  });

  return response.data;
};

// ================= Delete Queue =================
export const deleteQueue = async (id: string) => {
  const response = await API.delete(`/queues/${id}`);

  return response.data;
};

// ================= Call Next Token =================
export const callNextToken = async (
  department: string
) => {
  const response = await API.put(
    "/queues/call-next",
    {
      department,
    }
  );

  return response.data;
};