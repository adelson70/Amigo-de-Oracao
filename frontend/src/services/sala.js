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
    const response = await api.get(`/sala/qr-code/${token}`, {
      responseType: 'blob'
    });
    const blob = response.data;
    const url = URL.createObjectURL(blob);
    return url;
  } catch (error) {
    console.error("Error fetching QR code for room:", error);
    throw error;
  }
}

export const verifyTokenSala = async (token) => {
  try {
    const response = await api.get(`/sala/verify-token/${token}`);
    return response.data;
  } catch (error) {
    console.error("Error verifying room token:", error);
    throw error;
  }
}

export const enterSala = async (data) => {
  try {
    const response = await api.post(`/sala/join`, data);
    return response.data;
  } catch (error) {
    console.error("Error entering room:", error);
    throw error;
  }
}

export const isParticipante = async () => {
  try {
    const response = await api.get(`/sala/is-participante`);
    return response.data;
  } catch (error) {
    console.error("Error checking if participant exists:", error);
    throw error;
  }
}

export const listarParticipantes = async (token) => {
  try {
    const response = await api.get(`/sala/participantes/${token}`);
    return response.data;
  } catch (error) {
    console.error("Error listing participants:", error);
    throw error;
  }
}

export const sortearParticipante = async (token) => {
  try {
    const response = await api.post(`/sala/sorteio`, { token });
    return response.data;
  } catch (error) {
    console.error("Error drawing participant:", error);
    throw error;
  }
}

export const revelacaoParticipante = async (token) => {
  try {
    const response = await api.get(`/sala/sorteio/${token}`);
    return response.data;
  } catch (error) {
    console.error("Error revealing participant:", error);
    throw error;
  }
}