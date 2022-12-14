import mongoose from "mongoose";
import Committee from "#parents/Committee";

module.exports = mongoose.models.KSCommittee || mongoose.model("KSCommittee", Committee);
