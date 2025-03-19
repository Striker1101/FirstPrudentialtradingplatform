(function ($) {
  $(document).ready(function () {
    const user_avatar = $("#user_avatar");
    const user = window.getUser();

    // Set Avatar Image
    if (user_avatar)
      user_avatar.prop(
        "src",
        user?.image_url ? user.image_url : "../dashboard/images/dummy.png"
      );

    // Set user_id automatically in hidden input
    $("#user_id").val(user?.id || "");

    // KYC Form Submission Handling
    $("#kyc_form").on("submit", function (e) {
      e.preventDefault();

      const formData = new FormData(this); // Collect all form fields including files
      //   let form = $(this);
      //   let formData = {};
      //   form.serializeArray().forEach((item) => {
      //     formData[item.name] = item.value;
      //   });

      apiRequest
        .post("/kyc_info", formData)
        .then((res) => {
          window.successToast("KYC Upload was Successful", res);
          $("#kyc_form")[0].reset();
        })
        .catch((err) => {
          console.log("err", err);
          window.errorToast("Error", err);
        });
    });
  });
})(jQuery);
