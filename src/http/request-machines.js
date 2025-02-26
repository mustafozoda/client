import axios from "axios";

export async function getMachines() {
  try {
    const response = await axios.get(import.meta.env.VITE_BASE_ULR);
    return response.data;
  } catch (error) {
    if (error.response) {
      const { status } = error.response;
      if (status === 400) {
        toast.error("Error: Invalid request. Please try again!");
      } else if (status === 404) {
        toast.error("Error: Product not found. Please check again!");
      } else if (status === 500) {
        toast.error("Error: Server issue. Please try again later.");
      } else {
        toast.error(`Error occurred: ${error.message}`);
      }
    } else {
      toast.error("Network error: Please check your internet connection!");
    }

    return [];
  }
}
