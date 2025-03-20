(function ($) {
  $(document).ready(function () {
    const user = window.getUser();
    const kyc = user?.kyc_info || {};
    const user_avatar = $("#user_avatar");

    // Set Avatar Image
    if (user_avatar)
      user_avatar.prop(
        "src",
        user?.image_url ? user.image_url : "../dashboard/images/dummy.png"
      );

    // Pre-fill SSN and User ID
    $("#ssn").val(kyc?.ssn || "");
    $("#user_id").val(user?.id || "");

    // Show Existing Preview (from DB)
    if (kyc?.DLF_image_url) {
      $("#preview_front").html(
        `<img src="${kyc.DLF_image_url}" alt="Front ID" class="img-fluid rounded" style="max-height:150px;">`
      );
    }
    if (kyc?.DLB_image_url) {
      $("#preview_back").html(
        `<img src="${kyc.DLB_image_url}" alt="Back ID" class="img-fluid rounded" style="max-height:150px;">`
      );
    }

    // Helper: File Preview
    function previewImage(input, previewBox) {
      if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = function (e) {
          $(previewBox).html(
            `<img src="${e.target.result}" alt="Preview" class="img-fluid rounded" style="max-height:150px;">`
          );
        };
        reader.readAsDataURL(input.files[0]);
      }
    }

    // Handle Input Change Preview
    $("#DLF_image_url").on("change", function () {
      previewImage(this, "#preview_front");
    });
    $("#DLB_image_url").on("change", function () {
      previewImage(this, "#preview_back");
    });

    // Drag & Drop Handlers - FRONT
    $("#drop_front").on("click", () => $("#DLF_image_url").trigger("click"));
    $("#drop_front").on("dragover", (e) => {
      e.preventDefault();
      e.stopPropagation();
      $(this).addClass("border-primary");
    });
    $("#drop_front").on("dragleave", (e) => {
      e.preventDefault();
      $(this).removeClass("border-primary");
    });
    $("#drop_front").on("drop", function (e) {
      e.preventDefault();
      const file = e.originalEvent.dataTransfer.files[0];
      $("#DLF_image_url")[0].files = e.originalEvent.dataTransfer.files;
      previewImage($("#DLF_image_url")[0], "#preview_front");
    });

    // Drag & Drop Handlers - BACK
    $("#drop_back").on("click", () => $("#DLB_image_url").trigger("click"));
    $("#drop_back").on("dragover", (e) => {
      e.preventDefault();
      $(this).addClass("border-primary");
    });
    $("#drop_back").on("dragleave", (e) => {
      e.preventDefault();
      $(this).removeClass("border-primary");
    });
    $("#drop_back").on("drop", function (e) {
      e.preventDefault();
      const file = e.originalEvent.dataTransfer.files[0];
      $("#DLB_image_url")[0].files = e.originalEvent.dataTransfer.files;
      previewImage($("#DLB_image_url")[0], "#preview_back");
    });

    // Submit KYC Form
    $("#kyc_form").on("submit", function (e) {
      e.preventDefault();
      const formData = new FormData(this);

      apiRequest
        .post("/kyc_info", formData)
        .then((res) => {
          window.successToast("KYC Upload was Successful", res);
          $("#kyc_form")[0].reset();
          $("#preview_front").empty();
          $("#preview_back").empty();
        })
        .catch((err) => {
          console.log("KYC upload error", err);
          window.errorToast("Upload Failed", err);
        });
    });
  });
})(jQuery);
