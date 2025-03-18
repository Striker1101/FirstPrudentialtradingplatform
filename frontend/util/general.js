function general_data() {
  const date = new Date();
  return {
    email: "support@fegure.com",
    display_phone_number: "0492 323 233",
    phone_number: "0903232334",
    address: "no 445 new area new city",
    date: `${date.toISOString()}`,
    name: "First Prudential Trading Platform",
    url: "http://127.0.0.1:8000/api",
    owner_id: "1",
  };
}

function successToast(message) {
  Toastify({
    text: message,
    duration: 3000,
    close: true,
    gravity: "top",
    position: "right",
    backgroundColor: "#28a745", // green
  }).showToast();
}

function errorToast(message) {
  Toastify({
    text: message,
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
