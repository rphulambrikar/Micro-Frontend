const Express = require("express");
const productData = require("./productData.json");
const path = require("path");
const cors = require("cors");

const App = Express();

App.use(cors());
App.use(Express.static('public'))

App.get("/products", (req, res) => {
  res.send(productData);
});

App.get("/products/:id", (req, res) => {
  productData.find((products) => {
    console.log(movie.id, req.params.id);
    if (products.id === parseInt(req.params.id)) {
      // res.send(movie.imageUrl);
      const options = {
        root: path.join(__dirname, "assets/images/"),
      };

      console.log(options.root+products.imageUrl);

      res.sendFile(products.imageUrl, options, (err) => {
        if (err) {
          res.sendStatus(404);
        } else {
          console.log("File sent to client");
        }
      });
    }
  });
  
});

App.listen(5555, () => {
  console.log("Application started on port 5555");
});
