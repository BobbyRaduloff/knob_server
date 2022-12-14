import mongoose from "mongoose";
import Committee from "#parents/Committee";

module.exports = mongoose.models.MethodologyCommittee || mongoose.model("MethodologyCommittee", Committee);
