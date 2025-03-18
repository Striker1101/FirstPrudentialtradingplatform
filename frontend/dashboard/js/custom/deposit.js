(function ($) {
  $(document).ready(function () {
    const handleSubmit = async function (e) {
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
        const res = await apiRequest.post(`${baseURL}/auth/login`, {
          amount: formData.amount,
        });
        window.successToast("Login successful!");
        form[0].reset();
      } catch (err) {
        console.error("Request failed:", err);
        window.errorToast("Login failed!");
      } finally {
        btn.text(originalText).prop("disabled", false);
      }
    };

    $("#deposit_form").on("submit", function (e) {
      handleSubmit.call(this, e);
    });
  });
})(jQuery);

console.log("here boy");
