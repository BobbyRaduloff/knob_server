import mongoose from "mongoose";
import Committee from "#parents/Committee";

module.exports = mongoose.models.USCommittee || mongoose.model("USCommittee", Committee);
