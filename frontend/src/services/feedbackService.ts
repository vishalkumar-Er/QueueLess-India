import API from "./api";

// ================= Submit Feedback =================
export const submitFeedback = async (message: string) => {
  const response = await API.post("/feedback", {
    message,
  });

  return response.data;
};