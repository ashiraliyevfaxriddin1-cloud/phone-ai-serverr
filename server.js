const express = require("express");

const app = express();

app.use(express.json());

app.post("/chat", (req, res) => {
  const message = req.body.message;

  res.json({
    answer: "Men ishlayapman. Siz yozdingiz: " + message
  });
});

app.listen(3000, () => {
  console.log("Server ishladi");
});
