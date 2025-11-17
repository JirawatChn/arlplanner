import axios from "axios";

type ApiError = {
  status?: number;
  response?: { status?: number };
  message?: string;
};

export function isApiError(error: unknown): error is ApiError {
  return (
    typeof error === "object" &&
    error !== null &&
    ("status" in error || "response" in error)
  );
}

const API_URL = "http://localhost:8000/api/predict/";

export const fetchPredictions = async ({ station, date, hour }) => {
  try {
    const response = await axios.post(`${API_URL}predictions`, {
      station,
      date,
      hour,
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching prediction:", error);
    throw error;
  }
};

export const fetchRecommendation = async ({ station, date }) => {
  try {
    const response = await axios.post(`${API_URL}recommendation`, {
      station,
      date,
    });
    return response.data
  } catch (error) {
    console.error("Error fetching prediction:", error);
    throw error;
  }
};

export const threedaysPrediction = async ({ date }: { date: string }) => {
  try {
    const response = await axios.post(`${API_URL}3days`, { date });
    return response;
  } catch (error) {
    console.error("Error fetching prediction:", error);
    throw error;
  }
};
