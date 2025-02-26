import axios from "axios";
const API_URL = import.meta.env.VITE_BASE_URL;
export async function getMachines() {

  try {
    const response = await axios.get(API_URL + "/machines");
    return response.data;
  } catch (error) {
    if (error.response) {
      const { status } = error.response;
      if (status === 400) {
        console.error("Error: Invalid request. Please try again!");
      } else if (status === 404) {
        console.error("Error: Product not found. Please check again!");
      } else if (status === 500) {
        console.error("Error: Server issue. Please try again later.");
      } else {
        console.error(`Error occurred: ${error.message}`);
      }
    } else {
      console.error("Network error: Please check your internet connection!");
    }

    return [];
  }
}
