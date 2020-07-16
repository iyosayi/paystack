const key = require('./key')
const paystack = (request) => {
  const initializePayment = (form, mycallback) => {
    const options = {
      url: "https://api.paystack.co/transaction/initialize",
      headers: {
        Authorization: key.paystack.secret_key,
        "Content-Type": "application/json",
        Cache: "no-cache",
      },
      form,

    };
    const callback = (error, response, body) => {
      return mycallback(error, body);
    };
    request.post(options, callback);
  };

  const verifyPayment = (ref, mycallback) => {
    const options = {
      url:
        "https://api.paystack.co/transaction/verify/" + encodeURIComponent(ref),
      headers: {
        Authorization: key.paystack.secret_key,
        "Content-Type": "application/json",
        Cache: "no-cache",
      },
    };
    const callback = (error, response, body) => {
      return mycallback(error, body);
    };
    request(options, callback);
  };

  const listTransaction = (param, mycallback) => {
    const options = {
      url: 'https://api.paystack.co/transaction',
      headers: {
        Authorization: key.paystack.secret_key
      },
      param
    }
    const callback = (error, response, body) => {
      return mycallback(error, body)
    }
    request(options, callback)
  }

  return { initializePayment, verifyPayment, listTransaction };
};

module.exports = paystack;
