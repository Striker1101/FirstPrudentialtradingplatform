const _user = window.getUser();
(function ($) {
  $(document).ready(function () {
    populateUserContent(_user);
    paintContent();
  });
})(jQuery);

async function paintContent() {
  try {
    const baseURL = window.general_data().url;
    const res = await apiRequest.get(`${baseURL}/user/${_user.id}`);
    const user = res.data;
    populateUserContent(user); // 👈 Call populate here
  } catch (err) {
    console.error("Error fetching user data", err);
  }
}

// 🔥 Populate HTML content by class names
function populateUserContent(user) {
  const mappings = {
    account_currency: user.currency_symbol || "",
    account_balance: user.account?.balance || "0.00",
    account_deposit: user.account?.bonus || "0.00",
    account_earn: user.account?.earning || "0.00",
    account_type: user.account?.account_stage || "",
    is_kyc_verification: user.kyc_info?.verified ? "Verified" : "Not Verified",
    is_auto_trade_active: user.account?.trade ? true : false,
    account_email: user.email || "",
    account_status: user.account.account_type,
    trading_date: user.account?.trade_changed_at
      ? new Date(user.account?.trade_changed_at).toUTCString()
      : "Null",
    footer_year: new Date().getFullYear(),
    user_name: user.name || "",
  };

  // Loop through mappings and populate matching class elements
  Object.entries(mappings).forEach(([key, value]) => {
    const elements = document.querySelectorAll(`.${key}`);
    elements.forEach((el) => {
      el.textContent = value;
    });
  });
}
