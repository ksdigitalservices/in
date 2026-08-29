const express = require("express");

const app = express();
const PORT = 3000;

// Timezone
const TIMEZONE = "Asia/Kolkata";

// =====================================
// MANUALLY SET BOOKING OPENING TIME HERE
// =====================================
const OPEN_HOUR = 21;     // 10 AM
const OPEN_MINUTE = 30;    // 00 minutes
// =====================================

function isBeforeOpeningTime() {
  const now = new Date();

  const timeInIndia = new Intl.DateTimeFormat("en-IN", {
    timeZone: TIMEZONE,
    hour: "2-digit",
    minute: "2-digit",
    hour12: false
  }).formatToParts(now);

  const hour = Number(
    timeInIndia.find(p => p.type === "hour").value
  );

  const minute = Number(
    timeInIndia.find(p => p.type === "minute").value
  );

  // Convert current time and opening time to minutes
  const currentMinutes = (hour * 60) + minute;
  const openingMinutes = (OPEN_HOUR * 60) + OPEN_MINUTE;

  return currentMinutes < openingMinutes;
}


// =====================================
// /booking
// =====================================
app.get("/booking", (req, res) => {

  if (isBeforeOpeningTime()) {
    return res.redirect("/curtain");
  }

  res.sendFile(__dirname + "/booking.html");
});


// =====================================
// /curtain
// =====================================
app.get("/curtain", (req, res) => {
  res.sendFile(__dirname + "/curtain.html");
});


// =====================================
// START SERVER
// =====================================
app.listen(PORT, () => {
  console.log(`Server running on https://ksdigitalservices.in`);
});
