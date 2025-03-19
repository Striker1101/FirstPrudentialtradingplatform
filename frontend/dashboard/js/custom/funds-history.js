(function ($) {
  $(document).ready(async function () {
    const res = await apiRequest.get("/deposit_and_withdraw");
    const data = res.data;
    let html = "";

    data.forEach((item, index) => {
      let statusClass = "";
      switch (item.status) {
        case "approved":
          statusClass = "badge badge-success";
          break;
        case "pending":
          statusClass = "badge badge-warning";
          break;
        case "declined":
          statusClass = "badge badge-danger";
          break;
        default:
          statusClass = "badge badge-secondary";
      }

      html += `
          <tr>
            <td>${index + 1}</td>
            <td>${item.type.charAt(0).toUpperCase() + item.type.slice(1)}</td>
            <td><span class="${statusClass}">${item.status}</span></td>
            <td>${item.amount} ${
        item.withdrawal_type?.currency || item.deposit_type?.currency || ""
      }</td>
            <td>${new Date(item.created_at).toLocaleString()}</td>
          </tr>
        `;
    });

    $("#transactions_body").html(html);
  });
})(jQuery);
