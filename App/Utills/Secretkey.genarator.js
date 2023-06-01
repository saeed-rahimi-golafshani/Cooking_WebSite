const crypto = require("crypto");

const key = crypto.randomBytes(24).toString("hex").toUpperCase();
console.log(key);