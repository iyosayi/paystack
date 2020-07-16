const paymentForm = document.getElementById("paymentForm");
paymentForm.addEventListener("submit", payWithPaystack, false);
function payWithPaystack(e) {
  e.preventDefault();
  let handler = PaystackPop.setup({
    key: "sk_test_2be62ae408bd9637f260d0d4a14f8e761660301f", // Replace with your public key
    email: document.getElementById("email-address").value,
    amount: document.getElementById("amount").value * 100,
    currency: "NGN",
    firstname: document.getElementById("first-name").value,
    lastname: document.getElementById("first-name").value,
    ref:
      document.getElementById("email-address").value +
      Math.floor(Math.random() * 1000000000 + 1), // generates a pseudo-unique reference. Please replace with a reference you generated. Or remove the line entirely so our API will generate one for you
    // label: "Optional string that replaces customer email"
    onClose: function () {
      alert("Window closed.");
    },
    callback: function (response) {
      // $.ajax({
      //   url:
      //     "http://localhost:3000/verify_transaction?reference=" +
      //     response.reference,
      //   method: "get",
      //   success: function (response) {
      //     console.log(response.data.status);
      //     // the transaction status is in response.data.status
      //   },
      // });
      // console.log(response.data.status)
      let message = "Payment complete! Reference: " + response.reference;
      alert(message);
    },
  });
  handler.openIframe();
}
