import mongoose from "mongoose";
import Standard from "#parents/Standard";

module.exports = mongoose.models.BulgarianStandard || mongoose.model("BulgarianStandard", Standard);
