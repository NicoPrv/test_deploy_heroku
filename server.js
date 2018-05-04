const fetch = require("node-fetch");
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const nunjucks = require("nunjucks");


nunjucks.configure("views", {
  autoescape: true,
  express: app
});

app.set("views", __dirname + "/views");
app.set("view engine", "njk");

app.listen(port, function () {
  console.log("Server listening on port:" + port);
});

app.use(express.static("public"));



app.get("/", function getCategories(request, result) {
  fetch (
    `https://decath-product-api.herokuapp.com/categories`,
    {method:"GET"}
  )
  .then (resultat=>resultat.json())

  .then (theResult=>result.render("home", {myLabels:theResult}))
  .catch(error=>console.log(error));
});

app.get("/cat/:id", function getCategories(request, result) {
  fetch (
    `https://decath-product-api.herokuapp.com/categories/${request.params.id}/products`,
    {method:"GET"}
  )
  .then (resultat=>resultat.json())

  //.then (labels=>result.send(labels))
  .then (myResult=>result.render("products", {myProducts:myResult}))
  .catch(error=>console.log(error));
});

app.get("/prod/:id", function getCategories(request, result) {
  fetch (
    `https://decath-product-api.herokuapp.com/products/${request.params.id}`,
    {method:"GET"}
  )
  .then (resultat=>resultat.json())

  //.then (labels=>result.send(labels))
  .then (myResult=>result.render("product_page", {product:myResult}))
  .catch(error=>console.log(error));
});
