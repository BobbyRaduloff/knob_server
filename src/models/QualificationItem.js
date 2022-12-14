import mongoose from "mongoose";
import Item from "#parents/Item";

module.exports = mongoose.models.QualificationItem || mongoose.model("QualificationItem", Item);
