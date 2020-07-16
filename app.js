const express = require("express");
const app = express();
const fs = require("fs");
const bodyParser = require("body-parser");
const https = require("https");
const path = require("path");
const request = require("request");
const _ = require("lodash");
const { Donor } = require("./models/model");
const { initializePayment, verifyPayment, listTransaction } = require("./config/paystack")(
  request
);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "/public")));
app.set("view engine", "ejs");
app.get("/", (req, res) => {
  res.render("index");
});

app.post("/paystack/pay", (req, res) => {
  console.log(req.body);
  const form = _.pick(req.body, ["amount", "email", "full_name"]);
  form.metadata = {
    full_name: form.full_name,
  };
  form.amount = form.amount * 100;
  form.channels = ['card', 'bank']
  form.authorization_code = 'AUTH_n1b56iredm'

  initializePayment(form, (error, body) => {
    if (error) {
      console.log(error);
      return res.redirect("/error");
    }

    response = JSON.parse(body);
    console.log(response);
    res.redirect(response.data.authorization_url);
  });
});

app.get("/paystack/callback", (req, res) => {
  const ref = req.query.reference;
  verifyPayment(ref, (error, body) => {
    if (error) {
      console.log(error);
      return res.redirect("/error");
    }
    response = JSON.parse(body);
    const data = _.at(response.data, [
      "reference",
      "amount",
      "plan",
      "customer.email",
      "metadata.full_name",
    ]);


    [reference, amount, email, full_name] = data;
    newDonor = { reference, amount, email, full_name };
    const donor = new Donor(newDonor);
    donor
      .save()
      .then((donor) => {
        if (donor) {
          res.redirect(`/receipt/${donor.id}`);
        }
      })
      .catch((e) => res.redirect("/error"));
  });
});

app.get("/receipt/:id", (req, res) => {
  res.send("Sucess!!");
});

app.get("/error", (req, res) => {
  res.send("error");
});

app.get('/paystack/lists', (req, res) => {
  const param = _.pick(req.query, ['perPage, page'])

  listTransaction(param, (err, body) => {
    if (err) console.log(err)

    response = JSON.parse(body)
    res.send(response)
    res.end()
  })
})

https
  .createServer(
    {
      key: fs.readFileSync("key.pem"),
      cert: fs.readFileSync("cert.pem"),
    },
    app
  )
  .listen(3000, () => console.log(`Listening on https://localhost:3000`));

