const express = require("express");

const app = express();
const PORT = 3000;

// Set your timezone
const TIMEZONE = "Asia/Kolkata";

function isBefore10AM() {
  const now = new Date();

  const timeInIndia = new Intl.DateTimeFormat("en-IN", {
    timeZone: TIMEZONE,
    hour: "2-digit",
    minute: "2-digit",
    hour12: false
  }).formatToParts(now);

  const hour = Number(timeInIndia.find(p => p.type === "hour").value);
  const minute = Number(timeInIndia.find(p => p.type === "minute").value);

  return hour < 10;
}

// /booking
app.get("/booking", (req, res) => {
  if (isBefore10AM()) {
    return res.redirect("/curtain");
  }

  res.sendFile(__dirname + "/booking.html");
});

// /curtain
app.get("/curtain", (req, res) => {
  res.sendFile(__dirname + "/curtain.html");
});

app.listen(PORT, () => {
 console.log(`Server running on https://ksdigitalservices.in`);
});
