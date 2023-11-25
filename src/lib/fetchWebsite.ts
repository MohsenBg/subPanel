import axios from "axios";

const headers = {
  "User-Agent":
    "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
  Accept:
    "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8",
  "Accept-Encoding": "gzip, deflate, br",
  "Accept-Language": "en-US,en;q=0.9",
  Connection: "keep-alive",
  "Upgrade-Insecure-Requests": "1",
};

export async function getUserPanel(
  password: string,
  uuid: string
): Promise<string> {
  try {
    const response = await axios({
      url: `https://${process.env.URL}/${password}/${uuid}/`,
      method: "get",
      timeout: 10000,
      headers,
    });
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}

export async function getUserConfig(path: string): Promise<string> {
  console.log(`https://${process.env.URL}/${path}`);

  try {
    const response = await axios({
      url: `https://${process.env.URL}/${path}`,
      method: "get",
      timeout: 10000,
      headers,
    });
    return response.data;
  } catch (error) {
    console.error("Error:", error);
    throw error;
  }
}
