import mongoose from "mongoose";
import Committee from "#parents/Committee";

module.exports = mongoose.models.EthicsCommittee || mongoose.model("EthicsCommittee", Committee);
