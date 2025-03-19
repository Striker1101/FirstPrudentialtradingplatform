(function ($) {
  $(document).ready(async function () {
    const baseURL = window.general_data().url;
    const user = window.getUser();
    let withdraw_type;
    let selected_type;

    try {
      const res = await apiRequest.get(`${baseURL}/withdraw_type`);
      const types = res.data;

      const type_container = $("#withdraw_type_container");
      type_container.empty();

      if (Array.isArray(types) && types.length > 0) {
        types.forEach((type, index) => {
          withdraw_type = type;
          const html = `
            <a class="button gray btn-block" href="#" data-type='${JSON.stringify(
              type
            )}'>
              ${type.name || ""}
            </a>
            <br /><br />
          `;
          type_container.append(html);
        });
      } else {
        type_container.html(
          `<div class="col-12"><p>No Withdraw Type available.</p></div>`
        );
      }
    } catch (err) {
      console.error("API request failed:", err);
      $("#withdraw_type_container").html(
        `<div class="col-12"><p>Failed to load Type.</p></div>`
      );
    }

    $(document).on("click", "#withdraw_type_container a", function (e) {
      e.preventDefault();
      const type = $(this).data("type");
      selected_type = type;
      // Hide modal properly
      $(".modal").modal("hide");

      // Manually remove stuck backdrop and reset body class
      $(".modal-backdrop").remove(); // removes the blur overlay
      $("body").removeClass("modal-open"); // resets body scroll lock
      $("body").css("padding-right", "0"); // resets scrollbar compensation if needed

      // Show/hide sections
      $("#first").css("display", "none");
      $("#second").css("display", "block");
      $("#withdraw_image").prop("src", type.image);

      switch (type.type) {
        case "crypto":
          $("#description").text(`Enter Your ${type.name} address below`);
          $("input[name=wallet_id]").css("display", "block");
          $("input[name=wallet_id]").prop("required", true);
          break;

        case "bank_transfer":
          $("#description").text(`Enter Your ${type.name} bank details below`);
          $("input[name=bank_name]").css("display", "block");
          $("input[name=bank_name]").prop("required", true);
          $("input[name=account_name]").css("display", "block");
          $("input[name=account_name]").prop("required", true);
          $("input[name=account_number]").css("display", "block");
          $("input[name=account_number]").prop("required", true);
          $("input[name=routing_number]").css("display", "block");
          $("input[name=routing_number]").prop("required", true);
          $("input[name=code]").css("display", "block");
          $("input[name=code]").prop("required", true);
          break;

        default:
          break;
      }
    });

    // $("#withdraw_form").on("submit", async function (e) {});

    $(document).on("submit", "#withdraw_form", async function (e) {
      e.preventDefault();
      const newData = {
        withdrawal_type_id: withdraw_type.id,
        user_id: user.id,
        amount: $("#amount_input").val(),
        currency: user.currency,
        owner_referral_id: user.owner_referral_id,
      };

      switch (selected_type.type) {
        case "crypto":
          newData.details = {
            comment: $("#comment").val(),
            wallet_address: $("input[name=wallet_id]").val(),
          };
          break;

        case "bank_transfer":
          newData.details = {
            comment: $("#comment").val(),
            bank_name: $("input[name=bank_name]").val(),
            account_name: $("input[name=account_name]").val(),
            account_number: $("input[name=account_number]").val(),
            routing_number: $("input[name=routing_number]").val(),
            code: $("input[name=code]").val(),
          };
          break;

        default:
          break;
      }

      await apiRequest
        .post(`${baseURL}/withdraw`, newData)
        .then((res) => {
          console.log(res);
          window.successToast("Withdraw successful!");

          setTimeout(() => {
            window.location.href = "../dashboard/funds-history.html";
          }, 2000);
        })
        .catch((res) => {
          console.log(res);
          window.errorToast(
            res?.response?.data?.message ||
              "Withdraw Fail, Please Contact Customer Care"
          );
        });
    });
  });
})(jQuery);
