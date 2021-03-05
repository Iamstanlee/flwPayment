const BASE_URL =
  process.env.NODE_ENV === "production"
    ? "prod.env/api"
    : "http://localhost:8080/api";

const sendHttpRequest = async (method, endpoint, payload) => {
  try {
    if (method === "GET") {
      const response = await fetch(`${BASE_URL}${endpoint}`, {
        method: method,
        headers: {
          "Content-Type": "application/json",
        },
      });
      return await response.json();
    }
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: method,
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
    return await response.json();
  } catch (error) {
    return { status: "error", error };
  }
};

const get = async (endpoint) => await sendHttpRequest("GET", endpoint);
const post = async (endpoint, payload) =>
  await sendHttpRequest("POST", endpoint, payload);

export { post, get };
