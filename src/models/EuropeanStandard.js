import mongoose from "mongoose";
import Standard from "#parents/Standard";

module.exports = mongoose.models.EuropeanStandard || mongoose.model("EuropeanStandard", Standard);
