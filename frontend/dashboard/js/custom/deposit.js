(function ($) {
  $(document).ready(async function () {
    const baseURL = window.general_data().url;
    const user = window.getUser();
    const amount_input = $("#amount_input").val();
    let deposit_type;
    try {
      const res = await apiRequest.get(`${baseURL}/deposit_type`);
      const types = res.data;

      const type_container = $("#deposit_type_container");
      type_container.empty();

      if (Array.isArray(types) && types.length > 0) {
        types.forEach((type, index) => {
          deposit_type = type;
          const html = `
            <div class="btn-group m-2" style="width: 40%">
              <a
                class="button gray btn-block deposit-type-btn"
                href="#"
                data-type='${JSON.stringify(type)}'
              >
                ${type.name}
              </a>
            </div>
          `;
          type_container.append(html);
        });
      } else {
        type_container.html(
          `<div class="col-12"><p>No Deposit Type available.</p></div>`
        );
      }
    } catch (err) {
      console.error("API request failed:", err);
      $("#deposit_type_container").html(
        `<div class="col-12"><p>Failed to load Type.</p></div>`
      );
    }

    // Submit handler
    $("#deposit_type_form").on("submit", function (e) {
      e.preventDefault();
      $("#first").css("display", "none");
      $("#second").css("display", "block");
      $("#amount").text($("#amount_input").val());
    });

    // Click handler for deposit type buttons
    $(document).on("click", ".deposit-type-btn", function (e) {
      e.preventDefault();
      const type = $(this).data("type");

      $("#second").css("display", "none");
      $("#third").css("display", "block");

      $(".type_name").text(type.name);
      $("#type_image").prop("src", type.image);

      const description = $("#description");
      switch (type.type.toLowerCase()) {
        case "crypto":
          description.text = `Destination ${type.name} Wallet`;
          $("#myInput").prop("value", type.details?.wallet_address);
          break;

        case "paypal":
          description.text = `Destination ${type.name} Wallet`;
          $("#myInput").prop("value", type.details?.paypal_email);
          break;

        case "bank_transfer":
          description.text = `Destination ${type.name} Account`;
          $("#bank_name").prop("value", type.details?.bank_name);
          $("#bank_name").css("display", "block");
          $("#account_name").prop("value", type.details?.account_name);
          $("#account_name").css("display", "block");
          $("#myInput").prop("value", type.details?.account_number);

          break;

        default:
          break;
      }
    });

    $("#deposit_form").on("submit", async function (e) {
      e.preventDefault();
      const newData = {
        deposit_type_id: deposit_type.id,
        user_id: user.id,
        amount: amount_input || $("#amount_input").val(),
        currency: user.currency,
        owner_referral_id: user.owner_referral_id,
      };
      console.log("newData", newData, $("#amount_input").val());
      await apiRequest
        .post(`${baseURL}/deposit`, newData)
        .then((res) => {
          console.log(res);
          window.successToast("Deposit successful!");

          setTimeout(() => {
            window.location.href = "../dashboard/funds-history.html";
          }, 2000);
        })
        .catch((res) => {
          window.errorToast("Deposit Fail, Please Contact Customer Care");
        });
    });
  });
})(jQuery);
