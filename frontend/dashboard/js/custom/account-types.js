(function ($) {
  $(document).ready(async function () {
    const baseURL = window.general_data().url;
    const user = window.getUser();
    let account_type;

    function renderCheck(value) {
      return value == 1
        ? '<i class="fa fa-check"></i>'
        : '<i class="fa fa-times"></i>';
    }

    try {
      const res = await apiRequest.get(`${baseURL}/account_type`);
      const types = res.data;
      const type_container = $("#account_type_container");
      type_container.empty();
      console.log("types", types);
      if (Array.isArray(types) && types.length > 0) {
        types.forEach((type, index) => {
          account_type = type;
          const html = `
             <div class="col-xl-6 mb-60">
                        <div class="pricing-table boxed">
                          <div class="pricing-top">
                            <div class="pricing-title">
                              <h3 class="mb-15">${type.name}</h3>
                            </div>
                            <div class="pricing-prize">
                              <h2>
                              <span class="currency"> ${
                                user.currency_symbol
                              }</span>
                              <span>${type.amount} </span>
                              </h2>
                            </div>
                            <div class="pricing-button">
                              <!-- Small modal -->
                              <button
                                type="button"
                                class="btn btn-success"
                                data-toggle="modal"
                                data-target=".bd-example-modal-sm"
                              >
                                CHOOSE THIS
                              </button>
                              <div
                                class="modal fade bd-example-modal-sm"
                                tabindex="-1"
                                role="dialog"
                                aria-hidden="true"
                              >
                                <div class="modal-dialog modal-sm">
                                  <div class="modal-content">
                                    <div class="modal-header">
                                      <div class="modal-title">
                                        <div class="mb-0">
                                          <h6>Hi <span class="user_name">${
                                            user.name
                                          }</span></h6>
                                        </div>
                                      </div>
                                    </div>
                                    <div class="modal-body">
                                      In order to migrate to this type of
                                      account, please contact our support team
                                      via Live Chat or Email for further
                                      instructions.
                                    </div>
                                    <div class="modal-footer">
                                      <button
                                        type="button"
                                        class="close"
                                        data-dismiss="modal"
                                        aria-label="Close"
                                      >
                                        <span aria-hidden="true">&times;</span>
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div class="pricing-content">
                            <div class="pricing-table-list">
                              <ul class="list-unstyled">
                                <li>Spreads: &nbsp;&nbsp; ${type.spreads}</li>
                                <li>Leverage: &nbsp;&nbsp; up to ${
                                  type.leverage
                                }</li>
                                <li>
                                  Scalping &nbsp;&nbsp;&nbsp;&nbsp;
                                 
                                  ${renderCheck(type.scalping)}
                                </li>
                                <li>
                                  Negative Balance Protection
                                  &nbsp;&nbsp;&nbsp;&nbsp;
                                   
                                    ${renderCheck(
                                      type.negative_balance_protection
                                    )}
                                </li>
                                <li>Stop Out: &nbsp;&nbsp; 50%</li>
                                <li>
                                  Swap Free &nbsp;&nbsp;&nbsp;&nbsp;
                                
                                ${renderCheck(type.swap_free)}
                                </li>
                                <li>Minimum Trade Volume: &nbsp;&nbsp; ${
                                  type.minimum_trade_volume
                                }</li>
                                <li>
                                  Hedging Allowed &nbsp;&nbsp;&nbsp;&nbsp;
                                  
                                    ${renderCheck(type.hedging_allowed)}
                                </li>
                                <li>
                                  Daily Signals &nbsp;&nbsp;&nbsp;&nbsp;
                                  

                                   ${renderCheck(type.daily_signals)}
                                </li>
                                <li>
                                  Video Tutorials &nbsp;&nbsp;&nbsp;&nbsp;
                                 
                                 ${renderCheck(type.video_tutorials)}
                                </li>
                                <li>
                                  Dedicated Account Manager
                                  &nbsp;&nbsp;&nbsp;&nbsp;
                                
                                 ${renderCheck(type.dedicated_account_manager)}
                                </li>
                                <li>
                                  Daily Market Review &nbsp;&nbsp;&nbsp;&nbsp;
                                
                                 ${renderCheck(type.daily_market_review)}
                                </li>
                                <li>
                                  Financial Plan &nbsp;&nbsp;&nbsp;&nbsp;
                                
                                  ${renderCheck(type.financial_plan)}
                                </li>
                                <li>
                                  Risk Management Plan &nbsp;&nbsp;&nbsp;&nbsp;
                                
                                 ${renderCheck(type.risk_management_plan)}
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
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
      $("#account_type_container").html(
        `<div class="col-12"><p>Failed to load Type.</p></div>`
      );
    }
  });
})(jQuery);

console.log("fadad");
