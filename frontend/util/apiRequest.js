// apiRequest.js
(function () {
  const baseURL = window.general_data().url;
  const token = localStorage.getItem("token");

  const defaultHeaders = {
    "Content-Type": "application/json",
    Authorization: token ? `Bearer ${token}` : "",
  };

  const axiosInstance = axios.create({
    baseURL,
    headers: defaultHeaders,
  });

  window.apiRequest = {
    get: (url, config = {}) => axiosInstance.get(url, config),
    post: (url, data, config = {}) => axiosInstance.post(url, data, config),
    put: (url, data, config = {}) => axiosInstance.put(url, data, config),
    delete: (url, config = {}) => axiosInstance.delete(url, config),
  };
})();
