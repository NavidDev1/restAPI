const express = require("express");
const app = express();
const fs  = require("fs");
const bodyParser = require("body-parser");
app.use(express.json())


let products = require("./products.json");

const save = () => {
fs.writeFile(
  "./products.json",
  JSON.stringify(products, null, 2),
  (err) => {
    if (err){
      res.send("404 - nått gick fel!");
    }
  }
);
};


app.get("/products", (req, res) =>{
  res.json(products);
});

app.post("/products/", bodyParser.json(), (req, res) => {
  products.push(req.body);
  save();
  res.json({
    status: "201",
    productsInfo: req.body,
  });
});


app.put("/products", (req, res) =>{
  save()
  res.json(products);
});


app.delete("/products", (req, res) => {
  products = products.filter((products) => products.products !== req.params.name);
  save();
  res.json({
    status: "success",
    removed: req.params.name,
    newLength: products.length,
  });
});


app.listen(3000, () => console.log("server is up and going"));
