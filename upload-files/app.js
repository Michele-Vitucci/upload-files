const express = require("express");
const app = express();
const planetsRoutes = require("./routes/planets");
const { setupDb } = require("./db");
const fs = require("fs");
const path = require("path");

app.use(express.json());
app.use("/api/planets", planetsRoutes);
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

if (!fs.existsSync("uploads")) {
  fs.mkdirSync("uploads");
}

setupDb().then(() => {
  app.listen(3000, () => {
    console.log("Server attivo su http://localhost:3000 e DB inizializzato");
  });
});