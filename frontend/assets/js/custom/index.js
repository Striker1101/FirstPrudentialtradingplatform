(function ($) {
  $(document).ready(function () {
    getData();
  });
})(jQuery);

async function getData() {
  try {
    const owner_id = window.general_data().owner_id;
    const baseURL = window.general_data().url;
    const res = await apiRequest.get(`${baseURL}/plan?owner_id=${owner_id}`);
    const plans = res.data;

    console.log(plans);

    if (Array.isArray(plans) && plans.length > 0) {
      const plan_container = $("#plan_container");
      console.log(plan_container);
      $("#plan_container").empty();

      plans.forEach((plan, index) => {
        const html = `
            <div class="col-md-3">
              <div class="single-pricing-box wow fadeIn" data-wow-delay="${
                0.1 * (index + 1)
              }s">
                <h4>${plan.name}</h4>
                <div class="single-pricing-data">
                  <span class="dollar-symbol">$</span>
                  <h5>${parseFloat(plan.amount).toLocaleString()}</h5>
                </div>
                <div class="single-pricing-content">
                  <ul>
                    <li>${plan.percent}% Deposit Bonus</li>
                    <li>${plan.support ? "24/7 Support" : "No Support"}</li>
                    <li>${
                      plan.agent ? "Includes Agent Access" : "No Agent Access"
                    }</li>
                    <li>Duration: ${plan.duration} months</li>
                  </ul>
                </div>
                <a href="./register.html" class="pricing-box-bt">Get Started</a>
              </div>
            </div>`;
        $("#plan_container").append(html);
      });
    } else {
      $("#plan_container").html(
        `<div class="col-12"><p>No plans available.</p></div>`
      );
    }
  } catch (err) {
    console.error("API request failed:", err);
    $("#plan_container").html(
      `<div class="col-12"><p>Failed to load plans.</p></div>`
    );
  }
}
