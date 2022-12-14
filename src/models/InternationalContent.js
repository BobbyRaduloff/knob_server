import mongoose from "mongoose";
import Content from "#parents/Content";

module.exports = mongoose.models.InternationalContent || mongoose.model("InternationalContent", Content);
