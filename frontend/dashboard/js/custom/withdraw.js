(function ($) {
  $(document).ready(function () {
    $("#deposit_form").on("submit", async function (e) {
      e.preventDefault();
      let form = $(this);

      let formData = {};
      form.serializeArray().forEach((item) => {
        formData[item.name] = item.value;
      });

      let btn = form.find("button[type='submit']");
      let originalText = btn.text();
      btn.text("Loading...").prop("disabled", true);
      const baseURL = window.general_data().url;
      try {
        console.log("formData", formData);
        window.successToast("Login successful!");
        form[0].reset();
      } catch (err) {
        console.error("Request failed:", err);
        window.errorToast("Login failed!");
      } finally {
        btn.text(originalText).prop("disabled", false);
      }
    });
  });
});
