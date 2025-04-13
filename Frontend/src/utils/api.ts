const API_BASE_URL = "http://localhost:8000";

// Authentication Endpoints
export const login = (data: { email: string; password: string }) =>
  fetch(`${API_BASE_URL}/auth/login.php`, {
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
  fetch(`${API_BASE_URL}/auth/register.php`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

export const getUserProfile = () =>
  fetch(`${API_BASE_URL}/auth/profile.php`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

// Customer Endpoints
export const createParcel = (data: {
  sender_id: number;
  pickupAddress: string;
  deliveryAddress: string;
  recipientName: string;
  recipientPhone: string;
  weight: number;
  dimensions: string;
  description: string;
}) =>
  fetch(`${API_BASE_URL}/customer/create_parcel.php`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(data),
  });

export const getCustomerParcels = (sender_id: number) =>
  fetch(`${API_BASE_URL}/customer/get_parcels.php?sender_id=${sender_id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

export const trackParcel = (trackingId: string) =>
  fetch(`${API_BASE_URL}/customer/track_parcel.php?tracking_id=${trackingId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

// Courier Endpoints
export const getAvailableParcels = () =>
  fetch(`${API_BASE_URL}/courier/available_parcels.php`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

export const acceptParcel = (parcelId: string) =>
  fetch(`${API_BASE_URL}/courier/accept_parcel.php`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify({ parcel_id: parcelId }),
  });

export const updateParcelStatus = (parcelId: string, status: string) =>
  fetch(`${API_BASE_URL}/courier/update_parcel.php`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify({ status }),
  });

// Admin Endpoints
export const getAllUsers = () =>
  fetch(`${API_BASE_URL}/admin/get_users.php`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

export const getAllParcels = () =>
  fetch(`${API_BASE_URL}/admin/get_parcels.php`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

export const toggleUserStatus = (userId: string) =>
  fetch(`${API_BASE_URL}/admin/toggle_user.php`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify({ user_id: userId }),
  });

// Helper to handle response
export const handleApiResponse = async (response: Response) => {
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "An error occurred");
  }

  return data;
};
