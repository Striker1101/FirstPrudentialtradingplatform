// apiRequest.js
(function () {
  const baseURL = window.general_data().url;
  const token = localStorage.getItem("token");

  const axiosInstance = axios.create({
    baseURL,
    headers: {
      Authorization: token ? `Bearer ${token}` : "",
    },
  });

  window.apiRequest = {
    get: (url, config = {}) => axiosInstance.get(url, config),
    post: (url, data, config = {}) => axiosInstance.post(url, data, config),
    put: (url, data, config = {}) => axiosInstance.put(url, data, config),
    delete: (url, config = {}) => axiosInstance.delete(url, config),
  };
})();
