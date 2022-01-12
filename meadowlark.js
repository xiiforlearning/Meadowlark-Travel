import express from "express";
import { engine } from "express-handlebars";
import { getFortune } from "lib/fortunes.js";

const app = express();

app.use(express.static("public"));

const port = process.env.PORT || 3000;

app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./views");

app.get("/", (req, res) => {
  res.render("home");
});

app.get("/about", (req, res) => {
  res.render("about", { fortune: getFortune() });
});

app.use((req, res) => {
  res.status(404);
  res.render("404");
});

app.use((err, req, res, next) => {
  console.error(err.message);
  res.status(500);
  res.render("500");
});

app.listen(port, () =>
  console.log(
    `Express запущен на http://localhost:${port}; ` +
      `нажмите Ctrl+C для завершения.`
  )
);
