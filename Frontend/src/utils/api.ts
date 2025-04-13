const API_BASE_URL = "http://localhost:8000/auth";

// Authentication Endpoints
export const login = (data: { email: string; password: string }) =>
  fetch(`${API_BASE_URL}/login.php`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

export const register = (data: {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: "customer" | "courier" | "admin";
}) =>
  fetch(`${API_BASE_URL}/register.php`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

export const getUserProfile = () =>
  fetch("{{API_GET_USER_PROFILE}}", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

// Customer Endpoints
export const createParcel = (data: {
  pickupAddress: string;
  deliveryAddress: string;
  weight: number;
  dimensions: string;
  description: string;
}) =>
  fetch("{{API_CREATE_PARCEL}}", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(data),
  });

export const getCustomerParcels = () =>
  fetch("{{API_GET_CUSTOMER_PARCELS}}", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

export const trackParcel = (trackingId: string) =>
  fetch(`{{API_TRACK_PARCEL}}/${trackingId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

// Courier Endpoints
export const getAvailableParcels = () =>
  fetch("{{API_GET_AVAILABLE_PARCELS}}", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

export const acceptParcel = (parcelId: string) =>
  fetch(`{{API_ACCEPT_PARCEL}}/${parcelId}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

export const updateParcelStatus = (parcelId: string, status: string) =>
  fetch(`{{API_UPDATE_PARCEL_STATUS}}/${parcelId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify({ status }),
  });

// Admin Endpoints
export const getAllUsers = () =>
  fetch("{{API_GET_ALL_USERS}}", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

export const getAllParcels = () =>
  fetch("{{API_GET_ALL_PARCELS}}", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

export const toggleUserStatus = (userId: string) =>
  fetch(`{{API_TOGGLE_USER_STATUS}}/${userId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

// Helper to handle response
export const handleApiResponse = async (response: Response) => {
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "An error occurred");
  }

  return data;
};
