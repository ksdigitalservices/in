const express = require("express");

const app = express();
const PORT = 3000;

// ==========================================
// TIMEZONE
// ==========================================
const TIMEZONE = "Asia/Kolkata";

// ==========================================
// MANUALLY SET BOOKING OPENING TIME
// ==========================================

const OPEN_HOUR = 21;       // 21 = 9 PM
const OPEN_MINUTE = 40;     // 40 minutes

// Booking opens at 21:40 (9:40 PM)

// ==========================================
// CHECK IF BOOKING IS BEFORE OPENING TIME
// ==========================================

function isBeforeOpeningTime() {

const now = new Date();

const timeInIndia = new Intl.DateTimeFormat("en-IN", {
timeZone: TIMEZONE,
hour: "2-digit",
minute: "2-digit",
hour12: false
}).formatToParts(now);

const hour = Number(
timeInIndia.find(part => part.type === "hour").value
);

const minute = Number(
timeInIndia.find(part => part.type === "minute").value
);

// Convert both times into total minutes

const currentMinutes = (hour * 60) + minute;

const openingMinutes =
(OPEN_HOUR * 60) + OPEN_MINUTE;

console.log(
`Current India time: ${hour}:${String(minute).padStart(2, "0")}`
);

console.log(
`Booking opens at: ${OPEN_HOUR}:${String(OPEN_MINUTE).padStart(2, "0")}`
);

return currentMinutes < openingMinutes;
}

// ==========================================
// /BOOKING
// ==========================================

app.get("/booking", (req, res) => {

// BEFORE 21:40
if (isBeforeOpeningTime()) {

```
console.log("Booking is CLOSED → Redirecting to /curtain");

return res.redirect("/curtain");
```

}

// 21:40 OR AFTER
console.log("Booking is OPEN → Showing booking page");

res.sendFile(__dirname + "/booking.html");
});

// ==========================================
// /CURTAIN
// ==========================================

app.get("/curtain", (req, res) => {

res.sendFile(__dirname + "/curtain.html");

});

// ==========================================
// START SERVER
// ==========================================

app.listen(PORT, () => {

console.log(
`Server started on port ${PORT}`
);

console.log(
`Booking opens at ${OPEN_HOUR}:${String(OPEN_MINUTE).padStart(2, "0")} IST`
);

});
