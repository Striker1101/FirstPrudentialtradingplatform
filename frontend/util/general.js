function general_data() {
  const date = new Date();
  return {
    email: "support@firstprudentialtradingplatform.com",
    display_phone_number: "+17829071329",
    phone_number: "+17829071329",
    address: "Las Vegas United States.",
    date: `${date.toISOString()}`,
    name: "First Prudential Trading Platform",
    url: "https://admin.asskunya.com/api",
    owner_id: "1",
  };
}

function successToast(message, res) {
  const finalMsg = res?.response?.data?.message || message;
  Toastify({
    text: finalMsg,
    duration: 3000,
    close: true,
    gravity: "top",
    position: "right",
    backgroundColor: "#28a745", // green
  }).showToast();
}

function errorToast(message, err) {
  const finalMsg = err?.response?.data?.message || message;
  Toastify({
    text: finalMsg,
    duration: 3000,
    close: true,
    gravity: "top",
    position: "right",
    backgroundColor: "#dc3545", // red
  }).showToast();
}

function getUser() {
  return JSON.parse(localStorage.getItem("user"));
}
