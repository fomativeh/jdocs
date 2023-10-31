import axios from "axios";
import { SERVER_URL } from "../../constants/Backend_url"

export const fetchAllCategories = async () => {
    try {
        const response = await axios.get(
            `${SERVER_URL}/categories`,
            {
                headers: {
                    "Access-Control-Allow-Origin": "*",
                },
            }
        );
        return response;
    } catch (error) {
        return { success: false, error }
    }
};
