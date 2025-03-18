(function ($) {
  $(document).ready(function () {
    $("#login_form").on("submit", async function (e) {
      e.preventDefault();

      let form = $(this);
      const passwordInput = $('input[name="password"]');
      const password = passwordInput.val();

      passwordInput.css("border-color", "");

      if (password.length < 8) {
        passwordInput.css("border-color", "red");
        window.errorToast("Password must be at least 8 characters long!");
        return;
      }

      // Build clean object instead of form.serialize()
      let formData = {};
      form.serializeArray().forEach((item) => {
        formData[item.name] = item.value;
      });

      let btn = form.find("button[type='submit']");
      let originalText = btn.text();
      btn.text("Loading...").prop("disabled", true);
      const baseURL = window.general_data().url;
      try {
        const res = await apiRequest.post(`${baseURL}/auth/login`, formData);
        window.successToast("Login successful!");
        form[0].reset();
        localStorage.setItem(
          "token",
          res.data.access_token.original.access_token
        );
        localStorage.setItem("user", JSON.stringify(res.data.user));
        setTimeout(() => {
          window.location.href = "./dashboard/index.html";
        }, 3000);
      } catch (err) {
        console.error("Request failed:", err);
        window.errorToast("Login failed!");
      } finally {
        btn.text(originalText).prop("disabled", false);
      }
    });
  });
})(jQuery);
