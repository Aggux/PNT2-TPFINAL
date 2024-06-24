import axiosInstance from "@/axios.js";

const URL = "https://66773a9e145714a1bd742a35.mockapi.io/CuponesGuardados";

export async function getCuponesGuardados() {
  try {
    const { data: cuponesGuardados } = await axiosInstance.get(URL);
    return cuponesGuardados;
  } catch (error) {
    console.error("Error al obtener cuponesGuardados:", error);
    return [];
  }
}

export async function createCuponesGuardados(cuponesGuardados) {
  try {
    const { data } = await axiosInstance.post(URL, cuponesGuardados);
    return data;
  } catch (error) {
    console.error("Error al crear cuponesGuardados:", error);
    throw error;
  }
}

export async function updateCuponesGuardados(id, cuponesGuardados) {
  try {
    const { data } = await axiosInstance.put(`${URL}/${id}`, cuponesGuardados);
    return data;
  } catch (error) {
    console.error("Error al actualizar cuponesGuardados:", error);
    throw error;
  }
}
