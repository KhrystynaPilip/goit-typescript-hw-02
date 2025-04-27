import axios from "axios";
import { ImageDataType } from "./commonTypes";

const ACCESS_KEY = "O16h2LLLiG7M7l96QwWTuuM3iMLqdiuzGJMyO-o4xiM";
axios.defaults.baseURL = "https://api.unsplash.com";

type ImagesByQuery = {
  results: ImageDataType[];
  total: number;
  total_pages: number;
};

export const fetchImagesByQuery = async (
  query: string,
  page: number
): Promise<ImagesByQuery> => {
  const response = await axios.get("/search/photos", {
    params: {
      client_id: ACCESS_KEY,
      query,
      page,
      per_page: 15,
      orientation: "landscape",
    },
  });
  return response.data;
};

export const getDownloadLink = async (link: string): Promise<string> => {
  const response = await axios.get(link, { params: { client_id: ACCESS_KEY } });
  return response.data.url;
};
