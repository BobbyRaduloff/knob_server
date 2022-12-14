import mongoose from "mongoose";
import Item from "#parents/Item";

module.exports = mongoose.models.CourseItem || mongoose.model("CourseItem", Item);
