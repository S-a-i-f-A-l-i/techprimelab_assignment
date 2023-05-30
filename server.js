import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("Welcome Dear!");
});

const port = process.env.PORT || 8080;

app.listen(port, () => {
  console.log(`Server is listening on port:=> http://localhost:${port}`);
});
