import mongoose from "mongoose";
import Item from "#parents/Item";

module.exports = mongoose.models.SeminarItem || mongoose.model("SeminarItem", Item);
