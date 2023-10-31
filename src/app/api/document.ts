import axios from "axios";
import { SERVER_URL } from "../../constants/Backend_url"

export const fetchAllDocs = async () => {
    try {
        const response = await axios.get(
            `${SERVER_URL}/docs`,
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

export const addDoc = async ({title, category}: { title: string, category: string }) => {
    try {
        const response = await axios.post(
            `${SERVER_URL}/docs`,
            { title:title, category:category },
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