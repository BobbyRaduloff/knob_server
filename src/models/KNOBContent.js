import mongoose from "mongoose";
import Content from "#parents/Content";

module.exports = mongoose.models.KNOBContent || mongoose.model("KNOBContent", Content);
