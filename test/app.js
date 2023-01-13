const path = require("path");

const express = require("express");
const bodyParser = require("body-parser");

const errorController = require("./controllers/error");
const mongoConnect = require("./util/database").mongoConnect;

const app = express();

app.set("view engine", "ejs");
app.set("views", "views");

const adminRoutes = require("./routes/admin");
const camaraRoutes = require("./routes/camara");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use("/admin", adminRoutes);
app.use(camaraRoutes);

app.use(errorController.getPageNotFound);

mongoConnect(() => {
  app.listen(3000, () => {
    console.log("Access: http://localhost:3000");
  });
});
