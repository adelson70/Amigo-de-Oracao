import api from "./api";

export const getSalas = async () => {
  try {
    const response = await api.get("/sala/list");
    return response.data;
  } catch (error) {
    console.error("Error fetching rooms:", error);
    throw error;
  }
}

export const deleteSala = async (token) => {
  try {
    const response = await api.delete(`/sala/${token}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting room:", error);
    throw error;
  }
}

export const createSala = async (sala) => {
  try {
    const response = await api.post("/sala/create", sala);
    return response.data;
  } catch (error) {
    console.error("Error creating room:", error);
    throw error;
  }
}

export const getQrCodeSala = async (token) => {
  try {
    const response = await api.get(`/sala/qr-code/${token}`);
    return response.data
  } catch (error) {
    console.error("Error fetching QR code for room:", error);
    throw error;
  }
}