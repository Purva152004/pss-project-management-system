const mongoose = require("mongoose");

const clientCompanySchema = new mongoose.Schema({
  companyName: String,
  owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
});

module.exports = mongoose.model("ClientCompany", clientCompanySchema);