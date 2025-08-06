const express = require("express");
const app = express();

app.use(express.json());
app.disable("etag"); // disable caching

app.get("/sp-listener", (req, res) => {
  const token = req.query.validationToken;
  if (!token) {
    console.log("❌ No validation token received");
    return res.status(400).send("Missing validationToken");
  }

  console.log("✅ Returning validation token:", token);

  const buffer = Buffer.from(token);
  res.setHeader("Content-Type", "text/plain");
  res.setHeader("Content-Length", buffer.length); // 👈 prevent chunked encoding
  res.setHeader("Cache-Control", "no-cache");
  res.status(200).send(buffer);
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
