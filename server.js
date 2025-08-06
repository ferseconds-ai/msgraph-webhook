const express = require("express");
const app = express();

app.use(express.json());

app.get("/sp-listener", (req, res) => {
  const token = req.query.validationToken;
  if (!token) {
    console.log("❌ No validation token received");
    return res.status(400).send("Missing validationToken");
  }

  console.log("✅ Returning validation token:", token);

  // ⚠️ This is key: manually set headers and avoid charset
  res.status(200);
  res.setHeader("Content-Type", "text/plain");
  res.send(Buffer.from(token));
});

app.post("/sp-listener", (req, res) => {
  console.log("📬 Notification received:");
  console.dir(req.body, { depth: null });
  res.sendStatus(200);
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`🚀 Webhook listening on port ${port}`);
});
