export const API_BASE_URL = "http://127.0.0.1:8000";

export const apiFetch = async (url, options = {}) => {
  let accessToken = localStorage.getItem("accessToken");

  const makeRequest = async (token) => {
    const headers = new Headers(options.headers || {});

   if (token) {
  headers.set("Authorization", `Bearer ${token}`);
}

console.log("Request URL:", url);
console.log("Authorization:", headers.get("Authorization"));

    return fetch(url, {
      ...options,
      headers,
    });
  };

  let response = await makeRequest(accessToken);

  // Access token expired
  if (response.status === 401) {
    const refreshToken = localStorage.getItem("refreshToken");

    if (!refreshToken) {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("user");

      window.location.href = "/login";
      return response;
    }

    const refreshResponse = await fetch(
      `${API_BASE_URL}/api/token/refresh/`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          refresh: refreshToken,
        }),
      }
    );

    if (!refreshResponse.ok) {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("user");

      window.location.href = "/login";
      return response;
    }

    const refreshData = await refreshResponse.json();

    accessToken = refreshData.access;

    localStorage.setItem("accessToken", accessToken);

    // Retry original request with new token
    response = await makeRequest(accessToken);
  }

  return response;
};