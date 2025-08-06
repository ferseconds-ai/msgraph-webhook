const express = require("express");
const app = express();

app.use(express.json());

app.get("/sp-listener", (req, res) => {
  const token = req.query.validationToken;
  if (!token) {
    console.log("❌ No validation token received");
    return res.status(400).send("Missing validationToken");
  }

  console.log("✅ Validation token received:", token);
  res.set("Content-Type", "text/plain");
  res.send(token); // Return raw token
});

app.post("/sp-listener", (req, res) => {
  console.log("📬 Change notification received:");
  console.dir(req.body, { depth: null });
  res.sendStatus(200);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`🚀 Webhook listening on port ${port}`);
});
