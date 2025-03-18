(function ($) {
  $(document).ready(function () {
    $("#registration_form").on("submit", async function (e) {
      e.preventDefault();

      let form = $(this);
      const passwordInput = $('input[name="password"]');
      const cpasswordInput = $('input[name="cpass"]');
      const password = passwordInput.val();
      const cpassword = cpasswordInput.val();

      passwordInput.css("border-color", "");
      cpasswordInput.css("border-color", "");

      if (password !== cpassword) {
        cpasswordInput.val("").css("border-color", "red");
        window.errorToast("Password and confirm password must be the same!");
        return;
      }

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
      delete formData.cpass;

      let btn = form.find("button[type='submit']");
      let originalText = btn.text();
      btn.text("Registering...").prop("disabled", true);
      const baseURL = window.general_data().url;
      try {
        const res = await apiRequest.post(`${baseURL}/auth/register`, formData);
        window.successToast("Registration successful!");
        form[0].reset();
        setTimeout(() => {
          window.location.href = "./login.html";
        }, 3000);
      } catch (err) {
        console.error("Request failed:", err);
        window.errorToast("Registration failed!");
      } finally {
        btn.text(originalText).prop("disabled", false);
      }
    });
  });
})(jQuery);
